/*
Core Libs
*/
import React, { Component } from 'react';


/**
 * Just a placeholder component
 * 300 strong WAPOW paragraphs
 */
class WallofText extends Component {

    render() {

        let wapows = [];
        for(let i = 0; i < 300; i++){
            wapows.push( <p>wapow</p> );
        }

        return <div>
            {wapows.map((WAPOW)=>{
                return WAPOW;
            })}
        </div>
    }
}


export default WallofText;