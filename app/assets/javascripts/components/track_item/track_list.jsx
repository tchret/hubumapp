class TrackList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedTrack: {},
      currentTrack: {},
      nowPlaying: false,
      paused: false,
      tracks: this.props.tracks
    }
  }

  render() {
    return(
      <div className='tracklist-wrapper'>
        <div className='tracklist' onMouseDown={this.onMouseDown} onMouseUp={this.onMouseUp}>
          {this.state.tracks.map((track, i) => {
            if(i != 0) {
              track.justAdded = false
            }
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
    this.addToTracklist = PubSub.subscribe('addToTracklist', this.addToTracklist);
    window.addEventListener('mousedown', this.pageClick, false);
    key('backspace', this.onPressDel)
  }

  componentWillUnmount() {
    window.removeEventListener('mousedown', this.pageClick, false);
    PubSub.unsubscribe(this.playStateWithId)
    PubSub.unsubscribe(this.setYoutubeId)
    PubSub.unsubscribe(this.addToTracklist)
  }

  addToTracklist = (msg, track) => {
    var tracks = this.state.tracks
    track['justAdded'] = true
    tracks.unshift(track)
    this.setState({ tracks: tracks })
  }

  onPressDel = (e) => {
    if(!_.isEmpty(this.state.selectedTrack) && this.props.isCurrentUserLib) {
      e.preventDefault();
      var r = confirm(`Do you really want to delete ${this.state.selectedTrack.title}?`);
      if (r == true) {
        axios.railsDelete(Routes.track_path({id: this.state.selectedTrack.id, format: 'json'}))
          .then((response) => {
            var tracks = this.state.tracks
            _.remove(tracks, function(track) { return track.id == response.data.id })
            this.setState({tracks: tracks})
            if(this.state.currentTrack.id == response.data.id) {
              console.log('yo')
              PubSub.publish('setYoutubeTrack', {});
            }
          })
      }
    }
  }


  pageClick = (e) => {
    if (this.mouseIsDownOnPopover) { return }
    this.setState({ selectedTrack: {} })
  }

  onMouseDown = () => {
    this.mouseIsDownOnPopover = true;
  }

  onMouseUp = () => {
    this.mouseIsDownOnPopover = false;
  }
}
