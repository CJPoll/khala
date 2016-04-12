defmodule Khala.CampaignController do
  use Khala.Web, :controller

  alias Khala.Token
  alias Khala.Campaign

  plug :scrub_params, "campaign" when action in [:create]

  def create(conn, %{"campaign" => campaign_params, "token" => token}) do
    current_user = Token.user_for(token)

    changeset = %Campaign{}
                |> Campaign.changeset(campaign_params, owner: current_user)

    case Khala.Database.Campaign.insert(changeset) do
      {:ok, campaign} ->
        conn |> render("campaign.json", %{campaign: campaign})
      {:error, changeset} ->
        conn |> error(400, changeset)
    end
  end

  def index(conn, %{"token" => token}) do
    campaigns = Khala.Database.Campaign.get_by_token(token)
    conn |> render("campaigns.json", %{campaigns: campaigns})
  end
end
