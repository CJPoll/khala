defmodule Khala.SessionChannel do
  use Khala.Web, :channel
  require Logger

  def join("sessions:" <> campaign_id, %{"token" => token }, socket) do
    if can_join?(token, campaign_id) do
      user = Khala.Database.User.get_by_token(token)

      {:ok, session} = Khala.GameSession.session_for(campaign_id)
      Khala.GameSession.add_player(session, user)

      socket =
        socket
        |> assign(:user, user)
        |> assign(:session, session)

      send(self, :user_joined)

      {:ok, socket}
    else
      {:error, %{reason: "unauthorized"}}
    end
  end

  def handle_in("user:ack", _payload, socket) do
    user_name = socket.assigns.user.name
    broadcast socket, "user:ack", %{"user" => user_name }
    {:noreply, socket}
  end

  def handle_in("character:chosen", %{"character_id" => character_id}, socket) do
    Logger.debug("===== Character Chosen ====")
    player = socket.assigns[:user]
    character = Khala.Database.Character.get(character_id) |> Khala.Repo.preload(:user)

    result =
      socket
      |> Map.get(:assigns)
      |> Map.get(:session)
      |> Khala.GameSession.choose_character(player, character)

    case result do
      :ok ->
        send(self, :state_updated)
        {:noreply, socket}
      {:error, :mismatched_character} ->
        send_reply(socket, "character:mismatched")
        push(socket, "character:mismatched", {})
    end
  end

  # It is also common to receive messages from the client and
  # broadcast to everyone in the current topic (sessions:lobby).
  def handle_in(event, payload, socket) do
    Logger.error("Unknown Event: " <> event)
    Logger.error("#{inspect payload}")
    broadcast socket, event, payload
    {:noreply, socket}
  end

  # This is invoked every time a notification is being broadcast
  # to the client. The default implementation is just to push it
  # downstream but one could filter or change the event.
  def handle_out(event, payload, socket) do
    push socket, event, payload
    {:noreply, socket}
  end

  def handle_info(:user_joined, socket) do
    session_state = Khala.GameSession.to_json(socket.assigns[:session])

    json = %{
      state: Khala.GameSession.View.to_json(session_state),
      user: socket.assigns[:user].name
    }

    broadcast socket, "user:join", json

    send(self, :state_updated)

    {:noreply, socket}
  end

  def handle_info(:state_updated, socket) do
    json =
      socket
      |> Map.get(:assigns)
      |> Map.get(:session)
      |> Khala.GameSession.to_json
      |> Khala.GameSession.View.to_json


    Logger.debug("#{inspect json}")
    broadcast socket, "state:updated", json

    {:noreply, socket}
  end

  def terminate(_reason, socket) do
    broadcast socket, "user:leave", %{user: socket.assigns[:user].name}
    {:shutdown, :left}
  end

  defp send_reply(socket, response) do
    {:reply, {:ok, response}, socket}
  end

  defp can_join?(token, campaign_id) do
    Khala.Database.CampaignMembership.for_user_by_token(token, campaign_id)
  end
end
