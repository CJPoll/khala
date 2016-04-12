defmodule Khala.CampaignMembership do
  use Khala.Web, :model

  schema "campaign_memberships" do
    field :role, :string, default: "owner"
    belongs_to :user, Khala.User
    belongs_to :campaign, Khala.Campaign

    timestamps
  end

  @required_fields ~w(role)
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
end
