defmodule Khala.Repo.Migrations.LinkCharactersToUsers do
  use Ecto.Migration

  def change do
    alter table(:characters) do
      add :user_id, references(:users)
    end
  end
end
