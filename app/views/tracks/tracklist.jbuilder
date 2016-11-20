json.tracks @tracks do |track|
  json.partial! 'tracks/detail', track: track
end
