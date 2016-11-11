class PopoverSearch extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isActive: this.props.isActive
    }
  }
  render() {
    return(
      <div className={classNames('popover-search', {'is-active': this.props.isActive})} >
        {this.props.isLoading && <Loader />}
        {!this.props.isLoading && <PopoverSearchTracks tracks={this.props.tracks} toggleLoadingStateWithTrack={this.props.toggleLoadingStateWithTrack} />}
      </div>
    )
  }
}
