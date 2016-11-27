class PagesController < ApplicationController
  def landing
    if user_signed_in?
      current_user.username.nil? ? (redirect_to welcome_path) : (redirect_to library_path(username: current_user.username))
    else
      redirect_to user_facebook_omniauth_authorize_path
    end
  end

  def release
    redirect_to "http://old.hubum.com/r/#{params[:release]}"
  end
end
