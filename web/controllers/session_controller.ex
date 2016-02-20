defmodule Khala.SessionController do
  use Khala.Web, :controller
  alias Khala.User

  plug :scrub_params, "user" when action in [:create]

  def create(conn, %{"user" => user_params} = params) do
    user = Repo.get_by!(User, email: user_params[:email])
    validate_credentials(user, user_params)
  end

  def logout(conn, params) do
  end

  defp validate_credentials(%User{} = user, user_params) do
  end
end
