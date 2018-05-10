/*
Core Libs
*/
import React, { Component } from 'react';
import {Button, SplitButton, MenuItem} from 'react-bootstrap';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider'
import Slider from 'material-ui/Slider'
import Drawer from 'material-ui/Drawer'
/*
Local CSS
*/
import './MarketplaceFilter.component.css'


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
        this.decide_BtnOpenFilterDrawer_Display = this.decide_BtnOpenFilterDrawer_Display.bind(this);
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

        // Dynamically close the drawer for small screen
        //             open  the drawer for medium to big screen
        if(window.innerWidth <= 768) this.props.closeDrawer();
        else this.props.openDrawer();
    }

    /**
     * Hide / Show the drawer toggle based on screen size
     */
    decide_BtnOpenFilterDrawer_Display(){
        if(this.state.width > 768) return 'none'
        else return 'inline';
    }

    render() {
        return <div className="marketplace-filter-container" >
            <Button 
                className="btn-open-filter-drawer"
                style={{display: this.decide_BtnOpenFilterDrawer_Display()}}
                onClick={()=>this.props.openDrawer()}
            > 
                Click Me to Set Filters 
            </Button>
            <Drawer
                docked={this.state.width > 768}
                width={300}
                zDepth={1}
                open={this.props.isDrawerOpen}
                onRequestChange={this.props.onDrawerRequestChange}
                className='filter-drawer'
            >
                <Paper style={{
                    height: 130,
                    width: 300,
                    margin: 0,
                    display: 'inline-block',
                }} zDepth={0}/>

                <div className="ad-genre-container">
                    <h4 className="filter-title">Ad Genre</h4>
                    <Button 
                        className="btn-single"
                        onClick={()=>{this.props.onAdGenreClick('Show All')}}
                        active={this.props.adGenreFilter === 'Show All'}
                    >
                        Show All
                    </Button>
                    <SplitButton 
                        className="btn-ad-genre" 
                        title="Branded Content" 
                        id="branded-content-menu" 
                        pullRight
                        onClick={()=>this.props.onAdGenreClick('Branded Content')}
                        active={this.props.adGenreFilter === 'Branded Content'}
                    >
                        <MenuItem >Written Post</MenuItem>
                        <MenuItem >Podcast</MenuItem>
                        <MenuItem >Video</MenuItem>
                    </SplitButton>
                    <SplitButton 
                        className="btn-ad-genre" 
                        title="Influencer Post" 
                        id="influencer-post-menu" 
                        pullRight
                        onClick={()=>this.props.onAdGenreClick('Influencer Post')}
                        active={this.props.adGenreFilter === 'Influencer Post'}
                    >
                        <MenuItem >Tweet</MenuItem>
                        <MenuItem >Instagram</MenuItem>
                        <MenuItem >Twitch</MenuItem>
                        <MenuItem >Youtube</MenuItem>
                        <MenuItem >Facebook</MenuItem>
                        <MenuItem >Twitter</MenuItem>
                        <MenuItem >NicoNico</MenuItem>
                    </SplitButton>
                    <Button 
                        className="btn-single"
                        onClick={()=>this.props.onAdGenreClick('Sponsorship')}
                        active={this.props.adGenreFilter === 'Sponsorship'}
                    >
                        Sponsorship
                    </Button>
                </div>

                <Divider/>

                <div className="range-selector">
                    <h4 className="filter-title">Max Budget: {this.props.budgetFilter} k {this.props.currency}</h4>
                    <Slider className="range-slider"
                        onChange={this.props.onSliderChange}
                        value={this.props.budgetFilter}
                        min={0}
                        max={100}
                        step={1}/>
                </div>
            </Drawer>
        </div>        
    }
}



export default (MarketplaceFilter);