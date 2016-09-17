defmodule Khala.CampaignControllerTest do
  use Khala.ConnCase, async: true

  setup do
    user1_params = %{name: "cjpoll", email: "cjpoll@yahoo.com", password:
      "pass1", password_confirmation: "pass1"}

    {:ok, user1} = %Khala.User{}
                    |> Khala.User.create_changeset(user1_params)
                    |> Khala.Repo.insert

    user2_params = %{name: "ajpoll", email: "ajpoll@yahoo.com", password:
      "pass1", password_confirmation: "pass1"}

    {:ok, user2} = %Khala.User{}
                    |> Khala.User.create_changeset(user2_params)
                    |> Khala.Repo.insert

    {:ok, campaign1} = %Khala.Campaign{}
                        |> Khala.Campaign.changeset(%{name: "campaign1"}, owner: user1)
                        |> Khala.Repo.insert

    {:ok, campaign2} = %Khala.Campaign{}
                        |> Khala.Campaign.changeset(%{name: "campaign2"}, owner: user2)
                        |> Khala.Repo.insert

    {:ok, token} = Khala.Database.Token.create_for(user1)
    {:ok, user2_token} = Khala.Database.Token.create_for(user2)

    state = %{
      user1: user1,
      user2: user2,
      campaign1: campaign1,
      campaign2: campaign2,
      token: token,
      user2_token: user2_token}

    {:ok, state}
  end

  test "POST /api/v1/campaigns returns 200 on success", context do
    conn = post build_conn(), "/api/v1/campaigns",
    campaign: %{"name" => "Some Campaign"}, token: context.token.token
    assert response(conn, 200)
  end

  test "POST /api/v1/campaigns returns JSON representation of campaign", context do
    conn = post build_conn(), "/api/v1/campaigns",
    campaign: %{"name" => "Some Campaign"}, token: context.token.token
    data = json_response(conn, 200)
    campaign = data["campaign"]
    assert campaign["id"]
    assert campaign["name"]
  end

  test "POST /api/v1/campaigns inserts the campaign into the db", context do
    conn = post build_conn(), "/api/v1/campaigns",
    campaign: %{"name" => "Some Campaign"}, token: context.token.token

    data = json_response(conn, 200)
    campaign = data["campaign"]
    id = campaign["id"]

    model = Khala.Database.Campaign.get(id)
    assert model
  end

  test "POST /api/v1/campaigns returns 400 if invalid params", context do
    conn = post build_conn(), "/api/v1/campaigns",
    campaign: %{"namee" => "Some Campaign"}, token: context.token.token
    assert response(conn, 400)
  end

  test "POST /api/v1/campaigns returns error messages if invalid params", context do
    conn = post build_conn(), "/api/v1/campaigns",
    campaign: %{"namee" => "Some Campaign"}, token: context.token.token

    assert json_response(conn, 400) == %{"errors" => ["name can't be blank"]}
  end

  test "GET /campaigns returns a 200", context do
    conn = get build_conn(), "/api/v1/campaigns", token: context.token.token
    assert conn |> response(200)
  end

  test "GET /campaigns returns a JSON representation of campaigns", context do
    conn = get build_conn(), "/api/v1/campaigns", token: context.token.token
    data = json_response(conn, 200)
    campaigns = Map.get(data, "campaigns")
    assert :erlang.length(campaigns) == 1
  end

  test "GET /campaigns only returns the user's campaigns", context do
    conn = get build_conn(), "/api/v1/campaigns", token: context.token.token

    campaigns = conn
                |> json_response(200)
                |> Map.get("campaigns")

    id = context.campaign1.id
    name = context.campaign1.name
    assert [%{
        "id" => ^id,
        "name" => ^name}] = campaigns
  end

  test "GET /campaigns/:campaign_id returns the campaign object", context do
    conn = get build_conn(), "/api/v1/campaigns/" <> Integer.to_string(context.campaign1.id), token: context.token.token
    campaign = conn
                |> json_response(200)
                |> Map.get("campaign")

    id = context.campaign1.id
    name = context.campaign1.name
    assert %{
      "id" => ^id,
      "name" => ^name} = campaign
  end

  test "GET /campaigns/:campaign_id returns the campaign's players", context do
    conn = get build_conn(), "/api/v1/campaigns/" <> Integer.to_string(context.campaign1.id), token: context.token.token
    response = json_response(conn, 200)
    players = response
              |> Map.get("campaign")
              |> Map.get("players")

    expected = [
      "user.json"
      |> Khala.UserView.render(%{user: context.user1})
    |> Enum.reduce(%{}, fn({key, value}, acc) ->
    Map.put_new(acc, Atom.to_string(key), value)
    end)]


    assert ^expected = players
  end

  test "POST/campaigns/:campaign_id/players returns a 200", context do
    campaign_id = context.campaign1.id
    conn = post build_conn(), "/api/v1/campaigns/" <> Integer.to_string(campaign_id) <> "/players",
      token: context.token.token, email: context.user2.email

    assert response(conn, 200)
  end

  test "POST /campaigns/:campaign_id/players adds a new player to the campaign", context do
    campaign_id = context.campaign1.id
    post build_conn(), "/api/v1/campaigns/" <> Integer.to_string(campaign_id) <> "/players", token: context.token.token, email: context.user2.email

    users = campaign_id
            |> Khala.Database.Campaign.get
            |> Khala.Repo.preload(:users)
            |> Map.get(:users)

    user2 = Enum.find(users, fn(user) -> user.id == context.user2.id end)

    assert user2
  end

  test "POST /campaigns/:campaign_id/players returns the new campaign object", context do
    campaign_id = context.campaign1.id
    conn = post build_conn(), "/api/v1/campaigns/" <> Integer.to_string(campaign_id) <> "/players",
      token: context.token.token, email: context.user2.email

    players = conn
              |> json_response(200)
              |> Map.get("campaign")
              |> Map.get("players")

    assert length(players) == 2
  end

  test "POST /campaigns/:campaign_id/players requires the poster to be an owner", context do
    campaign_id = context.campaign1.id
    conn = post build_conn(), "/api/v1/campaigns/" <> Integer.to_string(campaign_id) <> "/players",
      token: context.user2_token.token, email: context.user2.email

    assert conn |> json_response(403)
  end
end
