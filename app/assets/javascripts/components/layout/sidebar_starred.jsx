class SidebarStarred extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      users: [],
      selectedUser: {}
    }
  }
  render() {
    return(
      <div className='sidebar-people'>
        <div className='sidebar-people-title'>
          STARRED<span>({this.state.users.length})</span>
        </div>
        {this.state.users.map((user, i) => {
          return(
            <SidebarPeopleItem {... user} key={i} user={this.props.user} isPlaying={user.id == this.props.playingLibId && this.props.nowPlaying} paused={user.id == this.props.playingLibId && this.props.paused} isClickable={this.state.selectedUser.id != user.id} setActiveItem={this.props.setActiveItem} isActive={(this.state.selectedUser.id == user.id)} />
          )
        })}
      </div>
    )
  }

  componentDidMount() {
    PubSub.subscribe('pushStarredUser', this.pushUser)
    PubSub.subscribe('removeStarredUser', this.removeUser)
  }

  pushUser = (msg, user) => {
    var users = this.state.users
    users.push(user)

    this.setState({users: users})
  }

  removeUser = (msg, user) => {
    var users = _.reject(this.state.users, ['id', user.id]);
    this.setState({users: users})
  }
}
