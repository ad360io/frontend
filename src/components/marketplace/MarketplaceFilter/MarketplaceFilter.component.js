/*
Core Libs
*/
import React, { Component } from 'react';
import { connect }          from 'react-redux';

/*
React Bootstrap Components
*/
import { Button, SplitButton, MenuItem } from 'react-bootstrap';
import { ButtonGroup }                   from 'react-bootstrap';

/*
Material UI Components
*/ 
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider'
import Slider from 'material-ui/Slider'
import Drawer from 'material-ui/Drawer'

/*
Action
*/
import { setBudget, setContentGenre }             from '../../../actions/MarketplaceActions';
import { openDrawer, closeDrawer, drawerRequest } from '../../../actions/MarketplaceActions';

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
        this.decideTitle = this.decideTitle.bind(this);
        this.decideHidden = this.decideHidden.bind(this);
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

    decideTitle(){
        if(this.props.modeFilter === 'Advertiser') return 'Content Spaces';
        else return 'Content'
    }

    decideHidden() {
        if(this.state.width <= 768) {
            return 'none';
        }else{
            return 'inline-block';
        }
    }

    render() {
        return <div className='marketplace-filter-container' >
            <Button 
                className='btn-open-filter-drawer'
                hidden={this.state.width > 768}
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
                    <ButtonGroup
                        style={{
                            display: this.decideHidden(), 
                            marginLeft:'25px', 
                            marginBottom:'5%',
                        }}
                    >
                        <Button style={{paddingLeft: '25px', paddingRight: '25px'}}><i class="fas fa-th-large"></i>Grid</Button>
                        <Button style={{paddingRight: '18px'}}><i class="fas fa-align-justify"></i>Listing</Button>
                    </ButtonGroup>
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
                    <h4 className='filter-title'>Max Purchase: {this.props.budgetFilter} k {this.props.currency}</h4>
                    <Slider className='range-slider'
                        onChange={this.props.onSliderChange}
                        value={this.props.budgetFilter}
                        min={0.1}
                        max={10}
                        step={0.1}/>
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
            dispatch(setBudget(budgetFilter))
        },
        onDrawerRequestChange: (open)=>{
            dispatch(drawerRequest(open))
        },
        onContentGenreClick: (contentGenre) => {
            dispatch(setContentGenre(contentGenre))
        },
        closeDrawer: () => {
            dispatch(closeDrawer())
        },
        openDrawer: () => {
            dispatch(openDrawer())
        }
    }
}


export default connect(
    mapStateToFilterProps,
    mapDispatchToFilterProps
)(MarketplaceFilter)
