defmodule Khala.SessionView do
  use Khala.Web, :view

  def render("logout.json", %{}) do
    %{deleted: true}
  end
end
