defmodule Khala.Campaign do
  use Khala.Web, :model

  alias Khala.User
  alias Khala.CampaignMembership

  schema "campaigns" do
    field :name, :string

    many_to_many :users, User, join_through: CampaignMembership

    timestamps
  end

  @required_fields ~w(name)
  @optional_fields ~w()

  @doc """
  Creates a changeset based on the `model` and `params`.

  If no params are provided, an invalid changeset is returned
  with no validation performed.
  """
  def changeset(model, params \\ :empty, opts \\ []) do
    owner = Keyword.get(opts, :owner, nil)

    model
    |> cast(params, @required_fields, @optional_fields)
    |> put_assoc(:users, [owner])
  end
end
