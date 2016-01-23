defmodule Khala.PageController do
  use Khala.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
