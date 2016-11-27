class AddAdminToUser < ActiveRecord::Migration
  def change
    add_column :users, :admin, :boolean
    tchret = User.find_by(username: 'tchret')
    tchret.admin = true
    tchret.save
  end
end
