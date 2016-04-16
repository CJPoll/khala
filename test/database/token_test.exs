defmodule Khala.Database.TokenTest do
  use Khala.ModelCase, async: true

  setup do
    uuid = UUID.uuid4()

    user_params = %{name: "cjpoll", email: "cjpoll@yahoo.com", password:
      "pass1", password_confirmation: "pass1"}

    {:ok, user} = %Khala.User{}
                  |> Khala.User.create_changeset(user_params)
                  |> Khala.Repo.insert

    token = %Khala.Token{}
            |> Khala.Token.changeset(%{token: uuid, expired: false, user_id: user.id})
            |> Khala.Repo.insert!


    state = [
      token: token,
      user: user
    ]

    {:ok, state}
  end

  test "looks up a token by uuid", context do
    token = Khala.Database.Token.get_by_token(context.token.token)
    assert token.token == context.token.token
  end

  test "gets user for given token", context do
    user = Khala.Database.Token.get_user_for(context.token.token)
    assert user.id == context.user.id
  end

  test "inserts a token for the given user", context do
    {:ok, token} = Khala.Database.Token.create_for(context.user)
    assert token.user_id == context.user.id
  end
end
