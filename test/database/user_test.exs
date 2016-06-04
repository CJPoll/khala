defmodule Khala.Database.UserTest do
  use Khala.ModelCase, async: true

  setup do
    user_params = %{name: "cjpoll", email: "cjpoll@yahoo.com", password:
      "pass1", password_confirmation: "pass1"}

    campaign_params = %{name: "Monteporte"}

    {:ok, user} = %Khala.User{}
                  |> Khala.User.create_changeset(user_params)
                  |> Khala.Repo.insert

    user_params = %{name: "cjpoll", email: "ajpoll@yahoo.com", password:
      "pass1", password_confirmation: "pass1"}

    {:ok, user2} = %Khala.User{}
                   |> Khala.User.create_changeset(user_params)
                   |> Khala.Repo.insert

    {:ok, token} = Khala.Database.Token.create_for(user)

    {:ok, campaign} = %Khala.Campaign{}
                      |> Khala.Campaign.changeset(campaign_params, owner: user2)
                      |> Khala.Database.Campaign.insert

    state = [
      user: user,
      token: token,
      campaign: campaign
    ]

    {:ok, state}
  end

  test "gets a user out of the db by id", context do
    user = Khala.Database.User.get(context.user.id)
    assert user.id == context.user.id
  end

  test "gets a user out of the db by token", context do
    user = Khala.Database.User.get_by_token(context.token.token)
    assert user.id == context.user.id
  end

  test "gets a user out of the db by email", context do
    user = Khala.Database.User.get_by_email(context.user.email)
    assert user.id == context.user.id
  end

  test "adds a user to a campaign as a player", context do
    Khala.Database.User.join_campaign(context.user.id, context.campaign.id)

    user = Khala.Database.User.get(context.user.id)
           |> Khala.Repo.preload(:campaigns)

    assert length(user.campaigns) == 1
  end
end
