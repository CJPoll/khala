defmodule Khala.Router do
  use Khala.Web, :router

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

  scope "/api/v1/", Khala do
    pipe_through :api

    post "/sessions", SessionController, :create
    post "/users", UserController, :create
    post "/characters", CharacterController, :create
    post "/campaigns", CampaignController, :create

    get "/characters", CharacterController, :index

    delete "/sessions", SessionController, :delete
  end

  scope "/", Khala do
    pipe_through [:browser, :browser_session] # Use the default browser stack

    get "/*any", PageController, :index
  end

  # Other scopes may use custom stacks.
  # scope "/api", Khala do
  #   pipe_through :api
  # end
end
