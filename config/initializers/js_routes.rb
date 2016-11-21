JsRoutes.setup do |config|
  config.include = [
    /^search_tracks$/,
    /^tracks$/,
    /^track$/,
    /^library_user$/
  ]
end
