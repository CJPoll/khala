defmodule Khala.Router do
  use Khala.Web, :router

  alias Khala.SessionController

  pipeline :browser_session do
    plug Guardian.Plug.VerifySession
    plug Guardian.Plug.LoadResource
  end

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", Khala do
    pipe_through [:browser, :browser_session] # Use the default browser stack

    get "/*any", PageController, :index
  end

  scope "/api/v1/", Khala do
    pipe_through :api

    post "/sessions", SessionController, :create
  end

  # Other scopes may use custom stacks.
  # scope "/api", Khala do
  #   pipe_through :api
  # end
end
