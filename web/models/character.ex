defmodule Khala.Character do
  use Khala.Web, :model

  schema "characters" do
    field :full_name, :string
    field :nickname, :string
    field :physical, :integer
    field :mental, :integer
    field :social, :integer
    field :power, :integer
    field :finesse, :integer
    field :resilience, :integer

    belongs_to :user, Khala.User
    belongs_to :campaign, Khala.Campaign

    timestamps
  end

  @type t :: %__MODULE__{}

  @required_fields ~w(full_name physical mental social power finesse resilience user_id campaign_id)
  @optional_fields ~w(nickname)

  @doc """
  Creates a changeset based on the `model` and `params`.

  If no params are provided, an invalid changeset is returned
  with no validation performed.
  """
  def changeset(model, params \\ :empty) do
    model
    |> cast(params, @required_fields, @optional_fields)
  end
end
