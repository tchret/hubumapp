json.partial! 'tracks/tracklist', tracks: @tracks
json.user do
  json.extract! @user, :first_name, :id, :last_name, :username
  json.facebook_picture_url @user.facebook_picture_url.gsub('100', '300')
end

if user_signed_in?
  json.current_user do
    json.extract! current_user, :username, :id
  end
  json.user_signed_in true
else
  json.user_signed_in false
end


