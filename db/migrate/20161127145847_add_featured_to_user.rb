class AddFeaturedToUser < ActiveRecord::Migration
  def change
    add_column :users, :featured, :boolean, default: true, null: false
  end
end
