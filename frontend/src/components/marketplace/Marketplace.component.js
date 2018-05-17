/*
Core Libs
*/
import React from 'react';

/*
Local CSS
*/
import './Marketplace.component.css';

/*
Children Components
*/
import ConnectedMarketplaceFilter   from './MarketplaceFilter/ConnectedMarketplaceFilter';
import ConnectedMarketplaceListings from './MarketplaceListings/ConnectedMarketplaceListings';


/**
 * Marketplace Component
 * Shall display accurate listings base on filters
 * All filters set in MarketplaceFilter is sent to Redux state
 *          Future Task: * operation of filtering the listings
 *                         should propbably be done on server side
 *                       * Dynamic loading the listing (automate pagination)
 *                       * Implement contact user
 */
const Marketplace = () => (
    <div>
        <div className="marketplace-container">
            <ConnectedMarketplaceFilter />
            <ConnectedMarketplaceListings />
        </div>
    </div>
)


export default Marketplace;
