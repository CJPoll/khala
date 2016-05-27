defmodule Khala.TestHelper do
  def test_user(email) when is_binary(email) do
    user_params = %{name: "cjpoll", email: email, password:
      "pass1", password_confirmation: "pass1"}

    {:ok, user} = %Khala.User{}
                  |> Khala.User.create_changeset(user_params)
                  |> Khala.Repo.insert

    user
  end

  def test_campaign(name, owner) do
    campaign_params = %{name: name}

    {:ok, campaign} = %Khala.Campaign{}
                      |> Khala.Campaign.changeset(campaign_params, [owner: owner])
                      |> Khala.Repo.insert

    campaign
  end

  def test_character(name, player, campaign) do
    character_params = %{
      full_name: name,
      nickname: "jim",
      physical: 10,
      mental: 10,
      social: 10,
      power: 10,
      finesse: 10,
      resilience: 10,
      user_id: player.id,
      campaign_id: campaign.id
    }

    {:ok, character} = %Khala.Character{}
                        |> Khala.Character.changeset(character_params)
                        |> Khala.Database.Character.insert

    character
  end
end
