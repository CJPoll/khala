defmodule Khala.UserTest do
  use Khala.ModelCase

  alias Khala.User

  @valid_attrs %{email: "user@email.com", name: "Cody", password: "password01",
    password_confirmation: "password01"}

  @invalid_attrs %{}

  @unmatching_password %{ @valid_attrs | password_confirmation: "password02" }

  setup do
    user = %User{}
            |> User.create_changeset(@valid_attrs)
            |> Repo.insert!

    {:ok, %{user: user, login: %{email: user.email, password: user.password}}}
  end

  test "changeset with valid attributes" do
    changeset = User.changeset(%User{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = User.changeset(%User{}, @invalid_attrs)
    refute changeset.valid?
  end

  test "#create_changeset requires matching password_confirmation" do
    changeset = User.create_changeset(%User{}, @unmatching_password)
    refute changeset.valid?
  end

  test "can get user by email", context do
    user = User.from_email(context.user.email)
    assert user.email == context.user.email
  end

  test "password is not saved in plaintext", context do
    user = User.from_email(context.user.email)
    refute user.password
  end

  test "encrypted_password is saved", context do
    user = User.from_email(context.user.email)
    assert user.encrypted_password
  end

  test "#login knows when credentials are accurate", context  do
    {:ok, user} = User.login(context.login)
    assert user?(user)
  end

  test "#login knows when credentials are incorrect", context do
    login = %{context.login | password: "wrongpassword"}
    assert {:error, :invalid_credentials} == User.login(login)
  end

  defp user?(%User{}), do: true
  defp user?(_anything), do: false
end
