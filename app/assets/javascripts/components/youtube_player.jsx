class YoutubePlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      track: {},
      playerReady: false,
      playState: 0
    }
  }

  render() {
    return(
      <div className={classNames('youtube-player', {'is-active': this.state.track.youtube_id != null})} >
        <div id="video"></div>
      </div>
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
    var player;
    var that = this;
     this.player = new YT.Player('video', {
         videoId: that.state.track.youtube_id,
         playerVars: {
          autoplay: 1,
          showinfo: 0,
          disablekb: 0,
          iv_load_policy: 3,
          fs: 0,
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
  }

  onPlayerReady = (e) => {
    this.setState({playerReady: true})
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
