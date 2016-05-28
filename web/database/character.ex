defmodule Khala.Database.Character do
  use Khala.Web, :database

  @type success :: {:ok, Khala.Character.t}
  @type error :: {:error, Ecto.Changeset.t}

  @spec insert(Ecto.Changeset.t)
  :: success | error
  def insert(changeset) do
    if changeset.valid?,
    do: Khala.Repo.insert(changeset),
    else: {:error, changeset}
  end

  @spec get(pos_integer) :: Khala.Character.t | nil | no_return
  def get(id), do: Khala.Repo.get(Khala.Character, id)
end
