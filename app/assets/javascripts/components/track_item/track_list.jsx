class TrackList extends React.Component {
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
      <div className='tracklist-wrapper'>
        <div className='tracklist'>
          {this.props.tracks.map((track, i) => {
            return (
              <TrackItem
                {... track}
                key={i}
                setSelectedTrack={this.setSelectedTrack}
                isSelected={track.id == this.state.selectedTrack.id}
                isCurrentTrack={track.youtube_id == this.state.currentTrack.youtube_id}
                isPlaying={(this.state.nowPlaying && track.youtube_id == this.state.currentTrack.youtube_id) && !this.state.paused}
                isPaused={this.state.currentTrack.youtube_id == track.youtube_id && this.state.paused}

              />
            )
          })}
        </div>
      </div>
    )
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
