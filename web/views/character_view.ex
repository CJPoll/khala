defmodule Khala.CharacterView do
  use Khala.Web, :view

  def render("characters.json", %{characters: characters}) do
    %{characters: render_many(characters, __MODULE__, "character.json")}
  end

  def render("character.json", %{character: character}) do
    %{
      id: character.id,
      fullName: character.full_name,
      nickname: character.nickname,
      stats: %{
        physical: character.physical,
        mental: character.mental,
        social: character.social,
        power: character.power,
        finesse: character.finesse,
        resilience: character.resilience
      }
    }
  end
end
