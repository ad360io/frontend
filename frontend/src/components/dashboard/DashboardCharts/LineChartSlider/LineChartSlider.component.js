import React, { Component } from "react";
import Slider from "react-slick";

import './LineChartSlider.component.css';

class LineChartSlider extends Component {
    render() {
        var settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        }

        if(typeof this.props.itemList === 'undefined'){
            return null;
        }

        return (
            <Slider {...settings}>
               {
                   this.props.itemList.map((item, index) => {
                       return item;
                   })
               }
            </Slider>
        );
  }
}

export default LineChartSlider;