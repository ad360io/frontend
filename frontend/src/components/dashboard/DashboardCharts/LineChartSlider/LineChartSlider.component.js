/*
Core Libs
*/
import React, { Component } from "react";

/*
Slick.js Component
*/
import Slider from "react-slick";

/*
Local CSS
*/
import './LineChartSlider.component.css';


/**
 * Carousel made by slick.js library
 * Requires a props of itemList that should contain a list of elements to be rendered in the carousel.
 */
class LineChartSlider extends Component {
    
    render() {
        /* Prepare the settings prop for Slider, for more options check slick.js doc*/
        let settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        }

        /* Make sure the itemList is not undefined */
        if(typeof this.props.itemList === 'undefined'){
            return null;
        }

        /* iterate through the itemList prop to render */
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