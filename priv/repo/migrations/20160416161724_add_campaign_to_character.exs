defmodule Khala.Repo.Migrations.AddCampaignToCharacter do
  use Ecto.Migration

  def change do
    alter table(:characters) do
      add :campaign_id, references(:campaigns), null: false
      modify :user_id, :integer, null: false
    end
  end
end
