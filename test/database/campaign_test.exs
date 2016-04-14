defmodule Khala.Database.CampaignTest do
  use Khala.ModelCase, async: true
  alias Khala.Database.Campaign

  setup do
    user_params = %{name: "cjpoll", email: "cjpoll@yahoo.com", password:
      "pass1", password_confirmation: "pass1"}

    {:ok, user} = %Khala.User{}
                  |> Khala.User.create_changeset(user_params)
                  |> Khala.Repo.insert

    valid_attributes = %{name: "My Campaign Name"}

    state = [
      user: user,
      valid_attributes: valid_attributes
    ]

    {:ok, state}
  end

  test "inserts a valid campaign changeset into the db", context do
    changeset = Khala.Campaign.changeset(%Khala.Campaign{},
    context.valid_attributes, owner: context.user)
    {:ok, campaign} = Campaign.insert(changeset)
  end

  test "gets a campaign out of the db by id", context do
    {:ok, campaign} = %Khala.Campaign{}
                      |> Khala.Campaign.changeset(context.valid_attributes, owner: context.user)
                      |> Campaign.insert

    fetched_campaign = Campaign.get(campaign.id)

    assert fetched_campaign.id == campaign.id
  end
end
