class Sidebar extends React.Component {
  render() {
    return(
      <div className='sidebar'>
        <div className='sidebar-menu padded'>
          <div className='logo'>Hubum</div>
          <div className='sidebar-menu-username-container'>
            <div className='sidebar-menu-bubble' />
            <div className='sidebar-menu-username'>
              {this.props.username || 'guest'}
            </div>
          </div>
        </div>
        <div className='sidebar-channels'>
          <div className='sidebar-channel-item is-active'>
            <span>👑</span>
            library
          </div>
          <a className='sidebar-channel-item' href='http://www.facebook.com/groups/hubum' target='_blank'>
            <span>👯</span>
            community
          </a>
        </div>
      </div>
    )
  }
}
