import React,{ Component }  from "react";
import { connect } from "react-redux";
import { selectImage } from "../action";
import Slider from "react-slick";

class ImagesList extends Component {
  renderList() {
    return this.props.images.map(image => {
      return <img src={image}  className="pad-pic"
      width="170" height="170"
      onClick={()=> {this.props.selectImage(image)}}
      alt=""/>
    })
  }

  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 3
    };
    console.log('slider');
    return ( 
      <div className="container" >
        <Slider {...settings}>
          {this.renderList()}
        </Slider>
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps,{selectImage})(ImagesList)