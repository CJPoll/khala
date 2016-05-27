defmodule Khala.Database.Character do
  def insert(changeset) do
    if changeset.valid?,
    do: Khala.Repo.insert(changeset),
    else: {:error, changeset}
  end

  def get(id), do: Khala.Character |> Khala.Repo.get(id)
end
