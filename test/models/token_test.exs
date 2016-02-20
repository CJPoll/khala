defmodule Khala.TokenTest do
  use Khala.ModelCase

  alias Khala.Token
  alias Khala.User

  setup do
    user_params = %{email: "c@email.com", password: "abc",
      password_confirmation: "abc", name: "Cody"}
    {:ok, user} = %User{}
                  |> User.create_changeset(user_params)
                  |> Khala.Repo.insert

    {:ok, %{user: user}}
  end

  @valid_attrs %{token: "abc123", expired: false, user_id: 0}
  @invalid_attrs %{}

  test "changeset with valid attributes", context do
    changeset = Token.changeset(%Token{}, %{@valid_attrs | user_id: context.user.id})
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Token.changeset(%Token{}, @invalid_attrs)
    refute changeset.valid?
  end
end
