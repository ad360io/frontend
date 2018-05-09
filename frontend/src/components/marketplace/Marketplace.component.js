/*
Core Libs
*/
import React, { Component } from 'react';
import { MuiThemeProvider } from 'material-ui'
import { connect } from 'react-redux';

/*
Local CSS
*/
import './Marketplace.component.css'

/*
Children Components
*/
import MarketplaceFilter   from './MarketplaceFilter/MarketplaceFilter.component'
import MarketplaceListings from './MarketplaceListings/MarketplaceListings.component'


/**
 * Marketplace Component
 *     Work to be done:
 *         - Change UI to react-bootstrap (sidenav, card, etc)
 *         - use Redux on filter changes
 *         - bootstrap pagination and other UI polishes
 */
class Marketplace extends Component {
    render() {
        return <MuiThemeProvider>
                <div className="marketplace-container">
                    <ConnectedMarketplaceFilter />
                    <MarketplaceListings />
                </div>
            </MuiThemeProvider>
        
    }
}

const mapStateToFilterProps = (state) => {
    return {
        sliderValue  : state.MarketplaceFilterReducer.sliderValue,
        activeTypes  : state.MarketplaceFilterReducer.activeTypes,
        isDrawerOpen : state.MarketplaceFilterReducer.isDrawerOpen,
        currency     : state.MenuBarFilterReducer.currencyFilter,
        adGenre      : state.MarketplaceFilterReducer.adGenre
    }
}
const mapDispatchToFilterProps = (dispatch) => {
    return {
        onSliderChange:(event, sliderValue)=>{
            dispatch({
                type:"SET_SLIDER_VALUE",
                value: sliderValue
            })
        },
        onDrawerRequestChange: (open)=>{
            dispatch({
                type: 'SET_DRAWER',
                value: open
            })
        },
        onAdGenreClick: (adgenre) => {
            dispatch({
                type: 'SET_AD_GENRE',
                value: adgenre
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

const ConnectedMarketplaceFilter = connect(
    mapStateToFilterProps,
    mapDispatchToFilterProps
)(MarketplaceFilter)

export default Marketplace;