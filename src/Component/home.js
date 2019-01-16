import React, { Component } from 'react';

class Home extends Component {
  render() {
    return (
      <div className="home d-flex align-items-center" id="home">
        <div className="d-flex flex-column bd-highlight" style={{'marginLeft' : '10%'}}>
          <span className="title-text">
          Chuck Norris doesn't go on the internet
          </span>
          <span className="title-text">
          he has every internet site stored in his memory
          </span>
          <span className="title-text">
           He refreshes webpages by blinking
          </span>
        </div>
      </div>
    )
  }
}

export default Home;
          