defmodule Khala.CampaignController do
  use Khala.Web, :controller

  alias Khala.Database.User
  alias Khala.Campaign

  plug :scrub_params, "campaign" when action in [:create]

  def create(conn, %{"campaign" => campaign_params, "token" => token}) do
    current_user = User.get_by_token(token)

    changeset = %Campaign{}
                |> Campaign.changeset(campaign_params, owner: current_user)

    case Khala.Database.Campaign.insert(changeset) do
      {:ok, campaign} ->
        conn |> render("show.json", campaign: campaign)
      {:error, changeset} ->
        conn |> error(400, changeset)
    end
  end

  def index(conn, %{"token" => token}) do
    campaigns = token
                |> Khala.Database.Campaign.get_by_token
                |> Khala.Repo.preload(:users)

    conn |> render("campaigns.json", campaigns: campaigns)
  end

  def show(conn, %{"token" => token, "campaign_id" => campaign_id}) do
    campaign = token
                |> Khala.Database.Campaign.get_by_token
                |> Khala.Repo.preload(:users)
                |> Enum.find(nil, fn(campaign) ->
                                    Integer.to_string(campaign.id) == campaign_id
                                  end)

    if campaign do
      conn |> render("show.json", campaign: campaign)
    else
      conn |> error(401, campaign)
    end
  end

  def add_player(conn, %{"token" => token,
                         "campaign_id" => campaign_id,
                         "email" => email}) do

    membership = Khala.Database.CampaignMembership.for_user_by_token(token, campaign_id)
    player = Khala.Database.User.get_by_email(email)

    if membership && membership.role == "owner" && player do
      {:ok, campaign_membership} = Khala.Database.User.join_campaign(player.id, campaign_id)

      campaign = Khala.Database.Campaign.get(campaign_id)
                 |> Khala.Repo.preload(:users)

      conn |> render("show.json", campaign: campaign)
    else
      conn = conn |> error(403)
    end
  end
end
