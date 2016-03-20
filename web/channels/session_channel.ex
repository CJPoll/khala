defmodule Khala.SessionChannel do
  use Khala.Web, :channel

  def join("sessions:lobby", %{"token" => token }, socket) do
    user = token |> Khala.Token.user_for
    socket = socket |> assign(:user, user)
    send self(), {:user_joined, user.name}
    {:ok, socket}
  end

  # Channels can be used in a request/response fashion
  # by sending replies to requests from the client
  def handle_in("ping", _payload, socket) do
    IO.inspect("PINGING")
    socket |> send_reply(%{"hello" => "world"})
  end

  # It is also common to receive messages from the client and
  # broadcast to everyone in the current topic (sessions:lobby).
  def handle_in("shout", payload, socket) do
    broadcast socket, "shout", payload
    {:noreply, socket}
  end

  # This is invoked every time a notification is being broadcast
  # to the client. The default implementation is just to push it
  # downstream but one could filter or change the event.
  def handle_out(event, payload, socket) do
    push socket, event, payload
    {:noreply, socket}
  end

  def handle_info({:user_joined, user_name}, socket) do
    IO.inspect("#{user_name} Joined")
    broadcast socket, "user_joined", %{user: user_name}
    {:noreply, socket}
  end

  def terminate(_reason, socket) do
    IO.inspect("left")
    broadcast socket, "user_left", %{user: socket.assigns[:user].name}
    {:shutdown, :left}
  end

  defp send_reply(socket, response) do
    {:reply, {:ok, response}, socket}
  end
end
