defmodule Khala.GameSession do
  use GenServer

  @type t :: pid

  defmodule State do
    defstruct players: [],
    characters: %{}
  end

  @spec start_session(Khala.Database.Campaign.id) :: {:ok, t} | :ignore | {:error, any}
  def start_session(campaign_id) when is_integer(campaign_id) do
    start_session(Integer.to_string(campaign_id))
  end

  def start_session(campaign_id) when is_binary(campaign_id) do
    case GenServer.start_link(__MODULE__, [], [name: {:global, campaign_id}]) do
      {:error, {:already_started, pid}} ->
        {:ok, pid}
      {:ok, session} ->
        {:ok, session}
    end
  end

  @spec session_for(Khala.Database.Campaign.id) :: t
  def session_for(campaign_id) when is_integer(campaign_id) do
    session_for(Integer.to_s(campaign_id))
  end

  def session_for(campaign_id) when is_binary(campaign_id) do
    case :global.whereis_name(campaign_id) do
      :undefined ->
        start_session(campaign_id)
      session ->
        {:ok, session}
    end
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

  @spec to_json(t) :: %{characters: [Khala.Character.t], players: [%{name: String.t}]}
  def to_json(session) do
    GenServer.call(session, :to_json)
  end

  def init(_args) do
    state = %State{}
    {:ok, state}
  end

  def handle_call({:character_for, player}, _from, state) do
    character = Map.get(state.characters, player.name)
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

  def handle_call(:to_json, _from, state) do
    json = %{
      characters: state.characters,
      players: state.players
    }
    {:reply, json, state}
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
    Map.put(characters, player.name, character)
  end
end
