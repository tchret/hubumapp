class SidebarPeopleItem extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {

    var isActive = this.props.isActive ? 'is-active' : ''
    var isPlaying = this.props.isPlaying || this.props.paused ? 'is-playing' : ''
    var iconClass = this.props.paused ? 'mdi-volume-low' : (this.props.isPlaying ? 'mdi-volume-high' : '')
    return(
      <a className={`sidebar-channel-item sidebar-people-item ${isActive} ${isPlaying}`} onClick={this.handleClick}>
        <div>
          <span><img src={this.props.facebook_picture_url} /></span>
          <span>{this.props.username}</span>
        </div>
        <i className={`mdi ${iconClass}`} />
      </a>
    )
  }

  handleClick = () => {
    if (this.props.isClickable) {
      PubSub.publish('libraryIsLoading', true)
      this.props.setActiveItem(this.props)
      axios.get(Routes.library_user_path({id: this.props.username, username: this.props.username, format: 'json'}))
        .then((response) => {
          PubSub.publish('setLibrary', response.data)
          PubSub.publish('libraryIsLoading', false)
        })
    }
  }
}
