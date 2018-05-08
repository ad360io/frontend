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
        sliderValue: state.MarketplaceDrawerReducer.sliderValue,
        activeTypes: state.MarketplaceDrawerReducer.activeTypes
    }
}
const mapDispatchToFilterProps = (dispatch) => {
    return {};
}

const ConnectedMarketplaceFilter = connect(
    mapStateToFilterProps,
    mapDispatchToFilterProps
)(MarketplaceFilter)

export default Marketplace;