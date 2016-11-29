json.partial! 'users/library', tracks: @tracks, user: @user
if user_signed_in?
  json.current_user do
    json.extract! current_user, :username, :id
  end
  json.user_signed_in true
else
  json.user_signed_in false
end
