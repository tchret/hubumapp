class PopoverSearchTrackItem extends React.Component {
  render() {
    var track = this.mountTrack()
    return(
      <div
        className={classNames('popover-search-track-item', {'is-selected': this.props.selected, 'is-playing': this.props.isPlaying, 'is-paused': this.props.isPaused})}
        onClick={this.handleClick}
        onDoubleClick={this.handleDoubleClick}
      >
        <TrackItemThumbnail {... track} isCurrentTrack={this.props.isCurrentTrack} isPlaying={this.props.isPlaying} isPaused={this.props.isPaused} />
        <div>
          <div className='popover-search-track-item-title'>{track.title}</div>
          <div className='popover-search-track-item-subtitle'>
            <div>
              {track.year}
            </div>
          </div>
        </div>
      </div>
    )
  }

  handleClick = (e) => {
    this.props.setSelectedTrack(this.mountTrack())
  }

  handleDoubleClick = (e) => {
    PubSub.publish('setYoutubeTrack', this.mountTrack());
  }

  mountTrack = (track) => {
    return {
      id: this.props.id.videoId,
      title: this.props.snippet.title,
      thumbnail_url: this.props.snippet.thumbnails.high.url,
      year: this.props.snippet.publishedAt.substring(0, 4)
    }
  }
}
