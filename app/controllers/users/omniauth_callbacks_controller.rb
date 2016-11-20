class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  def facebook
    user = User.find_for_facebook_oauth(request.env['omniauth.auth'])
    if user.persisted?
      sign_in user, event: :authentication
      if user.username
        redirect_to library_path(user.username)
      else
       redirect_to welcome_path
      end
      # set_flash_message(:notice, :success, kind: 'Facebook') if is_navigational_format?
    else
      raise
      # session['devise.facebook_data'] = request.env['omniauth.auth']
      # redirect_to new_user_registration_url
    end
  end
end
