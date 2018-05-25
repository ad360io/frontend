/*
Core Libs
*/
import React, { Component } from 'react';
import { connect }          from 'react-redux';

/*
React Bootstrap Components
*/
import {Button, SplitButton, MenuItem} from 'react-bootstrap';

/*
Material UI Components
*/ 
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider'
import Slider from 'material-ui/Slider'
import Drawer from 'material-ui/Drawer'

/*
Local CSS
*/
import './MarketplaceFilter.component.css'


/**
 * MarketplaceFilter Component
 */
class MarketplaceFilter extends Component {

    constructor(props){
        super(props)
        this.state = {
            width: window.innerWidth
        }
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this.decide_BtnOpenFilterDrawer_Display = this.decide_BtnOpenFilterDrawer_Display.bind(this);
        this.decideTitle = this.decideTitle.bind(this);
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

    decideTitle(){
        if(this.props.modeFilter === 'Advertiser') return 'Content Spaces';
        else return 'Content'
    }

    render() {
        return <div className='marketplace-filter-container' >
            <Button 
                className='btn-open-filter-drawer'
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

                <div className='ad-genre-container'>
                    <h4 className='filter-title'>{this.decideTitle()} Listings</h4>
                    <Button 
                        className='btn-single'
                        onClick={()=>{this.props.onContentGenreClick('Show All')}}
                        active={this.props.contentGenreFilter === 'Show All'}
                    >
                        Show All
                    </Button>
                    <SplitButton 
                        className='btn-ad-genre' 
                        title='Branded Content' 
                        id='branded-content-menu' 
                        pullRight
                        onClick={()=>this.props.onContentGenreClick('Branded Content')}
                        active={this.props.contentGenreFilter === 'Branded Content'}
                    >
                        <MenuItem >Written Post</MenuItem>
                        <MenuItem >Podcast</MenuItem>
                        <MenuItem >Video</MenuItem>
                    </SplitButton>
                    <SplitButton 
                        className='btn-ad-genre' 
                        title='Influencer Post' 
                        id='influencer-post-menu' 
                        pullRight
                        onClick={()=>this.props.onContentGenreClick('Influencer Post')}
                        active={this.props.contentGenreFilter === 'Influencer Post'}
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
                        className='btn-single'
                        onClick={()=>this.props.onContentGenreClick('Sponsorship')}
                        active={this.props.contentGenreFilter === 'Sponsorship'}
                    >
                        Sponsorship
                    </Button>
                </div>

                <Divider/>

                <div className='range-selector'>
                    <h4 className='filter-title'>Max Budget: {this.props.budgetFilter} k {this.props.currency}</h4>
                    <Slider className='range-slider'
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

const mapStateToFilterProps = (state) => {
    return {
        budgetFilter       : state.MarketplaceFilterReducer.budgetFilter,
        activeTypes        : state.MarketplaceFilterReducer.activeTypes,
        isDrawerOpen       : state.MarketplaceFilterReducer.isDrawerOpen,
        currency           : state.MenuBarFilterReducer.currencyFilter,
        contentGenreFilter : state.MarketplaceFilterReducer.contentGenreFilter,
        modeFilter         : state.MenuBarFilterReducer.modeFilter
    }
}

const mapDispatchToFilterProps = (dispatch) => {
    return {
        onSliderChange:(event, budgetFilter)=>{
            dispatch({
                type:'SET_BUDGET_VALUE',
                value: budgetFilter
            })
        },
        onDrawerRequestChange: (open)=>{
            dispatch({
                type: 'SET_DRAWER',
                value: open
            })
        },
        onContentGenreClick: (contentGenre) => {
            dispatch({
                type: 'SET_CONTENT_GENRE',
                value: contentGenre
            })
        },
        closeDrawer: () => {
            dispatch({
                type: 'CLOSE_DRAWER'
            })
        },
        openDrawer: () => {
            dispatch({
                type: 'OPEN_DRAWER'
            })
        }
    }
}


export default connect(
    mapStateToFilterProps,
    mapDispatchToFilterProps
)(MarketplaceFilter)
