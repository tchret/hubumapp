class TrackList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedTrack: {},
      currentTrack: this.props.currentTrack,
      nowPlaying: this.props.nowPlaying,
      paused: this.props.paused,
      tracks: [],
      isLoading: true
    }
  }

  render() {
    return(
      <div className={`tracklist-wrapper ${this.state.isLoading ? 'is-loading' : ''}`}>
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
    } else if(data.playState == 0) {
      // if end of track
      var index = _.findIndex(this.state.tracks, (o) => { return o.id == this.state.currentTrack.id; });
      if(this.state.tracks[index + 1]) {
        PubSub.publish('setYoutubeTrack', this.state.tracks[index + 1])
      } else {
        PubSub.publish('setYoutubeTrack', {})
      }

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
    this.playFirstTrack = PubSub.subscribe('playFirstTrack', this.playFirstTrack);

    axios.get(Routes.tracks_user_path({id: this.props.username}))
      .then((response) => {
        this.setState({ tracks: response.data.tracks })
        this.setState({ isLoading: false })
      })

    window.addEventListener('mousedown', this.pageClick, false);
    key('backspace', this.onPressDel)
    key('right', _.throttle(this.nextTrack, 50))
    key('left', _.throttle(this.prevTrack, 50))
  }

  nextTrack = (e) => {
    if(this.state.currentTrack) {
      e.preventDefault();
      var index = this.currentTrackIndex();
      if(this.state.tracks[index + 1]) {
        PubSub.publish('setYoutubeTrack', this.state.tracks[index + 1]);
      }
    }
  }

  prevTrack = (e) => {
    if(this.state.currentTrack) {
      e.preventDefault();
      var index = this.currentTrackIndex();
      if(this.state.tracks[index - 1]) {
        PubSub.publish('setYoutubeTrack', this.state.tracks[index - 1]);
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener('mousedown', this.pageClick, false);
    PubSub.unsubscribe(this.playStateWithId)
    PubSub.unsubscribe(this.setYoutubeId)
    PubSub.unsubscribe(this.addToTracklist)
    PubSub.unsubscribe(this.playFirstTrack)
  }

  addToTracklist = (msg, track) => {
    var tracks = this.state.tracks
    track['justAdded'] = true
    tracks.unshift(track)

    if(this.state.tracks.length == 1) {
      this.props.setEmpty(false)
    }
    this.setState({ tracks: tracks })
  }

  onPressDel = (e) => {
    if(!_.isEmpty(this.state.selectedTrack) && this.props.auths.canWrite) {
      e.preventDefault();
      var r = confirm(`Do you really want to delete ${this.state.selectedTrack.title}?`);
      if (r == true) {
        axios.railsDelete(Routes.track_path({id: this.state.selectedTrack.id, format: 'json'}))
          .then((response) => {
            var tracks = this.state.tracks
            _.remove(tracks, function(track) { return track.id == response.data.id })
            this.setState({tracks: tracks})

            if(this.state.currentTrack.id == response.data.id) {
              PubSub.publish('setYoutubeTrack', {});
            }
          })
      }
    }
  }

  playFirstTrack = (e) => {
    if(_.isEmpty(this.state.selectedTrack)) {
      PubSub.publish('setYoutubeTrack', this.state.tracks[0])
    } else {
      PubSub.publish('setYoutubeTrack', this.state.selectedTrack)
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

  currentTrackIndex = () => {
    return _.findIndex(this.state.tracks, (o) => { return o.id == this.state.currentTrack.id; });
  }
}
