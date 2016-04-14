defmodule Khala.CampaignTest do
  use Khala.ModelCase, async: true

  alias Khala.Campaign

  setup do
    user_params = %{name: "cjpoll", email: "cjpoll@yahoo.com", password:
      "pass1", password_confirmation: "pass1"}

    {:ok, user} = %Khala.User{}
                  |> Khala.User.create_changeset(user_params)
                  |> Khala.Repo.insert

    valid_attributes = %{name: "My Campaign Name"}
    no_name_attributes = %{}

    state = [
      user: user,
      valid_attributes: valid_attributes,
      no_name_attributes: no_name_attributes
    ]

    {:ok, state}
  end

  test "is valid with a name and owner", context do
    changeset = Campaign.changeset(%Campaign{}, context.valid_attributes, owner: context.user)
    assert changeset.valid?
  end

  test "is invalid without a name", context do
    changeset = Campaign.changeset(%Campaign{}, context.no_name_attributes)
    refute changeset.valid?
  end

  test "is invalid without an owner", context do
    changeset = Campaign.changeset(%Campaign{}, context.valid_attributes)
    refute changeset.valid?
  end
end
