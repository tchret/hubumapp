class PopoverSearch extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isActive: this.props.isActive
    }
  }
  render() {
    var isActive = this.props.isActive ? 'is-active' : '' ;
    return(
      <div className={`popover-search ${isActive}`}>
        {this.props.isLoading && <Loader />}
        {!this.props.isLoading && <PopoverSearchTracks tracks={this.props.tracks} toggleLoadingStateWithTrack={this.props.toggleLoadingStateWithTrack} />}
      </div>
    )
  }
}
