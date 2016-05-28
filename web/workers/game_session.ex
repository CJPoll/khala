defmodule Khala.GameSession do
  use GenServer

  @type t :: pid

  defmodule State do
    defstruct players: [],
    characters: %{}
  end

  @spec start_session :: {:ok, t} | :ignore | {:error, any}
  def start_session do
    GenServer.start_link(__MODULE__, [])
  end

  @spec add_player(t, Khala.User.t) :: :ok
  def add_player(session, %Khala.User{} = player) do
    GenServer.cast(session, {:add_player, player})
  end

  @spec character_for_player(t, Khala.User.t) :: %Khala.Character{}
  def character_for_player(session, player) do
    GenServer.call(session, {:character_for, player})
  end

  @spec choose_character(t, Khala.User.t, %Khala.Character{})
  :: :ok | {:error, :mismatched_character}
  def choose_character(session, player, character) do
    GenServer.call(session, {:choose_character, player, character})
  end

  @spec players(t) :: [Khala.User.t]
  def players(session) do
    GenServer.call(session, :players)
  end

  def init(_args) do
    state = %State{}
    {:ok, state}
  end

  def handle_call({:character_for, player}, _from, state) do
    character = Map.get(state.characters, player.id)
    {:reply, character, state}
  end

  def handle_call({:choose_character, player, character}, _from, state) do
    if player_owns_character?(player, character) do
      state = %{state |
        characters: set_character(state.characters, player, character) }

      {:reply, :ok, state}
    else
      {:reply, {:error, :mismatched_character}, state}
    end
  end

  def handle_call(:players, _from, %{players: players} = state) do
    {:reply, players, state}
  end

  def handle_cast({:add_player, player}, %{players: players} = state) do
    players = [player | players]
    state = %{state | players: players}
    {:noreply, state}
  end

  # Private functions

  defp player_owns_character?(player, character) do
    player.id == character.user.id
  end

  defp set_character(characters, player, character) do
    Map.put(characters, player.id, character)
  end
end
