defmodule Khala.Database.Campaign do
  alias Khala.Repo
  alias Khala.Campaign

  def insert(changeset) do
    Repo.insert(changeset)
  end

  def get(id) do
    Repo.get(Campaign, id)
  end
end
