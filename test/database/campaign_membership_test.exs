defmodule Khala.Database.CampaignMembershipTest do
  use Khala.ModelCase, async: true

  setup do
    user_params = %{name: "cjpoll", email: "cjpoll@yahoo.com", password:
      "pass1", password_confirmation: "pass1"}

    {:ok, user1} = %Khala.User{}
                  |> Khala.User.create_changeset(user_params)
                  |> Khala.Repo.insert

    {:ok, user1_token} = Khala.Database.Token.create_for(user1)

    user_params = %{name: "ajpoll", email: "ajpoll@yahoo.com", password:
      "pass1", password_confirmation: "pass1"}

    {:ok, user2} = %Khala.User{}
                  |> Khala.User.create_changeset(user_params)
                  |> Khala.Repo.insert

    {:ok, user2_token} = Khala.Database.Token.create_for(user2)

    {:ok, campaign1} = %Khala.Campaign{}
                      |> Khala.Campaign.changeset(%{name: "Monteporte"}, owner: user1)
                      |> Khala.Database.Campaign.insert

    {:ok, campaign2} = %Khala.Campaign{}
                      |> Khala.Campaign.changeset(%{name: "campaign2"}, owner: user2)
                      |> Khala.Database.Campaign.insert

    state = [
      user1: user1,
      user2: user2,
      user1_token: user1_token,
      user2_token: user2_token,
      campaign1: campaign1,
      campaign2: campaign2
    ]

    {:ok, state}
  end

  test "gets campaign_memberships for a user by token", context do
    [cm] = Khala.Database.CampaignMembership.for_user_by_token(context.user1_token.token)
    assert cm.campaign_id == context.campaign1.id
    assert cm.user_id == context.user1.id
  end

  test "gets campaign_membership for a user & campaign", context do
    cm = Khala.Database.CampaignMembership.for_user_by_token(context.user1_token.token, context.campaign1.id)
    nil = Khala.Database.CampaignMembership.for_user_by_token(context.user1_token.token, context.campaign2.id)
    assert cm.campaign_id == context.campaign1.id
    assert cm.user_id == context.user1.id
  end
end
