defmodule Khala.Database.Campaign do
  alias Khala.Repo
  alias Khala.Campaign

  def insert(changeset) do
    if changeset.valid?,
    do: Repo.insert(changeset),
    else: {:error, changeset}
  end

  def get(id) do
    Repo.get(Campaign, id)
  end
end
