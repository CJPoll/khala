defmodule Khala.GameSession do
  use GenServer

  @type t :: pid

  defmodule State do
    defstruct players: []
  end

  def start_session do
    GenServer.start_link(__MODULE__, [])
  end

  def init(_args) do
    state = %State{}
    {:ok, state}
  end

  @spec add_player(t, %Khala.User{}) :: :ok
  def add_player(session, %Khala.User{} = player) do
    GenServer.cast(session, {:add_player, player})
  end

  @spec players(t) :: [%Khala.User{}]
  def players(session) do
    GenServer.call(session, :players)
  end

  def handle_call(:players, _from, %{players: players} = state) do
    {:reply, players, state}
  end

  def handle_cast({:add_player, player}, %{players: players} = state) do
    players = [player | players]
    state = %{state | players: players}
    {:noreply, state}
  end

end
