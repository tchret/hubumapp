class Library extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      isEmpty: _.isEmpty(this.props.tracks)
    }
  }
  render() {
    return(
      <main className={classNames('main', {'is-loading': this.state.isLoading, 'is-empty': this.state.isEmpty})}>
        {this.state.isLoading && <div className='main-loader'>loading</div>}
        <div className='navbar-wrapper'>
          <div className='navbar'>
            <div className='navbar-main'>
              <div className='navbar-user-infos'>
                <div className='navbar-username'>
                  @{this.props.user.username}
                </div>
                <div className='navbar-user-fullname'>
                  {this.props.user.first_name} {this.props.user.last_name}
                </div>
              </div>
            </div>
            <div className='navbar-menu'>
              {this.props.current_user && !this.state.isEmpty && <SearchInput />}
              {!this.props.current_user && <a className='btn btn-brand' href='http://app.hubum.com' target='_blank'><i>{_.sample(['✨', '⚡️', '🔥', '🎶'])}</i><span>Create a library</span></a>}

            </div>
          </div>
        </div>
        <div className='main-content'>
          <div className='user-profile'>
            <div className='user-profile-avatar'>
              <img src={this.props.user.facebook_picture_url} />
            </div>
            <div>
              <div className='user-profile-fullname'>
                {this.props.user.first_name} {this.props.user.last_name}
              </div>
              <div className='user-profile-tagline'>
                "Digger by day, digger by night"
              </div>
            </div>

          </div>
          {this.state.isEmpty && this.props.current_user &&
              <div className='main-empty-screen'><div><div className='main-empty-screen-emoji'>~~🚣~</div><div className='main-empty-screen-title'>Hey @{this.props.current_user.username}! <a onClick={() => {document.getElementById('search').focus()}}>Add your first track</a></div><SearchInput /></div></div>

          }
          <TrackList tracks={this.props.tracks} auths={this.props.auths} setEmpty={this.setEmpty} />
        </div>
      </main>
    )
  }

  componentDidMount() {
    PubSub.subscribe('libraryIsLoading', (msg, data) => {this.setState({ isLoading: data })})
  }

  setEmpty = (bool) => {
    this.setState({ isEmpty: bool })
  }
}
