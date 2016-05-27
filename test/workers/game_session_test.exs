defmodule Khala.GameSession.Test do
  use Khala.ModelCase
  require IEx

  setup do
    user = test_user("cjpoll@khala.com")

    {:ok, session} = Khala.GameSession.start_session

    state = %{
      user: user,
      session: session
    }

    {:ok, state}
  end

  test "it adds a player", context do
    user = context.user
    session = context.session

    Khala.GameSession.add_player(session, user)

    assert [user] == Khala.GameSession.players(session)
  end

  test "it allows a player to select a character"
end
