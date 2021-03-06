class SearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.defaultState()
  }
  render() {
    return (
      <div>
      <div id='input-container-filter' onClick={(e) => { e.target.outerHTML = ""; delete e.target }} />
      <div className='input-container' onMouseDown={this.onMouseDown} onMouseUp={this.onMouseUp}>
        <span>
          🔎
        </span>
        <input ref='input' type='text' className='input search' placeholder='search a track' id='search' onKeyUp={this.handleSearch} onClick={this.handleClick} />
        {this.state.isActive && <PopoverSearch isLoading={this.state.isLoading} tracks={this.state.tracks} toggleLoadingStateWithTrack={this.toggleLoadingStateWithTrack} publishingTrack={this.state.publishingTrack} />}
      </div>
      </div>
    )
  }

  handleSearch = (e) => {
    var query = e.target.value;
    if(this.state.searchedQuery != query && query != "") {
      window.clearTimeout(this.state.timer);
      this.state.timer = window.setTimeout(() => {
        this.setState({isLoading: true, isActive: true, searchedQuery: query})
        axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyBAk1-_dPOdWsT1aTHC9yCs4Bv6lKbGKDE&q=${query}&type=video`)
          .then((response) => this.setState({isLoading: false, tracks: response.data.items}))
      }, 700)
    }
  }

  toggleLoadingStateWithTrack = (track) => {
    this.setState({'isLoading': true, publishingTrack: track})
    var firstDiscogsResult, detailedResult, duration, multiArtists
    var finalTrack = {}

    axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${track.youtube_id}&part=contentDetails&key=AIzaSyBAk1-_dPOdWsT1aTHC9yCs4Bv6lKbGKDE`)
      .then((response) => {
        duration = response.data.items[0].contentDetails.duration
        finalTrack['duration'] = duration
        axios.get(`https://api.discogs.com/database/search?q=${this.sanitize(track.title)}&token=ZwQzkINnLtOgZXTCnCfqLYcggUvzYxfVoebWQkeD&type=release`)
          .then((response) => {
            var firstDiscogsResult = response.data.results[0]
            if(_.isEmpty(response.data.results)) {
              finalTrack['title'] = track.title
              finalTrack['youtube_id'] = track.youtube_id
              finalTrack['discogs_thumb_url'] = track.discogs_thumb_url

              axios.railsPost(Routes.tracks_path({format: 'json'}), {track: finalTrack})
                .then((response) => {
                  this.setState(this.defaultState())
                  this.refs.input.value = ""
                  PubSub.publish('addToTracklist', response.data);
                })
            } else {
              axios.get(firstDiscogsResult.resource_url)
                .then((response)=> {
                  var multiArtists = false
                  var detailedResult = response.data;
                  if (detailedResult.artists.length == 1 && detailedResult.artists[0].name != 'Various') {
                    finalTrack['artist_name'] = detailedResult.artists[0].name
                    finalTrack['artist_discogs_id'] = detailedResult.artists[0].id
                  } else {
                    multiArtists = true
                  }
                  console.log(detailedResult)
                  detailedResult.tracklist.map((tracklistItem) => {
                    console.log(track.title.toLowerCase(), tracklistItem.title.toLowerCase())
                    if (this.sanitize(track.title.toLowerCase()).indexOf(this.sanitize(tracklistItem.title.toLowerCase())) >= 0) {
                      finalTrack['title'] = tracklistItem.title
                      if (multiArtists) {
                        if (tracklistItem.artists.length == 1) {
                          finalTrack['artist_name'] = tracklistItem.artists[0].name
                        } else {
                          // handle multi artist per track
                        }
                      }
                    }
                  })

                  if (!finalTrack['title']) {
                    finalTrack['title'] = track.title
                  }
                  finalTrack['country'] = detailedResult.country;
                  finalTrack['genre_names'] = (detailedResult.genres || []).join(', ');
                  finalTrack['style_names'] = (detailedResult.styles || []).join(', ');
                  finalTrack['release_discogs_id'] = detailedResult.id;
                  finalTrack['release_year'] = firstDiscogsResult.year;
                  finalTrack['release_title'] = detailedResult.title;
                  finalTrack['youtube_id'] = track.youtube_id;
                  finalTrack['release_catno'] = firstDiscogsResult.catno;
                  finalTrack['release_label_names'] = (firstDiscogsResult.label || []).join(', ')

                  // TODO — LABEL

                  // if no artist name, the title of the final track
                  // is the title of the youtube track

                  finalTrack['discogs_thumb_url'] = firstDiscogsResult.thumb
                  // console.log(firstDiscogsResult)
                  // console.log('discogs release', detailedResult)
                  // console.log('final track', finalTrack)
                  axios.railsPost(Routes.tracks_path({format: 'json'}), {track: finalTrack})
                    .then((response) => {
                      this.setState(this.defaultState())
                      this.refs.input.value = ""
                      PubSub.publish('addToTracklist', response.data);
                    })
                })
            }



          })
      })
  }

  componentDidMount() {
    window.addEventListener('mousedown', this.pageClick, false);
  }

  componentWillUnmount() {
    window.removeEventListener('mousedown', this.pageClick, false);
  }

  pageClick = (e) => {
    if (this.mouseIsDownOnPopover) { return }
    this.setState({ isActive: false })
    this.refs.input.value = ""
  }

  onMouseDown = () => {
    this.mouseIsDownOnPopover = true;
  }

  onMouseUp = () => {
    this.mouseIsDownOnPopover = false;
  }

  defaultState = () => {
    return {
      timer: null,
      isLoading: false,
      isActive: false,
      tracks: [],
      searchedQuery: null,
      isVisible: false,
      publishingTrack: null
    }
  }

  sanitize = (title) => {
    return title.replace('&', '%26').replace(/ *\([^)]*\) */, '').replace(/ *\[[^)]*\] */, '').replace('?', '').replace('.', '').trim()
  }
}
