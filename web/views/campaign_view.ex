defmodule Khala.CampaignView do
  use Khala.Web, :view

  def render("campaign.json", %{campaign: campaign}) do
    %{campaign: %{id: campaign.id, name: campaign.name}}
  end
end
