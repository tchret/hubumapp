json.extract! track,
  :title,
  :country,
  :genre_names,
  :style_names,
  :artist_name,
  :release_discogs_id,
  :release_title,
  :youtube_id,
  :id,
  :release_catno,
  :release_label_names,
  :discogs_thumb_url,
  :release_year

json.duration Time.at(track.duration).utc.strftime("%M:%S")
