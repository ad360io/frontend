/*
Core Libs
*/
import React, { Component } from 'react';

/*
Local CSS
*/
import './MarketplaceListings.component.css'

/*
Children Component
*/
import ListingCard from './ListingCard/ListingCard.component'

/**
 * 
 */
class MarketplaceListings extends Component {

    render() {
        const placeholderArray = [1,2,3,4,5];
        return <div className="marketplace-listings-container">
            {
                placeholderArray.map((i)=>{
                    return <ListingCard key={'listingCard'+i}/>
                })
            }
        </div>
    }
}


export default MarketplaceListings;