class PopoverSearchTrackItem extends React.Component {
  render() {
    var track = this.props
    return(
      <div className={classNames('popover-search-track-item', {'is-selected': this.props.selected})} onClick={this.handleClick}>
        <img className='popover-search-track-item-thumbnail' src={track.thumbnail_url} />
        <div>
          <div className='popover-search-track-item-title'>{track.title}</div>
          <div className='popover-search-track-item-subtitle'>
            <div>
              {track.duration}
            </div>
            <hr/>
            <div>
              {track.year}
            </div>
          </div>
        </div>
      </div>
    )
  }

  handleClick = (e) => {
    this.props.setSelectedId(this.props.id)
    PubSub.publish('setYoutubeId', this.props.id);
  }
}
