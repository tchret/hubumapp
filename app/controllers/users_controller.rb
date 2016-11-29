class UsersController < ApplicationController
  before_action :find_user, only: [:show, :library, :impersonate, :tracks]

  def welcome
  end

  def impersonate
    if true_user.admin
      if true_user.id == current_user.id
        impersonate_user(@user)
      else
        stop_impersonating_user
      end
    end
    redirect_to root_path
  end

  def show
    if @user.nil?
      redirect_to root_path
    else
      @users = User.where(featured: true).where.not(id: [current_user.try(:id)]).joins(:tracks).uniq.all
    end
  end

  def tracks
    @tracks = @user.tracks.order(created_at: :desc)
  end

  def library
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
