json.followers @user.followers(User) do |user|
  json.extract! user, :username, :id
end
