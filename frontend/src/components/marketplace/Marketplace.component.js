/*
Core Libs
*/
import React, { Component } from 'react';
import { MuiThemeProvider } from 'material-ui'

/*
Local CSS
*/
import './Marketplace.component.css'

/*
Children Components
*/
import ConnectedMarketplaceFilter   from './MarketplaceFilter/ConnectedMarketplaceFilter'
import ConnectedMarketplaceListings from './MarketplaceListings/ConnectedMarketplaceListings'


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
                    <ConnectedMarketplaceListings />
                </div>
            </MuiThemeProvider>
    }
}
export default Marketplace;