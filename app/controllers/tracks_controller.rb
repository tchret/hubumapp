class TracksController < ApplicationController
  before_action :find_track, only: [:destroy]
  def search
    query = params[:query]
    videos = Yt::Collections::Videos.new
    @tracks = videos.where(q: query + ' music', type: 'video', max_results: 5)
  end

  def create
    if Track.exists?(youtube_id: params[:track][:youtube_id])
      @track = Track.find_by(youtube_id: params[:track][:youtube_id])
    else
      @track = Track.new track_params
      @track.duration = track_duration
      @track.save
    end
    if current_user.tracks.exists?(youtube_id: @track.youtube_id)
      raise
      # handle case track already in lib
    else
      current_user.tracks << @track
    end
  end

  def destroy
    current_user.tracks.delete(@track)
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

  def find_track
    @track = Track.find(params[:id])
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
