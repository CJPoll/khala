defmodule Khala.CampaignControllerTest do
  use Khala.ConnCase, async: true

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
end
