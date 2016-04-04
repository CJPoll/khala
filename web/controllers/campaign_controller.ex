defmodule Khala.CampaignController do
  use Khala.Web, :controller

  plug :scrub_params, "campaign"

  def create(conn, %{"campaign" => campaign_params}) do
    changeset = Khala.Campaign.changeset(%Khala.Campaign{}, campaign_params)

    case Khala.Database.Campaign.insert(changeset) do
      {:ok, campaign} ->
        conn |> render("campaign.json", %{campaign: campaign})
      {:error, changeset} ->
        conn |> error(400, changeset)
    end
  end
end
