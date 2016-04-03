defmodule Khala.Repo.Migrations.CreateCampaignMembership do
  use Ecto.Migration

  def change do
    create table(:campaign_memberships) do
      add :role, :string
      add :user_id, references(:users, on_delete: :nothing)
      add :campaign_id, references(:campaigns, on_delete: :nothing)

      timestamps
    end
    create index(:campaign_memberships, [:user_id])
    create index(:campaign_memberships, [:campaign_id])

  end
end
