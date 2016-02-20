defmodule Khala.PageControllerTest do
  use Khala.ConnCase

  test "GET /", %{conn: conn} do
    conn = get conn, "/"
    assert html_response(conn, 200) =~ "Khala"
  end
end
