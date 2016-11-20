class CreateTracksUsers < ActiveRecord::Migration
  def self.up
    create_table :tracks_users, :id => false do |t|
        t.references :track
        t.references :user
    end
    add_index :tracks_users, [:track_id, :user_id]
    add_index :tracks_users, :user_id
  end

  def self.down
    drop_table :tracks_users
  end
end
