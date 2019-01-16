import React, { Component } from 'react';
import Select from 'react-select';
import { connect } from "react-redux";
import { selectImage,addMeme } from "../action";
import ImagesList from './ImagesList';
import axios from 'axios';
import tempPic from '../tempPreview.png';
import domtoimage from 'dom-to-image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import 'rc-color-picker/assets/index.css';
import ColorPicker from 'rc-color-picker';

class MemeGen extends Component {
  
  constructor(props) {
    super(props)
    console.log('state',this.state);
    this.state = {
      selectedOption: {value:'',label:'All'},
      joke: 'Get Some Joke',
      jokeClass: 'bottom-left',
      textSize: 15,
      colorText: 'rgba(0,0,0,1)'
    }
    
  }
  async componentDidMount() {
    const res = await axios.get('https://api.chucknorris.io/jokes/categories')
    const category = res.data
    const options = category.map((cat) => {
      return { value:`?category=${cat}` , label:cat}
    })
    await this.setState({options})
  }

  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  }

  async getJoke() {
    this.setState({joke: 'Loading...'})
    const res = await axios.get(`https://api.chucknorris.io/jokes/random${this.state.selectedOption.value}`)
    const joke = res.data.value
    console.log(joke);
    this.setState({joke})
  }
  getPreview() {
    if(this.props.selectedImage == null) return <img className="col-4 preview-img" src={tempPic} height="450" alt="" style={{'padding' : '0px 0px 0px 0px'}} />
    else return (
      <div className="col-4">
      <div className="container" id="preview">
      <img className="col preview-img" src={this.props.selectedImage} height="450" alt="" style={{'padding' : '0px 0px 0px 0px'}} />
      <div className="bottom-left" style={{'fontSize' : this.state.textSize+'px', 'color' : this.state.colorText}}>{this.state.joke}</div>
      </div>

      </div>

    )
  }

  SaveMeme() {
    var node = document.getElementById('preview');
    console.log(node);
    domtoimage.toPng(node)
    .then(function (dataUrl) {
        var img = new Image();
        img.src = dataUrl;
        const meme = {
          text: this.state.joke,
          img: dataUrl,
        }
        this.props.addMeme(meme)
    }.bind(this))
    .catch(function (error) {
        console.error('oops, something went wrong!', error);
    });
  }
  
  changeTextSize(size) {
    let temp = this.state.textSize;
    temp += size
    if(temp < 0) temp = 0
    this.setState({textSize : temp})
  }

  hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

  colorChangeHandler(color){
    let rgba = this.hexToRgb(color.color)
    rgba['a'] = color.alpha/100 
    const colorText = `rgba(${rgba.r},${rgba.g},${rgba.b},${rgba.a})`
    this.setState({colorText})
  }

  render() {
    const { selectedOption } = this.state;
    return (
      <div className="tech-bg">
        <div className="container ">
          <div className="row">
            <div className="col meme-gen container title">
              <div className="row center title line"> 
              <div className="col">
              <h1>Meme Generater</h1>
              </div></div>
              <div className="row line">
                {this.getPreview()}
                <div className="col-8">
                  <div className="row line">
                    <div className="col">
                      <h3>Select your Image</h3>
                    </div>
                  </div>
                  <div className="row line">
                  <ImagesList/>
                  </div>
                  <div className="row line">
                    <div className="col-4 d-flex align-items-center center">
                      <h4>Select category :</h4>
                    </div>
                    <div className="col">
                      <Select
                        value={selectedOption}
                        onChange={this.handleChange}
                        options={this.state.options}
                      />
                    </div>
                  </div>
                  <div className="row line" >
                    <div className="col">
                    <div className="input-group mb-3">
                      <div className="input-group-prepend" id="button-addon3">
                        <button className="btn btn-warning" type="button" onClick={()=>{this.getJoke()}}>Get jokes</button>
                      </div>
                      <input type="text" className="form-control" value={this.state.joke }placeholder="" aria-label="Example text with two button addons" aria-describedby="button-addon3"/>
                      </div>
                    </div>
                  </div>
                  <div className="row line">
                    <div className="col-2"><h3>Tool :</h3></div>
                    <div className="col">
                      <button className="btn btn-primary"
                      onClick={()=>{this.changeTextSize(2)}}
                      >+ size</button>
                    </div>
                    <div className="col">

                      <button className="btn btn-primary"
                      onClick={()=>{this.changeTextSize(-2)}}
                      >- size</button>
                    </div>
                    <div className="col-2">
                      <h3>Color :</h3>
                    </div>
                    <div className="col">
                        <ColorPicker
                          animation="slide-up"
                          color={'#36c'}
                          onChange={(e) => {this.colorChangeHandler(e)}}
                          style={{'width' : '200px'}}
                        />

                    </div>
                    
                  </div>
                  
                  <div className="row line">
                    <div className="col">
                      <button className="btn btn-info"
                      onClick={()=>{this.SaveMeme()}}
                      >SAVE MEME</button>

                    </div>
                  </div>
                </div>
              </div>
            </div>
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

export default connect(mapStateToProps,{addMeme})(MemeGen);