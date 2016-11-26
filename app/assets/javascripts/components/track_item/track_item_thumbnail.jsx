class TrackItemThumbnail extends React.Component {
  render() {
    var isPlaying = this.props.isCurrentTrack && !this.props.isPaused ? 'is-playing' : ''
    var isPaused =  this.props.isPaused ? 'is-paused' : ''

    var mdiPlay = (!this.props.isPlaying && !this.props.isCurrentTrack) || this.props.isPaused ? 'mdi-play' : ''
    var mdiPause = !this.props.isPaused || this.props.isCurrentTrack ? 'mdi-pause' : ''
    return(
      <div className='track-item-thumbnail-container' onClick={this.handleClick}>
        <span className={`track-item-thumbnail-state ${isPlaying} ${isPaused}`}><i className={`mdi ${mdiPlay} ${mdiPause}`} /></span>
        <img className='track-item-thumbnail' src={this.props.discogs_thumb_url} />
      </div>
    )
  }

  handleClick = (e) => {
    PubSub.publish('setYoutubeTrack', this.props);
  }
}
