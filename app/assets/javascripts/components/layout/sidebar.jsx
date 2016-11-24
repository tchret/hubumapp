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
        <div className='sidebar-menu padded' onClick={this.handleMenuClick}>
          <div className='logo'>Hubum</div>
          <div className='sidebar-menu-username-container'>
            <div className={classNames('sidebar-menu-bubble', {'is-offline': !this.props.current_user })} />
            <div className='sidebar-menu-username'>
              {this.props.current_user ? this.props.current_user.username : 'offline'}
            </div>
          </div>
        </div>
        <div className='sidebar-channels'>
          <div className='sidebar-people-title'>
            MENU
          </div>
          <div className={classNames('sidebar-channel-item', {'is-active': this.props.auths.canWrite && this.state.selectedId == this.props.user.id})} onClick={this.handleLibraryClick}>
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
          {this.props.users.map((user, i) => {
            if(user.has_tracks) {
              return(
                <SidebarPeopleItem {... user} key={i} user={this.props.user} isClickable={this.state.selectedId != user.id} setActiveItem={this.setActiveItem} isActive={(this.state.selectedId == user.id) || this.props.id == this.props.user.id} />
              )
            }
          })}
        </div>
      </div>
    )
  }

  setActiveItem = (id) => {
    this.setState({selectedId: id})
  }

  handleMenuClick = () => {
    if(!this.props.current_user) {
      window.open('http://app.hubum.com', '_blank')
    }
  }


  handleLibraryClick = () => {
    if(this.props.auths.canWrite) {
      if(this.state.selectedId != this.props.user.id) {
        PubSub.publish('libraryIsLoading', true)
        this.setActiveItem(this.props.user.id)
        axios.get(Routes.library_user_path({id: this.props.user.username, format: 'json'}))
          .then((response) => {
            PubSub.publish('setLibrary', response.data)
            PubSub.publish('libraryIsLoading', false)
          })
      }
    } else {
      window.open('http://facebook.com/groups/hubum', '_blank')
    }
  }

}
