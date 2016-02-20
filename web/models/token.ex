defmodule Khala.Token do
  use Khala.Web, :model

  alias Khala.Repo

  schema "tokens" do
    field :token, :string
    field :expired, :boolean
    belongs_to :user, Khala.User

    timestamps
  end

  @required_fields ~w(token user_id expired)
  @optional_fields ~w()

  @doc """
  Creates a changeset based on the `model` and `params`.

  If no params are provided, an invalid changeset is returned
  with no validation performed.
  """
  def changeset(model, params \\ :empty) do
    model
    |> cast(params, @required_fields, @optional_fields)
  end

  def user_for(token_uuid) do
    token_uuid
    |> lookup
    |> Repo.preload(:user)
    |> Map.get(:user)
  end

  def lookup(token_uuid) do
    token = __MODULE__
            |> Repo.get_by(token: token_uuid)
  end

  def expire(token) do
    token
    |> changeset(%{expired: true})
    |> Repo.update
  end
end
