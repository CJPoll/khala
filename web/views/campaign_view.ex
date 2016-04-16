defmodule Khala.CampaignView do
  use Khala.Web, :view

  def render("campaigns.json", %{campaigns: campaigns}) do
    %{campaigns: render_many(campaigns, __MODULE__, "campaign.json")}
  end

  def render("show.json", %{campaign: campaign} = assigns) do
    %{campaign: render_one(campaign, __MODULE__, "campaign.json")}
  end

  def render("campaign.json", %{campaign: campaign}) do
    %{id: campaign.id, name: campaign.name, players: render_many(campaign.users, Khala.UserView, "user.json")}
  end
end
