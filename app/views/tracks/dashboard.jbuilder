json.partial! 'users/library', tracks: @tracks, user: @user

json.users @users do |user|
  json.extract! user, :username, :id
  json.facebook_picture_url user.facebook_picture_url
  json.has_tracks user.tracks.any?
end

if user_signed_in?
  json.current_user do
    json.extract! current_user, :username, :id
  end
else
  json.current_user false
end
