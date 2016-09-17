defmodule Khala.CharacterController do
  use Khala.Web, :controller

  alias Khala.Character

  plug :scrub_params, "character" when action in [:create]

  def create(conn, %{"character" => character_params, "token" => token}) do
    user = Khala.Database.User.get_by_token(token)
    character_params = character_params |> Map.put_new("user_id", user.id)

    result =
      %Character{user: user}
      |> Character.changeset(character_params)
      |> Repo.insert

    case result do
      {:ok, character} ->
        conn |> render("character.json", character: character)
      {:error, changeset} ->
        conn |> error(400, changeset)
    end
  end

  def index(conn, %{"token" => token}) do
    characters =
      token
      |> Khala.Database.User.get_by_token
      |> Repo.preload(:characters)
      |> Map.get(:characters)

    conn |> render("characters.json", characters: characters)
  end
end
