class BlurredImg extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      imageLoaded: false
    }
  }
  render() {

    var style = {
      backgroundImage: `url(${this.props.url})`
    }

    var isLoaded = this.state.imageLoaded ? 'is-loaded' : ''
    return(
      <div className={isLoaded}>
        <div className='blurred-img'  style={style}  />
      </div>
    )
  }

  componentDidMount() {
    var myImage =  new Image()
    myImage.src = this.props.url
    myImage.onload = () => { this.setState({ imageLoaded: true }) }
  }


}
