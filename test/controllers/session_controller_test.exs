defmodule Khala.SessionControllerTest do
  use Khala.ConnCase, async: true

  alias Khala.Token
  alias Khala.User

  setup do
    params = %{email: "cjpoll@gmail.com", password: "password01",
      password_confirmation: "password01", name: "Cody"}

    {:ok, user} = %User{}
                  |> User.create_changeset(params)
                  |> Repo.insert

    {:ok, %{user: user}}
  end

  test "POST /sessions success", context do
    conn = post conn(), "/api/v1/sessions",
    user: %{email: context.user.email, password: context.user.password}

    response = json_response(conn, 200)

    assert %{"token" => _token} = response

    token_count = Token
                  |> Repo.all
                  |> length()

    assert token_count == 1
  end

  test "POST /sessions no such user", context do
    conn = post conn(), "/api/v1/sessions",
    user: %{email: (context.user.email <> "abc"), password: context.user.password}

    response = json_response(conn, 401)

    assert %{"errors" => ["Invalid login credentials"]} == response
  end

  test "POST /sessions wrong password", context do
    conn = post conn(), "/api/v1/sessions",
    user: %{email: context.user.email, password: context.user.password <> "abc" }

    response = json_response(conn, 401)

    assert %{"errors" => ["Invalid login credentials"]} == response
  end

  @tag current: true
  test "DELETE /sessions", context do
    token = %Token{}
            |> Token.changeset(%{token: UUID.uuid4, expired: false, user_id: context.user.id})
            |> Repo.insert!

    conn = delete conn(), "/api/v1/sessions", token: token.token

    expired = Token
              |> Repo.get!(token.id)
              |> Map.get(:expired)

    response = json_response(conn, 200)

    assert %{"deleted" => true} = response
    assert expired
  end
end
