defmodule Khala.UserController do
  use Khala.Web, :controller

  alias Khala.User

  plug :scrub_params, "user"

  def create(conn, %{"user" => user_params}) do
    user = %User{}
            |> User.create_changeset(user_params)
    if user.valid? do
      case Repo.insert(user) do
        {:ok, user} ->
          conn
          |> render("user.json", user: user)
        {:error, changeset} ->
          conn
          |> error(400, changeset)
      end
    else
      conn
      |> error(400, user)
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
    error_filter = fn ({error, error_message}) ->
      error_message
    end

    errors = Enum.map(changeset.errors, error_filter)

    %{errors: errors}
  end
end
