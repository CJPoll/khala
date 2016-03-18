defmodule Khala.Repo.Migrations.CreateCharacter do
  use Ecto.Migration

  def change do
    create table(:characters) do
      add :full_name, :string
      add :nickname, :string
      add :physical, :integer
      add :mental, :integer
      add :social, :integer
      add :power, :integer
      add :finesse, :integer
      add :resilience, :integer

      timestamps
    end

  end
end
