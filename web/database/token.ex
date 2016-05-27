defmodule Khala.Database.Token do
  use Khala.Web, :database

  def get_by_token(token_uuid) do
    Khala.Token
    |> Khala.Repo.get_by(token: token_uuid)
  end

  def get_user_for(token_uuid) do
    from(u in Khala.User,
      join: t in Khala.Token, on: t.user_id == u.id,
      where: t.token == ^token_uuid)
    |> Khala.Repo.one
  end

  def create_for(user) do
    uuid = UUID.uuid4()

    %Khala.Token{}
    |> Khala.Token.changeset(%{token: uuid, expired: false, user_id: user.id})
    |> Khala.Repo.insert
  end
end
