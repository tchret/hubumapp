class UserProfile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      imageLoaded: false
    }
  }

  render() {
    var imageLoaded = this.state.imageLoaded ? 'is-loaded' : '';
    return(
      <div className='user-profile'>
        <div className={`user-profile-avatar ${imageLoaded}`}>
          <img src={this.props.facebook_picture_url} onLoad={this.handleLoad} />
        </div>
        <div>
          <div className='user-profile-fullname'>
            {this.props.first_name} {this.props.last_name}
          </div>
          <div className='user-profile-tagline'>
            "Digger by day, digger by night"
          </div>
        </div>
      </div>
    )
  }

  handleLoad = () => {
    console.log('yo')
    this.setState({ imageLoaded: true })
  }

}
