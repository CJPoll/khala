ExUnit.start

Mix.Task.run "ecto.create", ~w(-r Khala.Repo --quiet)
Mix.Task.run "ecto.migrate", ~w(-r Khala.Repo --quiet)

Ecto.Adapters.SQL.Sandbox.mode(Khala.Repo, :manual)
