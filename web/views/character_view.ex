defmodule Khala.CharacterView do
  use Khala.Web, :view

  def render("character.json", %{character: character}) do
    %{id: character.id}
  end
end
