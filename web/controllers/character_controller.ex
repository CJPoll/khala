defmodule Khala.CharacterController do
  use Khala.Web, :controller

  alias Khala.Character

  plug :scrub_params, "character"

  def create(conn, %{"character" => character_params}) do
    character = %Character{}
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

  defp error(conn, code, changeset) do
    error = code
            |> error_structure(changeset)
            |> Poison.encode!

    conn
    |> put_resp_content_type("application/json")
    |> send_resp(code, error)
  end

  defp error_structure(400, changeset) do
    error_filter = fn ({_error, error_message}) ->
      error_message
    end

    errors = Enum.map(changeset.errors, error_filter)

    %{errors: errors}
  end
end
