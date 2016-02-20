defmodule Khala.SessionController do
  use Khala.Web, :controller

  alias Khala.Token
  alias Khala.User

  plug :scrub_params, "user" when action in [:create]

  def create(conn, %{"user" => user_params} = params) do
    case User.login(user_params) do
      {:ok, user} ->
        token = create_token_for(user)

        conn
        |> render(Khala.TokenView, "token.json", %{token: token})
      {:error, _reason} ->
        :error
    end
  end

  def logout(conn, params) do
  end

  defp create_token_for(user) do
    uuid = UUID.uuid4()

    token = %Token{}
            |> Token.changeset(%{token: uuid, expired: false, user_id: user.id})
            |> Repo.insert!

    token
  end
end
