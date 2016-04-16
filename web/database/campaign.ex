defmodule Khala.Database.Campaign do
  import Ecto.Query, only: [from: 2]

  alias Khala.Repo
  alias Khala.Campaign
  alias Khala.CampaignMembership
  alias Khala.User
  alias Khala.Token

  def insert(changeset) do
    if changeset.valid?,
    do: Repo.insert(changeset),
    else: {:error, changeset}
  end

  def get(id) do
    Khala.Campaign
    |> Repo.get(id)
  end

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
