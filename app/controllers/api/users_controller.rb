class Api::UsersController < ApplicationController
  before_action :set_user, only: %i[show update destroy]

  def index
    users = User.all
    render json: users
  end

  def show
    render json: @user
  end

  def create
    @user = User.create(user_params)
    render json: @user
  end

  def destroy
    @user.destroy
    head :no_content
  end

  def update
    @user.update_attributes(user_params)
    render json: @user
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

  def set_user
    @user = User.find(params[:id])
  end
end
