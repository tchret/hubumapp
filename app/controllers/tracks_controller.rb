class TracksController < ApplicationController
  def search
    query = params[:query]
    videos = Yt::Collections::Videos.new
    @tracks = videos.where(q: query + ' music', type: 'video', max_results: 5)
  end

  def create
    @track = Track.new track_params
    @track.duration = track_duration
    @track.save

    current_user.tracks << @track
  end

  private

  def track_duration
    dur = params[:track][:duration]
    pattern = "PT"
    pattern += "%HH" if dur.include? "H"
    pattern += "%MM" if dur.include? "M"
    pattern += "%SS"
    DateTime.strptime(dur, pattern).seconds_since_midnight.to_i
  end

  def track_params
    params.require(:track).permit(
      :title,
      :country,
      :genre_names,
      :style_names,
      :release_discogs_id,
      :release_title,
      :youtube_id,
      :artist_name,
      :release_catno,
      :release_year,
      :release_label_names,
      :discogs_thumb_url
    )

  end
end
