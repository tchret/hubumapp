class YoutubePlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      track: {},
      playerReady: false,
      playState: 0,
      iframeClickable: true,
      isLoading: false
    }
  }

  render() {
    var isActive = this.state.track.youtube_id != null ? 'is-active' : false
    var playerReady = this.state.playerReady ? 'is-ready' : false
    var isLoading = this.state.isLoading ? 'is-loading' : false
    var style = {backgroundImage: `url('${this.state.track.discogs_thumb_url}')`}
    return(
      <Draggable
        onStart={this.handleDrag}
        onStop={this.handleStop}
        bounds={'[data-react-class="YoutubePlayer"]'}
        >
        <div className='youtube-player-container'>


        <div className={`youtube-player ${isActive} ${isLoading} ${playerReady}`} >
        <div className='player-title-bar' />
          <div className={!this.state.iframeClickable && 'is-not-clickable'}>
            <div className='player-infos-wrapper'>
              <div className='player-infos'>
                <div className='player-infos-release' style={style} />
                <div className='player-infos-text'>
                  <div className='player-infos-title'>
                    {this.state.track.title}
                  </div>
                  <div className='player-infos-beta'>
                    {this.state.track.artist_name}
                  </div>
                </div>
              </div>
            </div>
            <div id="video" ></div>
          </div>
        </div>
        </div>
      </Draggable>
    )
  }

  componentDidMount() {
    PubSub.subscribe('setYoutubeTrack', this.setYoutubeTrack);
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    key('space', this.handleSpacePress)
  }

  setYoutubeTrack = (msg, track) => {
    if(track.youtube_id == this.state.track.youtube_id) {
      this.state.playState == 1 ? this.player.pauseVideo() : this.player.playVideo()
    } else {
      this.setState({ track: track })
      if(this.state.playerReady) {
        this.player.loadVideoById(this.state.track.youtube_id);
      } else {
        this.loadMedia()
      }
    }
  }

  loadMedia = (e) => {
    // Create the player object when API is ready
    this.setState({ isLoading: true })
    var player;
    var that = this;
     this.player = new YT.Player('video', {
         videoId: that.state.track.youtube_id,
         playerVars: {
          autoplay: 1,
          showinfo: 0,
          disablekb: 0,
          iv_load_policy: 3,
          fs: 1,
          cc_load_policy: 0,
          rel: 0,
          controls: 2
        },

        events: {
          'onReady': that.onPlayerReady,
          'onStateChange': that.onPlayerStateChange
        }
     });
  }

  onPlayerStateChange = (e) => {
    this.setState({playState: e.data})
    PubSub.publish('playStateWithId', {playState: e.data, id: this.state.track.youtube_id})
    if(e.data == 3) {
      this.setState({isLoading: true})
    }

    if(e.data == 1) {
      setTimeout(() => {
        this.setState({ isLoading: false })
      }, 3000)
    }
  }

  onPlayerReady = (e) => {
    this.setState({playerReady: true})
  }

  handleDrag = (e) => {
    this.setState({ iframeClickable: false })
  }

  handleStop = (e) => {
    this.setState({ iframeClickable: true })
  }

  handleSpacePress = (e) => {
    if(!_.isEmpty(this.state.track)) {
      this.state.playState == 1 ? this.player.pauseVideo() : this.player.playVideo()
    } else {
      PubSub.publish('playFirstTrack')
    }
    e.preventDefault();
  }
}
