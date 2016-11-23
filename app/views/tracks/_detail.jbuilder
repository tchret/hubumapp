json.extract! track,
  :title,
  :country,
  :genre_names,
  :artist_name,
  :release_discogs_id,
  :release_title,
  :youtube_id,
  :id,
  :release_catno,
  :release_label_names,
  :discogs_thumb_url,
  :release_year

json.style_names track.style_names ? track.style_names[0..40] : ""

json.duration Time.at(track.duration).utc.strftime("%M:%S")
