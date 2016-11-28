class SidebarMessage extends React.Component {
  render() {
    return(
      <div className={`sidebar-message ${this.props.classes}`} >
        <div className='sidebar-message-background'>
          <section />
          <section />
        </div>
        <div className='sidebar-message-content'>
          <div className='sidebar-message-description'>
            <span>{this.props.title}</span> {this.props.description}
          </div>
          <div>
          <a className='btn btn-brand' href={this.props.url} target='_blank'><i>{_.sample(['✨', '⚡️', '🔥', '🎶'])}</i><span>{this.props.cta}</span></a>
          </div>
        </div>
      </div>
    )
  }
}
