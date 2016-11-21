json.partial! 'users/library', tracks: @tracks, user: @user

json.users @users do |user|
  json.extract! user, :username, :id
  json.facebook_picture_url user.facebook_picture_url
end

if user_signed_in?
  json.current_user do
    json.extract! current_user, :username, :id
  end
end
