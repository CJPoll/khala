defmodule Khala.CampaignTest do
  use Khala.ModelCase, async: true

  alias Khala.Campaign

  @valid_attrs %{name: "My Campaign Name"}
  @invalid_attrs %{}

  test "is valid with a name" do
    changeset = Campaign.changeset(%Campaign{}, @valid_attrs)
    assert changeset.valid?
  end

  test "is invalid without a name" do
    changeset = Campaign.changeset(%Campaign{}, @invalid_attrs)
    refute changeset.valid?
  end
end
