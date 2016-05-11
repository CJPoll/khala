defmodule Khala.CharacterController do
  use Khala.Web, :controller

  alias Khala.Character

  plug :scrub_params, "character" when action in [:create]

  def create(conn, %{"character" => character_params, "token" => token}) do
    user = Khala.Database.Token.get_user_for(token)
    character_params = character_params |> Map.put_new("user_id", user.id)

    character = %Character{user: user}
                |> Character.changeset(character_params)

    if character.valid? do
      case Repo.insert(character) do
        {:ok, character} ->
          conn |> render("character.json", character: character)
        {:error, changeset} ->
          conn |> error(400, changeset)
      end
    else
      conn |> error(400, character)
    end
  end

  def index(conn, %{"token" => token}) do
    characters = token
                  |> Khala.Database.Token.get_user_for
                  |> Repo.preload(:characters)
                  |> Map.get(:characters)

    conn |> render("characters.json", characters: characters)
  end
end
