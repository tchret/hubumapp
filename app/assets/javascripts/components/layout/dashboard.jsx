class Dashboard extends React.Component {
  render() {
    return(
      <div className='dashboard'>
        <Sidebar {... this.props} />
        <Main {... this.props} />
      </div>
    )
  }
}
