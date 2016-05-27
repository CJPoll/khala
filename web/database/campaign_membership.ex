defmodule Khala.Database.CampaignMembership do
  use Khala.Web, :database

  def for_user_by_token(token_uuid) do
    from(cm in Khala.CampaignMembership,
      join: u in Khala.User, on: u.id == cm.user_id,
      join: t in Khala.Token, on: t.user_id == u.id,
      where: t.token == ^token_uuid,
      select: cm)
    |> Khala.Repo.all
  end

  def for_user_by_token(token_uuid, campaign_id) do
    from(cm in Khala.CampaignMembership,
      join: u in Khala.User, on: u.id == cm.user_id,
      join: t in Khala.Token, on: t.user_id == u.id,
      where: t.token == ^token_uuid,
      where: cm.campaign_id == ^campaign_id,
      select: cm)
    |> Khala.Repo.one
  end
end
