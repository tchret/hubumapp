class PopoverSearch extends React.Component {
  render() {
    return(
      <div className='popover-search-container'>
        <div className='popover-search'>
          {this.props.isLoading && <Loader />}
          {!this.props.isLoading && <PopoverSearchTracks tracks={this.props.tracks} />}
        </div>
      </div>
    )
  }
}
