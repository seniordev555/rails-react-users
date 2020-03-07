class Api::UsersController < ApplicationController
  respond_to :json

  def index
    respond_with User.all
  end

  def show
    respond_with User.find(params[:id])
  end

  def create
    respond_with :api, User.create(user_params)
  end

  def destroy
    respond_with User.destroy(params[:id])
  end

  def update
    user = User.find(params['id'])
    user.update(user_params)
    respond_with User, json: user
  end

  private

  def user_params
    params.require(:user).permit(
      :id,
      :email,
      :first_name,
      :last_name,
      :photo
    )
  end
end
