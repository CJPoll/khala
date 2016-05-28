defmodule Khala.Token do
  use Khala.Web, :model

  alias Khala.Repo

  schema "tokens" do
    field :token, :string
    field :expired, :boolean
    belongs_to :user, Khala.User

    timestamps
  end

  @type t :: %__MODULE__{}

  @type token_string :: String.t

  @all_fields [:token, :user_id, :expired]
  @required_fields [:token, :user_id, :expired]

  @doc """
  Creates a changeset based on the `model` and `params`.

  If no params are provided, an invalid changeset is returned
  with no validation performed.
  """
  def changeset(model, params \\ %{}) do
    model
    |> cast(params, @all_fields)
    |> validate_required(@required_fields)
  end

  def lookup(token_uuid) do
  __MODULE__
  |> Repo.get_by(token: token_uuid)
  end

  def expire(token) do
    token
    |> changeset(%{expired: true})
    |> Repo.update
  end
end
