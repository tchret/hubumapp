class Sidebar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedId: this.props.user.id
    }
  }
  render() {
    return(
      <div className='sidebar'>
        <div className='sidebar-menu padded'>
          <div className='logo'>Hubum</div>
          <div className='sidebar-menu-username-container'>
            <div className={classNames('sidebar-menu-bubble', {'is-offline': !this.props.username })} />
            <div className='sidebar-menu-username'>
              {this.props.username || 'offline'}
            </div>
          </div>
        </div>
        <div className='sidebar-channels'>
          <div className='sidebar-people-title'>
            MENU
          </div>
          <div className={classNames('sidebar-channel-item', {'is-active': this.props.isCurrentUserLib && this.state.selectedId == this.props.user.id})} onClick={this.handleLibraryClick}>
            <i>👑</i>
            library
          </div>
          <a className='sidebar-channel-item' href='http://www.facebook.com/groups/hubum' target='_blank'>
            <i>👯</i>
            community
          </a>
        </div>
        <div className='sidebar-people'>
          <div className='sidebar-people-title'>
            PEOPLE<span>({this.props.users.length})</span>
          </div>
          {this.props.users.map((user) => {
            return(
              <SidebarPeopleItem {... user} user={this.props.user} setActiveItem={this.setActiveItem} isActive={(this.state.selectedId == user.id) || this.props.id == this.props.user.id} />
            )
          })}
        </div>
      </div>
    )
  }

  setActiveItem = (id) => {
    this.setState({selectedId: id})
  }


  handleLibraryClick = () => {
    if(this.props.isCurrentUserLib) {
      axios.get(Routes.library_user_path({id: this.props.user.username, format: 'json'}))
        .then((response) => {
          PubSub.publish('setLibrary', response.data)
          this.setActiveItem(this.props.user.id)
        })
    }
  }

}
