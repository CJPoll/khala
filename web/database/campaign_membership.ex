defmodule Khala.Database.CampaignMembership do
  use Khala.Web, :database

  @spec for_user_by_token(Khala.Token.token_string)
  :: [Khala.CampaignMembership.t]
  def for_user_by_token(token) do
    from(cm in Khala.CampaignMembership,
      join: u in Khala.User, on: u.id == cm.user_id,
      join: t in Khala.Token, on: t.user_id == u.id,
      where: t.token == ^token,
      select: cm)
    |> Khala.Repo.all
  end

  @spec for_user_by_token(Khala.Token.token_string, pos_integer | String.t)
  :: Khala.CampaignMembership.t
  def for_user_by_token(token, campaign_id) do
    from(cm in Khala.CampaignMembership,
      join: u in Khala.User, on: u.id == cm.user_id,
      join: t in Khala.Token, on: t.user_id == u.id,
      where: t.token == ^token,
      where: cm.campaign_id == ^campaign_id,
      select: cm)
    |> Khala.Repo.one
  end
end
