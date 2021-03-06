defmodule Khala.CharacterTest do
  use Khala.ModelCase, async: true

  alias Khala.Character

  @valid_attrs %{
    finesse: 42,
    full_name: "some content",
    mental: 42,
    nickname: "some content",
    physical: 42,
    power: 42,
    resilience: 42,
    social: 42,
    user_id: 1,
    campaign_id: 1}

  @invalid_attrs %{}

  @no_campaign_attrs %{
    finesse: 42,
    full_name: "some content",
    mental: 42,
    nickname: "some content",
    physical: 42,
    power: 42,
    resilience: 42,
    social: 42,
    user_id: 1}

  test "changeset with valid attributes" do
    changeset = Character.changeset(%Character{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Character.changeset(%Character{}, @invalid_attrs)
    refute changeset.valid?
  end

  test "requires a campaign_id" do
    changeset = Character.changeset(%Character{}, @no_campaign_attrs)
    refute changeset.valid?
  end
end
