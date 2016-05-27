defmodule Khala.GameSession.Test do
  use Khala.ModelCase
  require IEx

  setup do
    user = test_user("cjpoll@khala.com")
    campaign = test_campaign("Monteporte", user)
    character = "Jim Hold"
                |> test_character(user, campaign)
                |> Khala.Database.Character.preload(:user)

    user = Khala.Database.User.preload(user, :characters)

    {:ok, session} = Khala.GameSession.start_session

    state = %{
      campaign: campaign,
      character: character,
      session: session,
      user: user
    }

    {:ok, state}
  end

  test "it adds a player", context do
    user = context.user
    session = context.session

    Khala.GameSession.add_player(session, user)

    assert [user] == Khala.GameSession.players(session)
  end

  test "it allows a player to select a character", context do
    user = context.user
    session = context.session
    character = context.character

    :ok = Khala.GameSession.choose_character(session, user, character)

    assert character == Khala.GameSession.character_for_player(session, user)
  end
end
