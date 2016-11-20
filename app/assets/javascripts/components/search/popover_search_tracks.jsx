class PopoverSearchTracks extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedTrack: {},
      currentTrack: {},
      nowPlaying: false,
      paused: false
    }
  }
  render() {
    return(
      <div className='popover-search-tracks-container'>
        <div className={classNames('popover-search-tracks', {'has-selected-item': !_.isEmpty(this.state.selectedTrack) })}>
          {this.props.tracks.map((track, i) => {
            return(
              <PopoverSearchTrackItem
                key={i}
                {... track}
                selected={track.id.videoId == this.state.selectedTrack.youtube_id}
                isCurrentTrack={track.id.videoId == this.state.currentTrack.youtube_id}
                isPlaying={(this.state.nowPlaying && track.id.videoId == this.state.currentTrack.youtube_id) && !this.state.paused}
                setSelectedTrack={this.setSelectedTrack}
                isPaused={this.state.currentTrack.youtube_id == track.id.videoId && this.state.paused}
              />
            )
            }
          )}
          {  !_.isEmpty(this.state.selectedTrack) &&
            <div className='popover-search-button-container'>
              <a className='popover-search-button btn' onClick={this.addTrack}>✅ Add selected track to library</a>
            </div>
          }
        </div>
      </div>
    )
  }

  addTrack = (e) => {
    this.props.toggleLoadingStateWithTrack(this.state.selectedTrack)
    this.setState({ selectedTrack: {} })
  }

  setSelectedTrack = (track) => {
    this.setState({ selectedTrack: track })
  }

  setplayedId = (msg, data) => {
    if(data.playState == 1) {
      this.setState({
        nowPlaying: true,
        paused: false
      })
    } else if (data.playState == 2) {
      this.setState({ paused: true })
    } else {
      this.setState({ nowPlaying: false, paused: false })
    }
  }

  setLoadingTrack = (msg, data) => {
    this.setState({currentTrack: data})
  }

  componentDidMount() {
    this.playStateWithId = PubSub.subscribe('playStateWithId', this.setplayedId);
    this.setYoutubeId = PubSub.subscribe('setYoutubeTrack', this.setLoadingTrack);
  }

  componentWillUnmount() {
    PubSub.unsubscribe(this.playStateWithId)
    PubSub.unsubscribe(this.setYoutubeId)
  }
}
