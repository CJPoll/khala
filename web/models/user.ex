defmodule Khala.User do
  use Khala.Web, :model

  alias Khala.Repo
  alias Khala.Campaign
  alias Khala.CampaignMembership
  schema "users" do
    field :email, :string
    field :name, :string
    field :encrypted_password, :string
    field :password, :string, virtual: true
    field :password_confirmation, :string, virtual: true

    has_many :characters, Khala.Character

    many_to_many :campaigns, Campaign, join_through: CampaignMembership

    timestamps
  end

  @type t :: %__MODULE__{}

  @required_fields ~w(email password name)
  @optional_fields ~w(password_confirmation)

  @doc """
  Creates a changeset based on the `model` and `params`.

  If no params are provided, an invalid changeset is returned
  with no validation performed.
  """
  def changeset(model, params \\ :empty) do
    model
    |> cast(params, @required_fields, @optional_fields)
    |> lowercase_email
    |> update_change(:email, &String.downcase/1)
    |> unique_constraint(:email)
  end

  def create_changeset(model, params \\ :empty) do
    model
    |> changeset(params)
    |> validate_passwords_match
    |> encrypt_password
  end

  def login(%{email: email, password: password}), do: login(%{"email" => email, "password" => password})

  def login(%{"email" => email, "password" => password}) do
    email
    |> String.downcase
    |> from_email
    |> login(password)
  end

  def login(nil, _password) do
    {:error, :invalid_credentials}
  end

  def login(%__MODULE__{} = user, password) do
    success = valid_password?(password, user.encrypted_password)
    if success, do: {:ok, user}, else: {:error, :invalid_credentials}
  end

  def valid_password?(nil, _), do: false
  def valid_password?(_, nil), do: false
  def valid_password?(password, crypted), do: Comeonin.Bcrypt.checkpw(password, crypted)

  def from_email(nil), do: { :error, :not_found  }
  def from_email(email), do: Repo.get_by(__MODULE__, email: email)

  def passwords_match?(password, password), do: true
  def passwords_match?(_password, _password_confirmation), do: false

  def validate_passwords_match(changeset) do
    password = get_field(changeset, :password)
    password_confirmation = get_field(changeset, :password_confirmation)

    if passwords_match?(password, password_confirmation),
    do: changeset, else: add_error(changeset, :password_confirmation, "must match")
  end

  def encrypt_password(changeset) do
    case Ecto.Changeset.fetch_change(changeset, :password) do
      { :ok, password  } ->
        encrypted_password = Comeonin.Bcrypt.hashpwsalt(password)
        changeset
        |> Ecto.Changeset.put_change(:encrypted_password, encrypted_password)
        :error -> changeset
    end
  end

  def lowercase_email(changeset) do
    changeset
  end
end
