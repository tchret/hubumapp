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
        <Library {... this.state.library || this.props} />
      </div>
    )
  }

  componentDidMount() {
    PubSub.subscribe('setLibrary', this.setLibrary)
  }

  setLibrary = (msg, library) => {
    this.setState({ library: library })
  }
}
