json.tracks @tracks do |track|
  json.partial! 'tracks/detail', track: track
end

json.isCurrentUserLib user_signed_in? ? current_user == @user : false
