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
                        |> Khala.Campaign.changeset(%{name: "campaign1"}, owner: user2)
                        |> Khala.Repo.insert

    token = Khala.SessionController.create_token_for(user1)

    state = %{
      user1: user1,
      user2: user2,
      campaign1: campaign1,
      campaign2: campaign2,
      token: token}

    {:ok, state}
  end

  test "POST /api/v1/campaigns returns 200 on success" do
    conn = post conn(), "/api/v1/campaigns",
    campaign: %{"name" => "Some Campaign"}
    assert response(conn, 200)
  end

  test "POST /api/v1/campaigns returns JSON representation of campaign" do
    conn = post conn(), "/api/v1/campaigns",
    campaign: %{"name" => "Some Campaign"}
    data = json_response(conn, 200)
    campaign = data["campaign"]
    assert campaign["id"]
    assert campaign["name"]
  end

  test "POST /api/v1/campaigns inserts the campaign into the db" do
    conn = post conn(), "/api/v1/campaigns",
    campaign: %{"name" => "Some Campaign"}

    data = json_response(conn, 200)
    campaign = data["campaign"]
    id = campaign["id"]

    model = Khala.Database.Campaign.get(id)
    assert model
  end

  test "POST /api/v1/campaigns returns 400 if invalid params" do
    conn = post conn(), "/api/v1/campaigns",
    campaign: %{"namee" => "Some Campaign"}
    assert response(conn, 400)
  end

  test "POST /api/v1/campaigns returns error messages if invalid params" do
    conn = post conn(), "/api/v1/campaigns",
    campaign: %{"namee" => "Some Campaign"}

    assert json_response(conn, 400) == %{"errors" => ["name can't be blank"]}
  end

  @tag current: true
  test "GET /campaigns returns a 200", context do
    conn = get conn(), "/api/v1/campaigns", token: context.token.token
    assert conn |> response(200)
  end

  @tag current: true
  test "GET /campaigns returns a JSON representation of campaigns", context do
    conn = get conn(), "/api/v1/campaigns", token: context.token.token
    data = json_response(conn, 200)
    campaigns = Map.get(data, "campaigns")
    assert :erlang.length(campaigns) == 1
  end

  @tag current: true
  test "GET /campaigns only returns the user's campaigns", context do
    conn = get conn(), "/api/v1/campaigns", token: context.token.token
    data = json_response(conn, 200)
    campaigns = Map.get(data, "campaigns")

    assert campaigns == [%{"campaign" =>
        %{"id" => context.campaign1.id,
          "name" => context.campaign1.name}}]
  end
end
