class CreateTracks < ActiveRecord::Migration
  def change
    create_table :tracks do |t|
      t.string :title
      t.string :artist_name
      t.string :genre_names
      t.string :country
      t.string :style_names
      t.string :release_label_names
      t.string :label_discogs_id
      t.string :discogs_thumb_url
      t.integer :duration
      t.string :release_title
      t.integer :release_discogs_id
      t.integer :release_year
      t.string :country
      t.string :youtube_id
      t.string :release_catno

      t.timestamps null: false
    end
  end
end
