defmodule Khala.UserController do
  use Khala.Web, :controller

  alias Khala.User

  plug :scrub_params, "user"

  def create(conn, %{"user" => user_params}) do
    user = %User{} |> User.create_changeset(user_params)

    if user.valid? do
      case Repo.insert(user) do
        {:ok, user} ->
          conn |> render("user.json", user: user)
        {:error, changeset} ->
          conn |> error(400, changeset)
      end
    else
      conn |> error(400, user)
    end
  end

end
