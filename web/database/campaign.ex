defmodule Khala.Database.Campaign do
  use Khala.Web, :database

  alias Khala.Campaign
  alias Khala.CampaignMembership
  alias Khala.User
  alias Khala.Token

  @type success :: {:ok, Khala.Campaign.t}
  @type error :: {:error, Ecto.Changeset.t}

  @spec insert(Ecto.Changeset.t)
  :: success | error
  def insert(changeset) do
    if changeset.valid?,
    do: Repo.insert(changeset),
    else: {:error, changeset}
  end

  @spec get(pos_integer)
  :: success | error
  def get(id) do
    Khala.Campaign
    |> Repo.get(id)
  end

  @spec get_by_token(Khala.Token.token_string)
  :: [Khala.Campaign.t]
  def get_by_token(token) do
    from(c in Campaign,
      join: cm in CampaignMembership, on: cm.campaign_id == c.id,
      join: u in User, on: u.id == cm.user_id,
      join: t in Token, on: t.user_id == u.id,
      where: t.token == ^token,
      select: c)
    |> Repo.all
  end
end
