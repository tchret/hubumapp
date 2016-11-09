class PopoverSearchTracks extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedId: null
    }
  }
  render() {
    return(
      <div className='popover-search-tracks-container'>
        <div className='popover-search-tracks'>
          {this.props.tracks.map((track, i) => <PopoverSearchTrackItem key={i} {... track} selected={track.id == this.state.selectedId} setSelectedId={this.setSelectedId} />)}
        </div>
      </div>
    )
  }

  setSelectedId = (id) => {
    this.setState({ selectedId: id })
  }
}
