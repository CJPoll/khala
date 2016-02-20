defmodule Khala.UserView do
  use Khala.Web, :view

  def render("user.json", %{user: user}) do
    %{email: user.email, name: user.name, id: user.id}
  end
end
