class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  def facebook
    user = User.find_for_facebook_oauth(request.env['omniauth.auth'])
    if user
      if user.save(validate: false)
        sign_in user, event: :authentication
        if user.username && user.username != ""
          redirect_to library_path(user.username)
        else
         redirect_to welcome_path
        end
        # set_flash_message(:notice, :success, kind: 'Facebook') if is_navigational_format?
      else
        # session['devise.facebook_data'] = request.env['omniauth.auth']
        # redirect_to new_user_registration_url
      end
    else
      redirect_to 'http://facebook.com/groups/hubum'
    end
  end
end
