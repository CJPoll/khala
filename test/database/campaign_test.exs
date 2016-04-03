defmodule Khala.Database.CampaignTest do
  use Khala.ModelCase, async: true
  alias Khala.Database.Campaign

  @valid_attrs %{name: "My Campaign Name"}

  test "inserts a valid campaign changeset into the db" do
    changeset = Khala.Campaign.changeset(%Khala.Campaign{}, @valid_attrs)
    {:ok, campaign} = Campaign.insert(changeset)
  end

  test "gets a campaign out of the db by id" do
    {:ok, campaign} = %Khala.Campaign{}
                      |> Khala.Campaign.changeset(@valid_attrs)
                      |> Campaign.insert

    fetched_campaign = Campaign.get(campaign.id)

    assert fetched_campaign.id == campaign.id
  end
end
