json.tracks tracks do |track|
  json.partial! 'tracks/detail', track: track
end
json.auths do
  json.canWrite user_signed_in? ? current_user == @user : false
end
