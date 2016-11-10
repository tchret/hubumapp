class PopoverSearchTrackItem extends React.Component {
  render() {
    var track = this.props
    return(
      <div
        className={classNames('popover-search-track-item', {'is-selected': this.props.selected, 'is-playing': this.props.isPlaying, 'is-paused': this.props.isPaused})}
        onClick={this.handleClick}
        onDoubleClick={this.handleDoubleClick}
      >
        <TrackItemThumbnail {... this.props} />
        <div>
          <div className='popover-search-track-item-title'>{track.title}</div>
          <div className='popover-search-track-item-subtitle'>
            <div>
              {track.duration}
            </div>
            <hr/>
            <div>
              {track.year}
            </div>
          </div>
        </div>
      </div>
    )
  }

  handleClick = (e) => {
    this.props.setSelectedId(this.props.id)
  }

  handleDoubleClick = (e) => {
    PubSub.publish('setYoutubeId', this.props.id);
  }
}
