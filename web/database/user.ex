defmodule Khala.Database.User do
  use Khala.Web, :database

  alias Khala.User

  @type success :: {:ok, Khala.Token.t}
  @type error :: {:error, Ecto.Changeset.t}
  @type get_response :: Khala.User.t | nil | no_return
  @type id :: pos_integer | String.t

  @spec get(id) :: get_response
  def get(id), do: Khala.Repo.get(User, id)

  @spec get_by_token(Khala.Token.token_string) :: get_response
  def get_by_token(token) do
    from(u in Khala.User,
      join: t in Khala.Token, on: t.user_id == u.id,
      where: t.token == ^token)
    |> Khala.Repo.one
  end

  @spec get_by_email(String.t) :: get_response
  def get_by_email(email), do: User |> Khala.Repo.get_by(email: email)

  @spec join_campaign(id, id)
  :: success | error
  def join_campaign(user_id, campaign_id) do
    params = %{role: "player", user_id: user_id, campaign_id: campaign_id}

    %Khala.CampaignMembership{}
    |> Khala.CampaignMembership.changeset(params)
    |> Khala.Repo.insert
  end
end
