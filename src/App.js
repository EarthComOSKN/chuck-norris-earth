import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './Component/navbar'
import Home from './Component/home'
import MemeGen from './Component/memegen'
import MyMeme from './Component/mymeme';
import domtoimage from 'dom-to-image';
import scrollToComponent from 'react-scroll-to-component';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {img : ''}
    this.scrollToTopWithCallback = this.scrollToTopWithCallback.bind(this)

    
  }
  
  getDOM() {
    var node = document.getElementById('home');
    console.log(node);
    domtoimage.toPng(node)
    .then(function (dataUrl) {
        var img = new Image();
        img.src = dataUrl;
    }.bind(this))
    .catch(function (error) {
        console.error('oops, something went wrong!', error);
    });
  }

  scrollToTopWithCallback() {
    let scroller = scrollToComponent(this.Violet, { offset: 0, align: 'top', duration: 1500});
    scroller.on('end', () => console.log('Scrolling end!') );
  }
  
  gotoMeme = () => {
    console.log('gogo meme');
    scrollToComponent(this.memegen, { offset: 0, align: 'top', duration: 500, ease:'inExpo'})
  }

  gotoMy = () => {
    scrollToComponent(this.mymeme, { offset: 0, align: 'top', duration: 500, ease:'inExpo'})
  }
  test = () => {
    console.log('earth');
  }

  render() {
    return (
      <div className="App">
        <Navbar gotoMeme={this.gotoMeme} gotoMy={this.gotoMy} test={this.test}/>
        <Home/>
        <section className='memegen' ref={(section) => { this.memegen = section; }}><MemeGen/></section>
        <section className='mymeme' ref={(section) => { this.mymeme = section; }}><MyMeme/></section>
      </div>
    );
  }
}

export default App;
