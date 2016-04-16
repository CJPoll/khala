defmodule Khala.Database.User do
  alias Khala.User

  def get(id), do: User |> Khala.Repo.get(id)

  def get_by_token(token_uuid), do: Khala.Database.Token.get_user_for(token_uuid)

  def get_by_email(email), do: User |> Khala.Repo.get_by(email: email)

  def join_campaign(user_id, campaign_id) do
    params = %{role: "player", user_id: user_id, campaign_id: campaign_id}

    %Khala.CampaignMembership{}
    |> Khala.CampaignMembership.changeset(params)
    |> Khala.Repo.insert
  end
end
