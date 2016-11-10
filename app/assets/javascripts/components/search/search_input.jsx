class SearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: null,
      isLoading: false,
      isActive: false,
      tracks: [],
      searchedQuery: null,
      isVisible: false
    }
  }
  render() {
    return (
      <div className='input-container' onMouseDown={this.onMouseDown} onMouseUp={this.onMouseUp}>
        <span>
          🔎
        </span>
        <input ref='input' className='input search' placeholder='search a track' onKeyUp={this.handleSearch} onClick={this.handleClick} />
        {this.state.isActive && <PopoverSearch isLoading={this.state.isLoading} tracks={this.state.tracks} />}
      </div>
    )
  }

  handleSearch = (e) => {
    var query = e.target.value;
    if(this.state.searchedQuery != query && query != "") {
      window.clearTimeout(this.state.timer);
      this.state.timer = window.setTimeout(() => {
        this.setState({isLoading: true, isActive: true, searchedQuery: query})
        axios.get(Routes.search_tracks_path({format: 'json', query: query}))
          .then((response) => this.setState({tracks: response.data.tracks, isLoading: false}))
      }, 1000)
    }
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
