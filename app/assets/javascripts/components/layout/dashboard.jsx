class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      library: null
    }
  }
  render() {
    return(
      <div className='dashboard'>
        <Sidebar {... this.props} />
        <Library {... this.state.library || this.props} emptyLib={this.emptyLib} />
      </div>
    )
  }

  componentDidMount() {
    PubSub.subscribe('setLibrary', this.setLibrary)
  }

  setLibrary = (msg, library) => {
    this.setState({ library: library })
  }

  emptyLib = () => {
    this.setState({library: this.emptyLibObject()})
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
