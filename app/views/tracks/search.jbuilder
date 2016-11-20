json.tracks @tracks do |track|
  json.extract! track, :title, :id
  json.duration Time.at(track.duration).utc.strftime("%M:%S")
  json.year track.published_at.year
  json.discogs_thumb_url track.thumbnail_url(:medium)
end
