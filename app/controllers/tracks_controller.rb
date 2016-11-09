class TracksController < ApplicationController
  def search
    query = params[:query]
    videos = Yt::Collections::Videos.new
    @tracks = videos.where(q: query + ' music', type: 'video', video_embeddable: true, max_results: 5)
  end
end
