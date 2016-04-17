defmodule Khala.SessionChannelTest do
  use Khala.ChannelCase, async: true

  alias Khala.SessionChannel

  setup do
    Ecto.Adapters.SQL.Sandbox.mode(Khala.Repo, { :shared, self()  })

    user_params = %{
      email: "c@email.com",
      password: "abc",
      password_confirmation: "abc",
      name: "Cody"}

    {:ok, user} = %Khala.User{}
                  |> Khala.User.create_changeset(user_params)
                  |> Khala.Repo.insert

    {:ok, campaign} = %Khala.Campaign{}
                      |> Khala.Campaign.changeset(%{name: "Monteporte"}, owner: user)
                      |> Khala.Database.Campaign.insert

    token_model = Khala.SessionController.create_token_for(user)

    {:ok, _, socket} =
      socket(user.id, %{})
      |> subscribe_and_join(SessionChannel, "sessions:" <> Integer.to_string(campaign.id), %{"token" => token_model.token})

    {:ok, socket: socket}
  end

  test "ping replies with status ok", %{socket: socket} do
    ref = push socket, "ping", %{"hello" => "there"}
    assert_reply ref, :ok, %{"hello" => "there"}
  end

  test "shout broadcasts to sessions:1", %{socket: socket} do
    push socket, "shout", %{"hello" => "all"}
    assert_broadcast "shout", %{"hello" => "all"}
  end

  test "broadcasts are pushed to the client", %{socket: socket} do
    broadcast_from! socket, "broadcast", %{"some" => "data"}
    assert_push "broadcast", %{"some" => "data"}
  end
end
