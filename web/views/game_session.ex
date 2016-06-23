defmodule Khala.GameSession.View do
  def to_json(state) do
    characters = state
                  |> Map.get(:characters)
                  |> Enum.map(fn({player, character}) ->
                       character = Map.take(character, [:finesse, :full_name, :id, :mental, :nickname, :physical, :power, :resilience, :social])
                       {player, character}
                     end)
                  |> Map.new

    players = state
              |> Map.get(:players)
              |> Enum.map(fn(player) ->
                Map.take(player, [:email, :name])
              end)

    %{characters: characters,
      players: players}
  end
end
