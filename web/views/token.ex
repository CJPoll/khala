defmodule Khala.TokenView do
  use Khala.Web, :view

  def render("token.json", %{token: token}) do
    %{token: token.token}
  end
end
