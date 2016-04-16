defmodule Khala.Helper.Error do
  defmacro __using__(_args) do
    quote do
      def error(conn, code) do
        error = code
                |> error_structure
                |> Poison.encode!

        conn
        |> put_resp_content_type("application/json")
        |> send_resp(code, error)
      end

      def error(conn, code, changeset) do
        error = code
                |> error_structure(changeset)
                |> Poison.encode!

        conn
        |> put_resp_content_type("application/json")
        |> send_resp(code, error)
      end

      def error_structure(403) do
        %{errors: ["Forbidden"]}
      end

      def error_structure(400, changeset) do
        error_filter = fn ({error, error_message}) ->
          Atom.to_string(error) <> " " <> error_message
        end

        errors = Enum.map(changeset.errors, error_filter)

        %{errors: errors}
      end

      def error_structure(401, _changeset) do
        %{errors: ["Unauthorized"]}
      end
    end
  end
end
