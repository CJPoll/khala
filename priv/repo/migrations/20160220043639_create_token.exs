defmodule Khala.Repo.Migrations.CreateToken do
  use Ecto.Migration

  def change do
    create table(:tokens) do
      add :token, :string
      add :user_id, references(:users, on_delete: :nothing)
      add :expired, :boolean, default: false

      timestamps
    end

    create index(:tokens, [:user_id])
    create unique_index(:tokens, [:token])
  end
end
