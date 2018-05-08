/*
Core Libs
*/
import React, { Component } from 'react';
import {Button, SplitButton, MenuItem} from 'react-bootstrap';
import Paper from 'material-ui/Paper';
import ConnectedDrawer from './ConnectedDrawer/ConnectedDrawer'
import ConnectedSlider from './ConnectedSlider/ConnectedSlider'
import Divider from 'material-ui/Divider'
/*
Local CSS
*/
import './MarketplaceFilter.component.css'

const placeholderStyle = {
    height: 130,
    width: 300,
    margin: 0,
    textAlign: 'center',
    display: 'inline-block',
}
/**
 * 
 */
class MarketplaceFilter extends Component {

    constructor(props){
        super(props)
        this.state = {
            width: window.innerWidth
        }
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }
      
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }
      
    updateWindowDimensions() {
        this.setState({ width: window.innerWidth });
    }

    render() {
        return <div className="marketplace-filter-container" >
            <ConnectedDrawer
                docked={this.state.width > 768}
                width={300}
                zDepth={2}
                className='filter-drawer'
            >
                <Paper style={placeholderStyle} zDepth={0}/>
                <p>Ad Genre</p>
                    <SplitButton title="Branded Content" id="branded-content-menu">
                        <MenuItem >Written Post</MenuItem>
                        <MenuItem >Podcast</MenuItem>
                        <MenuItem >Video</MenuItem>
                    </SplitButton>
                    <div className="range-selector">

                    <SplitButton title="Influencer Post" id="influencer-post-menu">
                        <MenuItem >Tweet</MenuItem>
                        <MenuItem >Instagram</MenuItem>
                        <MenuItem >Twitch</MenuItem>
                        <MenuItem >Youtube</MenuItem>
                        <MenuItem >Facebook</MenuItem>
                        <MenuItem >Twitter</MenuItem>
                        <MenuItem >NicoNico</MenuItem>
                    </SplitButton>
                
                    <Button>Sponsorship</Button>

                    <Divider/>

                    <p className="range-label">Max Budget: {this.props.sliderValue} k</p>
                    <ConnectedSlider className="range-slider"
                        min={0}
                        max={100}
                        step={1}/>
                    
                </div>
            </ConnectedDrawer>
        </div>        
    }
}



export default (MarketplaceFilter);