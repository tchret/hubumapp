json.partial! 'users/library', tracks: @tracks, user: @user

json.users @users do |user|
  json.extract! user, :username, :id
  json.facebook_picture_url user.facebook_picture_url
end
