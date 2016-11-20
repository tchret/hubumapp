class UsersController < ApplicationController
  before_action :find_user, only: [:show]
  def welcome
  end

  def show
    @tracks = current_user.tracks.order(created_at: :desc)
  end

  def update
    current_user.update user_params
    if current_user.save
      redirect_to root_path
    else
      render params[:error_page]
      raise
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :username)
  end

  def find_user
    @user = User.where('lower(username) = ?', params[:username].downcase).first
  end
end
