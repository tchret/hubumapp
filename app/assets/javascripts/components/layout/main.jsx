class Library extends React.Component {
  render() {
    return(
      <main className='main'>
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
          <TrackList tracks={this.props.tracks} />
        </div>
      </main>
    )
  }
}
