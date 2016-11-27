class UsersController < ApplicationController
  before_action :find_user, only: [:show, :library]

  def welcome
  end

  def show
    if @user.nil?
      redirect_to root_path
    else
      @tracks = @user.tracks.order(created_at: :desc)
      @users = User.where.not(id: [current_user.try(:id)]).joins(:tracks).uniq.all
    end
  end

  def library
    @tracks = @user.tracks.order(created_at: :desc)
  end

  def update
    current_user.update user_params
    if current_user.save
      redirect_to root_path
    else
      render :welcome
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :username)
  end

  def find_user
    if params[:username]
      @user = User.where('lower(username) = ?', params[:username].downcase).first
    else
      @user = User.where('lower(username) = ?', params[:id].downcase).first
    end
  end
end
