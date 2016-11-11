class SearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: null,
      isLoading: false,
      isActive: false,
      tracks: [],
      searchedQuery: null,
      isVisible: false,
      publishingTrack: null
    }
  }
  render() {
    return (
      <div className='input-container' onMouseDown={this.onMouseDown} onMouseUp={this.onMouseUp}>
        <span>
          🔎
        </span>
        <input ref='input' className='input search' placeholder='search a track' onKeyUp={this.handleSearch} onClick={this.handleClick} />
        {this.state.isActive && <PopoverSearch isLoading={this.state.isLoading} tracks={this.state.tracks} toggleLoadingStateWithTrack={this.toggleLoadingStateWithTrack} publishingTrack={this.state.publishingTrack} />}
      </div>
    )
  }

  handleSearch = (e) => {
    var query = e.target.value;
    if(this.state.searchedQuery != query && query != "") {
      window.clearTimeout(this.state.timer);
      this.state.timer = window.setTimeout(() => {
        this.setState({isLoading: true, isActive: true, searchedQuery: query})
        axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyBAk1-_dPOdWsT1aTHC9yCs4Bv6lKbGKDE&q=${query}&type=video`)
          .then((response) => this.setState({isLoading: false, tracks: response.data.items}))
      }, 700)
    }
  }

  toggleLoadingStateWithTrack = (track) => {
    this.setState({'isLoading': true, publishingTrack: track})
    axios.get(`https://api.discogs.com/database/search?q=${track.title}&token=ZwQzkINnLtOgZXTCnCfqLYcggUvzYxfVoebWQkeD&type=release`)
      .then((response) => {
        console.log(response.data.results[0].thumb)
        axios.get(response.data.results[0].resource_url)
          .then((response)=> {
            console.log(response.data)
          })
      })
  }

  componentDidMount() {
    window.addEventListener('mousedown', this.pageClick, false);
  }

  componentWillUnmount() {
    window.removeEventListener('mousedown', this.pageClick, false);
  }

  pageClick = (e) => {
    if (this.mouseIsDownOnPopover) { return }
    this.setState({ isActive: false })
    this.refs.input.value = ""
  }

  onMouseDown = () => {
    this.mouseIsDownOnPopover = true;
  }

  onMouseUp = () => {
    this.mouseIsDownOnPopover = false;
  }
}
