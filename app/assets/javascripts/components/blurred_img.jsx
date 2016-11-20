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
    return(
      <div className={classNames('blurred-img-container', {'is-loaded': this.state.imageLoaded})}>
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
