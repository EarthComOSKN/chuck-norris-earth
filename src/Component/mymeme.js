import React, { Component } from 'react';
import { connect } from 'react-redux';

class myMeme extends Component {

  renderMeme() {
    console.log(this.props);
    return this.props.allMeme.map( (meme,index) => {
      console.log(meme);
      // return (
      //   <div className="col " key={index}>
      //     <img src={meme.img} className="meme-pic" alt=""/>
      //   </div>
      // )
      return (
        <div class="container-cus">
          <img src={meme.img} alt="" />
          <div class="overlay-cus"></div>
          <div class="button-cus"><a href={meme.img} download> DOWNLOAD </a></div>
        </div>
      )
    })
  }

  render() {
    return (
      <div className="tech-bg" style={{'paddingTop' : '3%'}}>
        <div className="container">
          <div className="row">
            <div className="col">
              <h3>MY Meme</h3>
            </div>
          </div>
          <div className="row my-meme-list">
            {this.renderMeme()}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log('state',state);
  return state
}

export default connect(mapStateToProps)(myMeme);