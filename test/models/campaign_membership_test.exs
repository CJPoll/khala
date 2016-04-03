defmodule Khala.CampaignMembershipTest do
  use Khala.ModelCase, async: true

  alias Khala.CampaignMembership

  @valid_attrs %{role: "some content"}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = CampaignMembership.changeset(%CampaignMembership{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = CampaignMembership.changeset(%CampaignMembership{}, @invalid_attrs)
    refute changeset.valid?
  end
end
