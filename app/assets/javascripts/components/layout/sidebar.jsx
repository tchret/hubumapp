class Sidebar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedUser: this.props.user
    }
  }
  render() {
    var isOffline = !this.props.current_user ? 'is-offline' : ''
    var libraryActive = this.props.current_user && this.state.selectedUser.id == this.props.current_user.id ? 'is-active' : '';

    return(
      <div className='sidebar'>
        <div className='sidebar-menu padded' onClick={this.handleMenuClick}>
          <div className='logo'>Hubum</div>
          <div className='sidebar-menu-username-container'>
            <div className={`sidebar-menu-bubble ${isOffline}`} />
            <div className='sidebar-menu-username'>
              {this.props.current_user ? this.props.current_user.username : 'offline'}
            </div>
          </div>
        </div>
        <div className='sidebar-channels'>
          <div className='sidebar-people-title'>
            MENU
          </div>
          <div className={`sidebar-channel-item ${libraryActive}`} onClick={this.handleLibraryClick}>
            <i>👑</i>
            library
          </div>
          <a className='sidebar-channel-item' href='http://www.facebook.com/groups/hubum' target='_blank'>
            <i>👯</i>
            community
          </a>
        </div>
        { this.props.user_signed_in ?
          false && <SidebarMessage title={'Hubum'} description={"is on desktop! Download, connect your account and your in."} url={'/download/desktop'} cta={'Download the app'} classes='download-desktop' />
        :
          <SidebarMessage title={'Hubum'} description={"is a private network of music libraries."} url={"http://app.hubum.com"} cta={'Create a library'} />
        }
        <div className='sidebar-people'>
          <div className='sidebar-people-title'>
            PEOPLE<span>({this.props.users.length})</span>
          </div>
          {this.props.users.map((user, i) => {
            if(user.has_tracks) {
              return(
                <SidebarPeopleItem {... user} key={i} user={this.props.user} isClickable={this.state.selectedUser.id != user.id} setActiveItem={this.setActiveItem} isActive={(this.state.selectedUser.id == user.id) || this.props.id == this.props.user.id} />
              )
            }
          })}
        </div>
      </div>
    )
  }

  setActiveItem = (user) => {
    this.props.emptyLib()
    this.setState({selectedUser: user})
    history.pushState(null, null, user.username);
  }

  handleMenuClick = () => {
    if(!this.props.current_user) {
      window.open('http://app.hubum.com', '_blank')
    }
  }

  handleLibraryClick = () => {
    if(this.props.user_signed_in) {
      if(this.state.selectedId != this.props.current_user.id) {
        PubSub.publish('libraryIsLoading', true)
        this.setActiveItem(this.props.current_user)
        axios.get(Routes.library_user_path({id: this.props.current_user.username, format: 'json'}))
          .then((response) => {
            PubSub.publish('setLibrary', response.data)
            PubSub.publish('libraryIsLoading', false)
          })
      }
    } else {
      window.open('http://facebook.com/groups/hubum', '_blank')
    }
  }

  componentDidMount() {
    var that = this
   window.onpopstate = function(event) {
    var username = document.location.pathname.replace('/', '')
    PubSub.publish('libraryIsLoading', true)
    axios.get(Routes.library_user_path({id: username, username: username, format: 'json'}))
      .then((response) => {
        PubSub.publish('setLibrary', response.data)
        PubSub.publish('libraryIsLoading', false)
        that.setState({selectedUser: response.data.user})
      })
   }
  }

}
