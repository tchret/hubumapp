class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      library: this.props,
      isLoading: false,
      currentTrack: {},
      nowPlaying: false,
      paused: false,
      playingLibId: null
    }
  }
  render() {
    return(
      <div className='dashboard'>
        <Sidebar {... this.props} emptyLib={this.emptyLib} playingLibId={this.state.playingLibId} nowPlaying={this.state.nowPlaying} paused={this.state.paused} />
        <div className='main-wrapper'>
          {this.state.isLoading && <div className='main-loader'>loading</div>}
          {this.state.library && !_.isEmpty(this.state.library.user) && <Library {... this.state.library } currentTrack={this.state.currentTrack} nowPlaying={this.state.nowPlaying} paused={this.state.paused} />}
        </div>
      </div>
    )
  }

  componentDidMount() {
    PubSub.subscribe('setLibrary', this.setLibrary)
    PubSub.subscribe('setYoutubeTrack', this.setCurrentTrack);
    PubSub.subscribe('playStateWithId', this.setplayedId);
  }

  setLibrary = (msg, library) => {
    this.setState({ library: library, isLoading: false })
  }

  emptyLib = () => {
    this.setState({ library: this.emptyLibObject(), isLoading: true })
  }

  setCurrentTrack = (msg, track) => {
    this.setState({
      currentTrack: track,
      playingLibId: this.state.library.user.id
    })
  }

  emptyLibObject = () => {
    return {
      auths: {},
      current_user: {},
      tracks: [],
      user: {}
    }
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
}
