defmodule Khala.SessionControllerTest do
  use Khala.ConnCase

  alias Khala.User
  alias Khala.Token

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


end
