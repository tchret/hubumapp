class TrackItem extends React.Component {
  render() {
    return(
      <div className={classNames('track-item', {'is-selected': this.props.isSelected})} onClick={this.handleClick} onDoubleClick={this.handleDoubleClick}>
        <TrackItemThumbnail {... this.props} isCurrentTrack={this.props.isCurrentTrack} isPlaying={this.props.isPlaying} isPaused={this.props.isPaused} />
        <div className='track-item-infos'>
          <div className='track-item-cell-primary track-item-cell'>
            <div>{this.props.title}</div>
            <div className='track-item-release-title'>{this.props.release_title}</div>
          </div>
          <div className='track-item-cell-secondary track-item-cell'>
            {this.props.artist_name}
          </div>

          <div className='track-item-cell-secondary track-item-cell track-item-cell-year'>
            {this.props.release_year}
          </div>
          <div className='track-item-cell-secondary track-item-cell'>
            {this.props.style_names}
          </div>
          <div className='track-item-cell-secondary track-item-cell'>
            {this.props.duration}
          </div>
        </div>
      </div>
    )
  }

  handleClick = (e) => {
    this.props.setSelectedTrack(this.props)
  }

  handleDoubleClick = (e) => {
    PubSub.publish('setYoutubeTrack', this.props);
  }
}
