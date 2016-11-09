class SearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: null,
      isLoading: false,
      isActive: false,
      tracks: [],
      searchedQuery: null
    }
  }
  render() {
    return (
      <div className='input-container'>
        <span>
          🔎
        </span>
        <input className='input search' placeholder='search a track' onKeyUp={this.handleSearch} />
        {this.state.isActive && <PopoverSearch isLoading={this.state.isLoading} tracks={this.state.tracks} />}
      </div>
    )
  }

  handleSearch = (e) => {
    var query = e.target.value
    if(this.state.searchedQuery != query) {
      window.clearTimeout(this.state.timer);
      this.setState({isLoading: true, isActive: true})
      this.state.timer = window.setTimeout(() => {
        this.setState({searchedQuery: query})
        axios.get(Routes.search_tracks_path({format: 'json', query: query}))
          .then((response) => this.setState({tracks: response.data.tracks, isLoading: false}))
      }, 1000)
    }
  }
}
