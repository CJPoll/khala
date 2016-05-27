defmodule Khala.Database.Character.Test do
  use Khala.ModelCase, async: true

  setup do
    user = test_user("cjpoll@khala.com")
    campaign = test_campaign("Monteporte", user)

    character_params = %{
      full_name: "jimbo bob",
      nickname: "jim",
      physical: 10,
      mental: 10,
      social: 10,
      power: 10,
      finesse: 10,
      resilience: 10,
      user_id: user.id,
      campaign_id: campaign.id
    }

    state = %{
      user: user,
      campaign: campaign,
      character_params: character_params
    }

    {:ok, state}
  end

  test "creates a character in the db", context do
    {:ok, _character} = %Khala.Character{}
                        |> Khala.Character.changeset(context.character_params)
                        |> Khala.Database.Character.insert
  end

  test "gets a character from the db", context do
    {:ok, character} = %Khala.Character{}
                       |> Khala.Character.changeset(context.character_params)
                       |> Khala.Database.Character.insert

    db_character = Khala.Database.Character.get(character.id)
    assert db_character.id == character.id
  end
end
