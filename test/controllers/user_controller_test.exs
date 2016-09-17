defmodule Khala.UserControllerTest do
  use Khala.ConnCase, async: true

  test "POST /users success" do
    conn = post build_conn(), "/api/v1/users",
      user: %{email: "cjpoll@gmail.com", password: "password01",
        password_confirmation: "password01", name: "Cody"}

    response = json_response(conn, 200)

    assert %{"email" => "cjpoll@gmail.com", "name" => "Cody", "id" => id} = response
    assert is_integer(id)
  end

  test "POST /users invalid" do
    conn = post build_conn(), "/api/v1/users",
      user: %{email: "cjpoll@gmail.com", password: "password01",
        password_confirmation: "password02", name: "Cody"}

    assert json_response(conn, 400) == %{"errors" => ["password_confirmation must match"]}
  end
end
