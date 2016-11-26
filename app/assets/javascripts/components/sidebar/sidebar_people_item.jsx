class SidebarPeopleItem extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    var isActive = this.props.isActive ? 'is-active' : ''
    return(
      <a className={`sidebar-channel-item sidebar-people-item ${isActive}`} onClick={this.handleClick}>
        <div>
          <span><img src={this.props.facebook_picture_url} /></span>
          <span>{this.props.username}</span>
        </div>
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
