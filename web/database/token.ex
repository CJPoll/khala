defmodule Khala.Database.Token do
  use Khala.Web, :database

  @type success :: {:ok, Khala.Token.t}
  @type error :: {:error, Ecto.Changeset.t}
  @type get_response :: Khala.Character.t | nil | no_return

  @spec get_by_token(Khala.Token.token_string)
  :: get_response
  def get_by_token(token) do
    Khala.Token
    |> Khala.Repo.get_by(token: token)
  end

  @spec create_for(Khala.User.t)
  :: success | error
  def create_for(user) do
    uuid = UUID.uuid4()

    %Khala.Token{}
    |> Khala.Token.changeset(%{token: uuid, expired: false, user_id: user.id})
    |> Khala.Repo.insert
  end
end
