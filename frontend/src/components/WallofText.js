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
        for(let i = 0; i < 40; i++){
            wapows.push( <p key={'wapow'+i}>wapow</p> );
        }

        return <div>
            {wapows.map((WAPOW)=>{
                return WAPOW;
            })}
        </div>
    }
}


export default WallofText;