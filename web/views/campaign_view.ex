defmodule Khala.CampaignView do
  use Khala.Web, :view

  def render("campaigns.json", %{campaigns: campaigns}) do
    %{campaigns: render_many(campaigns, __MODULE__, "campaign.json")}
  end

  def render("campaign.json", %{campaign: campaign}) do
    %{campaign: %{id: campaign.id, name: campaign.name}}
  end
end
