class YoutubePlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { id: null }
  }

  render() {
    return(
      <div className={classNames('youtube-player', {'is-active': this.state.id != null})} >
        <iframe type="text/html" width="640" height="360"
          src={`http://www.youtube.com/embed/${this.state.id}?autoplay=1&cc_load_policy=0&disablekb=1&enablejsapi=1&fs=0&rel=0&showinfo=0`} />
      </div>
    )
  }

  componentDidMount() {
    PubSub.subscribe('setYoutubeId', this.setYoutubeId);
  }

  setYoutubeId = (msg, data) => {
    this.setState({ id: data })
  }
}
