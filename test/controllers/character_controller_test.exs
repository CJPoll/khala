defmodule Khala.CharacterControllerTest do
  use Khala.ConnCase, async: true

  setup do
    user1_params = %{name: "cjpoll", email: "cjpoll@yahoo.com", password:
      "pass1", password_confirmation: "pass1"}

    {:ok, user1} =
      %Khala.User{}
      |> Khala.User.create_changeset(user1_params)
      |> Khala.Repo.insert

    {:ok, token} = Khala.Database.Token.create_for(user1)

    {:ok, campaign1} =
      %Khala.Campaign{}
      |> Khala.Campaign.changeset(%{name: "Monteporte"}, owner: user1)
      |> Khala.Database.Campaign.insert

    valid_params = %{
      full_name: "Jim Bob",
      physical: 10,
      mental: 10,
      social: 10,
      power: 10,
      finesse: 10,
      resilience: 10,
      user_id: user1.id,
      campaign_id: campaign1.id
    }

    state = [
      valid_params: valid_params,
      token: token
    ]

    {:ok, state}
  end

  test "create returns a 200", context do
    conn = post build_conn(), "/api/v1/characters", %{"character" =>
      context.valid_params, "token" => context.token.token}

    assert response(conn, 200)
  end
end
