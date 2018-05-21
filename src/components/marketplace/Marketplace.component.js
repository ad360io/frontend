/*
Core Libs
*/
import React, { Component } from 'react';

/*
Local CSS
*/
import './Marketplace.component.css';

/*
Children Components
*/
import MarketplaceFilter   from './MarketplaceFilter/MarketplaceFilter.component';
import MarketplaceListings from './MarketplaceListings/MarketplaceListings.component';


/**
 * Marketplace Component
 *      displays accurate listings base on filters
 *      filters set in MarketplaceFilter is sent to Redux state.
 *          Future Task: * Dynamic loading the listing (automate pagination)
 */
class Marketplace extends Component {

    componentDidMount() {
        document.title = "Qchain - Marketplace";
    }

    render(){
        return <div>
            <div className='marketplace-container'>
                <MarketplaceFilter />
                <MarketplaceListings />
            </div>
        </div>
    }
    
}


export default Marketplace;
