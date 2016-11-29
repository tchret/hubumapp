class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      library: this.props,
      isLoading: false
    }
  }
  render() {
    return(
      <div className='dashboard'>
        <Sidebar {... this.props} emptyLib={this.emptyLib} />
        <div className='main-wrapper'>
          {this.state.isLoading && <div className='main-loader'>loading</div>}
          {this.state.library && !_.isEmpty(this.state.library.user) && <Library {... this.state.library } />}
        </div>
      </div>
    )
  }

  componentDidMount() {
    PubSub.subscribe('setLibrary', this.setLibrary)
  }

  setLibrary = (msg, library) => {
    this.setState({ library: library, isLoading: false })
  }

  emptyLib = () => {
    this.setState({ library: this.emptyLibObject(), isLoading: true })
  }

  emptyLibObject = () => {
    return {
      auths: {},
      current_user: {},
      tracks: [],
      user: {}
    }
  }
}
