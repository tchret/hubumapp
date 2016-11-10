class PopoverSearchTracks extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedId: null,
      currentTrackId: null,
      nowPlaying: false,
      paused: false
    }
  }
  render() {
    return(
      <div className='popover-search-tracks-container'>
        <div className='popover-search-tracks'>
          {this.props.tracks.map((track, i) => {
            return(
              <PopoverSearchTrackItem
                key={i}
                {... track}
                selected={track.id == this.state.selectedId}
                isCurrentTrack={track.id == this.state.currentTrackId}
                isPlaying={(this.state.nowPlaying && this.state.isCurrentTrack) && !this.state.paused}
                setSelectedId={this.setSelectedId}
                isPaused={this.state.currentTrackId == track.id && this.state.paused}
              />
            )
            }
          )}
        </div>
      </div>
    )
  }

  setSelectedId = (id) => {
    this.setState({ selectedId: id })
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
    this.setState({currentTrackId: data})
  }

  componentDidMount() {
    PubSub.subscribe('playStateWithId', this.setplayedId);
    PubSub.subscribe('setYoutubeId', this.setLoadingTrack);
  }

  componentWillUnmount() {
    PubSub.unsubscribe('playStateWithId')
    PubSub.unsubscribe('setYoutubeId', this.setLoadingTrack);

  }
}
