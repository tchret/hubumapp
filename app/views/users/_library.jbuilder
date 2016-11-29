json.user do
  json.extract! @user, :first_name, :id, :last_name, :username
  json.facebook_picture_url @user.facebook_picture_url.gsub('100', '300')
end

json.auths do
  json.canWrite user_signed_in? ? current_user == @user : false
end

json.isEmpty @user.tracks.empty?




