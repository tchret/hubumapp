class FollowButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isFollowing: this.props.isFollowing
    }
  }

  render() {
    var isFollowing = this.state.isFollowing ? 'is-following' : '';
    return(
      <a className={`follow-button btn btn-simple ${isFollowing}`} onClick={this.handleClick}>
        <span>⭐️</span>
        {this.state.isFollowing ? `Starred` : `Star @${this.props.username}`}
      </a>
    )
  }

  handleClick = () => {
    axios.railsPost(Routes.follow_user_path({id: this.props.username}))
      .then((response) => {
        this.setState({ isFollowing: response.data.isFollowing })
        response.data.isFollowing ?
          PubSub.publish('pushStarredUser', this.props)
        :
          PubSub.publish('removeStarredUser', this.props)

      })
  }
}
