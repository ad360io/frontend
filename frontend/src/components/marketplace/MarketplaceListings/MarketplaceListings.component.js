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

/*
Fake Marketplace Data
*/
import fakeAdListings      from '../../../assets/fakeData/fakeMarketplaceData/fake-ad-listings';
import fakeAdspaceListings from '../../../assets/fakeData/fakeMarketplaceData/fake-adspace-listings'
/**
 * 
 */
class MarketplaceListings extends Component {

    constructor(props){
        super(props);
        this.decideDataToDisplay = this.decideDataToDisplay.bind(this);
        this.decideTitle = this.decideTitle.bind(this);
    }

    decideDataToDisplay() {
        if(this.props.modeFilter === 'Advertiser'){
            return fakeAdspaceListings.adspaceListings;
        }else{
            return fakeAdListings.adListings; 
        }
    }

    filterDataWithProps(data){
        return data.filter((listing)=>{
            if(listing.pricing <= this.props.budgetFilter && listing.currency.toUpperCase() === this.props.currencyFilter
                && (this.props.adGenreFilter === 'Show All' || listing.genre === this.props.adGenreFilter)){
                return listing;
            }else{
                return null;
            }})
    }

    decideTitle(listingSize){
        const listingType = (this.props.modeFilter === 'Advertiser' ? 'Adspaces' : 'Ads');
        const isEmpty = (listingSize > 0 ? '' : 'No ' )
        return isEmpty + listingType + " Available";
    }

    render() {
        const displayData = this.filterDataWithProps(this.decideDataToDisplay());
        return <div className="marketplace-listings-container">
            <h2 className="marketplace-title">{this.decideTitle(displayData.length)}</h2>
            {
                displayData.map((listing, i)=>{
                    return <ListingCard key={'listingCard'+i} listing={listing}/>
                })
            }
        </div>
        
    }
}


export default MarketplaceListings;