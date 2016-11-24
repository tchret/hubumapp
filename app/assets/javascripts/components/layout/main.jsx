class Library extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false
    }
  }
  render() {
    return(
      <main className={classNames('main', {'is-loading': this.state.isLoading})}>
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
              <SearchInput />
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
          <TrackList tracks={this.props.tracks} auths={this.props.auths} />
        </div>
      </main>
    )
  }

  componentDidMount() {
    PubSub.subscribe('libraryIsLoading', (msg, data) => {this.setState({ isLoading: data })})
  }
}
