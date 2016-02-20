defmodule Khala.User do
  use Khala.Web, :model
  alias Khala.Repo

  schema "users" do
    field :email, :string
    field :name, :string
    field :encrypted_password, :string
    field :password, :string, virtual: true
    field :password_confirmation, :string, virtual: true

    timestamps
  end

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
  end

  def create_changeset(model, params \\ :empty) do
    model
    |> changeset(params)
    |> validate_passwords_match
    |> encrypt_password
  end

  def login(%{email: email, password: password}) do
    email
    |> from_email
    |> login(password)
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
    do: changeset, else: add_error(changeset, :unmatching_password, "Password Confirmation must match")
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
end
