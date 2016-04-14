defmodule Khala.SessionController do
  use Khala.Web, :controller

  alias Khala.Token
  alias Khala.User

  plug :scrub_params, "user" when action in [:create]
  plug :scrub_params, "token" when action in [:delete]

  def create(conn, %{"user" => user_params} = params) do
    case User.login(user_params) do
      {:ok, user} ->
        token = create_token_for(user)

        conn
        |> render(Khala.TokenView, "token.json", %{token: token})
      {:error, reason} ->
        conn
        |> error(401, reason)
    end
  end

  def delete(conn, %{"token" => token_uuid}) do
    success = token_uuid
              |> Token.lookup
              |> Token.expire

    case success do
      {:ok, %{expired: true}} ->
        conn
        |> render("logout.json", %{})
      {:error, changset} ->
        conn
        |> error(401, %{changeset: changset})
    end
  end

  def create_token_for(user) do
    uuid = UUID.uuid4()

    token = %Token{}
            |> Token.changeset(%{token: uuid, expired: false, user_id: user.id})
            |> Repo.insert!

    token
  end

  def error_structure(401, %{changeset: changeset}) do
    filter = fn({error_code, description}) ->
      description
    end

    errors = Enum.map(changeset.errors, filter)

    %{errors: errors}
  end

  def error_structure(401, _assigns) do
    errors = ["Invalid login credentials"]

    %{errors: errors}
  end
end
