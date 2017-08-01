import React, { Component, PropTypes } from 'react';
import Form from './components/form';
import Comments from './components/comments';
import Api from './http-adapter'
import YouTube from 'react-youtube'
class App extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
      active: 0
    }
    this.renderVideoPlayer = this.renderVideoPlayer.bind(this)
    this.pluckYoutubeVideoIdFromUrl = this.pluckYoutubeVideoIdFromUrl.bind(this)
  }

  componentWillMount() {
    this.getComments();
  }

  getComments() {
    Api.get('items').then((res) => {
      console.log(res)
      res.data.length-1
      this.setState({
        items: res.data,
        active: res.data.length-1
      })
    });
  }

  pluckYoutubeVideoIdFromUrl(url) {
    const REGEX = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
    return url.match(REGEX)[1];
  }

  renderVideoPlayer() {
    console.log(this.state)
    debugger;
    var id = this.pluckYoutubeVideoIdFromUrl(this.state.items[this.state.active].url)
    return(
      <YouTube
        videoId={id}
      />
    )
  }

  renderThumbs() {
    debugger;
    return this.state.items.map(item => (
      <div className="col-md-3 list-item">
        <a href="#" className="video">
          <YouTube
            opts={{
              width: '190',
              height: '180'
            }}
            videoId={this.pluckYoutubeVideoIdFromUrl(item.url)}
          />
        </a>
        {/* <h4 className="name"><a href="#">Princess Of China</a></h4>
        <p className="genre"><a href="#">Cold Play</a></p> */}
      </div>
    ))
  }

  render() {
    console.log(this.state);
    if(this.state.items && !this.state.items.length) return false;
    console.log('hi');
    return (
      <div>
      <div className="navbar sticky-top">
        <div className="row">
          <div className="col-md-2">
            <a className="navbar-brand" href="#"><img src="logo.png"/></a>
          </div>
          <div className="col-md-2 offset-8 login">
            <img src="man1.png"/>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2 sidebar">
            <div className="genre">
              <div className="header">Genre</div>
              <ul className="list">
                <li><span><img className="music-icon" src="music-player.png"/></span><a href="#">Pop</a></li>
                <li><span><img className="music-icon" src="music-player.png"/></span><a href="#">Rock</a></li>
                <li><span><img className="music-icon" src="music-player.png"/></span><a href="#">Jazz</a></li>
                <li><span><img className="music-icon" src="music-player.png"/></span><a href="#">Blues</a></li>
                <li><span><img className="music-icon" src="music-player.png"/></span><a href="#">Melody</a></li>
              </ul>
            </div>

            <div className="team-members">
              <div className="header">Team Members</div>
              <ul className="list">
                <li><span><img className="music-icon" src="man.png"/></span><a href="#">Gautam</a></li>
              </ul>
            </div>
          </div>
          <div className="col-10">
            <div className="container-inner">
              <div className="video-container">
                {this.renderVideoPlayer()}
                <div className="shadow-element"></div>
              </div>
              {/* <h1 className="main-header">Paradise</h1>
              <p className="description">There’s nothing quite like a good old slow-burner on the Official Singles Chart, and Paradise certainly took its own sweet time. The group’s second chart-topper, it finally reached Number 1 on its tenth week in the chart, knocking off Military Wives and Gareth Malone with Wherever You Are. The first Number 1 of 2012, Paradise has sold over 965,500 copies! It lasted a week at the top before Flo Rida’s Good Feeling gave it a nudge.</p> */}
              <div className="play-list">
                <h2 className="list-heading">Playlist</h2>
                <div className="container">
                  <div className="row">
                    {this.renderThumbs()}


                </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
      </div>
    );
  }
}


export default App;
