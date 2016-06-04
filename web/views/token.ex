defmodule Khala.TokenView do
  use Khala.Web, :view

  def render("token.json", %{token: token, user: user}) do
    %{token: token.token, user_name: user.name}
  end

  def render("token.json", %{token: token}) do
    %{token: token.token}
  end
end
