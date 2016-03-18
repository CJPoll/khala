defmodule Khala.CharacterTest do
  use Khala.ModelCase

  alias Khala.Character

  @valid_attrs %{finesse: 42, full_name: "some content", mental: 42, nickname: "some content", physical: 42, power: 42, resilience: 42, social: 42}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = Character.changeset(%Character{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Character.changeset(%Character{}, @invalid_attrs)
    refute changeset.valid?
  end
end
