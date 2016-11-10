class TrackItemThumbnail extends React.Component {
  render() {
    return(
      <div className='track-item-thumbnail-container' onClick={this.handleClick}>
        <span className={classNames('track-item-thumbnail-state', {'is-loading': this.props.isCurrentTrack && !this.props.isPaused})}><i className={classNames("mdi", {"mdi-play": (!this.props.isPlaying && !this.props.isCurrentTrack) || this.props.isPaused, "mdi-pause": !this.props.isPaused || this.props.isCurrentTrack })} /></span>
        <img className='track-item-thumbnail' src={this.props.thumbnail_url} />
      </div>
    )
  }

  handleClick = (e) => {
    PubSub.publish('setYoutubeId', this.props.id);
  }

}
