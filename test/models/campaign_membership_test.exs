defmodule Khala.CampaignMembershipTest do
  use Khala.ModelCase, async: true

  alias Khala.CampaignMembership

  @valid_attrs %{role: "some content", user_id: 1, campaign_id: 1}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = CampaignMembership.changeset(%CampaignMembership{}, @valid_attrs)
    assert changeset.valid?
  end

  test "defaults role to 'owner'" do
    changeset = CampaignMembership.changeset(%CampaignMembership{}, @invalid_attrs)
    assert changeset.data.role == "owner"
  end
end
