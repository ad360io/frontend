/*
Core Libs
*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createFilter } from 'react-search-input';

/*
Local CSS
*/
import './MarketplaceListings.component.css';

/*
Children Component
*/
import ListingCard from './ListingCard/ListingCard.component';

import { Pagination } from 'react-bootstrap';
import ErrorPage from '../../ErrorPage/ErrorPage.component';
import CircularProgress from 'material-ui/CircularProgress';


/**
 * Marketplace Listings contains array of Listing Cards
 * Filtering of data is done here, which isn't ideal
 *         Future Task: * auto load on scroll should happen here
 */
class MarketplaceListings extends Component {

    constructor(props) {
        super(props);
        this.decideDataToDisplay = this.decideDataToDisplay.bind(this);
        this.decideTitle = this.decideTitle.bind(this);
    }

    /** 
     * Decide which fake dataset we are displaying based on mode.
     * Advertisers should see adspaces
     * Publishers should see advertisements posted
     */
    decideDataToDisplay() {
        if (this.props.modeFilter === 'Advertiser') {
            return this.props.contentSpaceListings;
        } else {
            return this.props.requestListings;
        }
    }

    /** 
     * Filter the datasets with currencyFilter, budgetFilter, and adFormatFilter
     * Remember to ignore adFormatFilter if it is Show All
     * @param {Array} data The full array of listings waiting to be filtered
     */
    filterDataWithProps(data) {
        const KEYS_TO_FILTER = ['name', 'owner_name', 'description'];
        const keywordFilteredData = data.filter(createFilter(this.props.keywordFilter, KEYS_TO_FILTER));
        if (this.props.modeFilter === 'Advertiser') {
            // we are looking at content spaces, with price and currency
            return keywordFilteredData.filter((listing) => {
                if (listing.currency.toUpperCase() === this.props.currencyFilter
                    && listing.price <= (this.props.budgetFilter * 1000)
                    && (this.props.adFormatFilter === 'Show All' || listing.ad_format === this.props.adFormatFilter)
                    && (this.props.mediumFilter === '' || listing.medium === this.props.mediumFilter)) {
                    return listing;
                } else {
                    return null;
                }
            })
        } else {
            // we are looking at requests
            return keywordFilteredData.filter((listing) => {
                if (listing.currency.toUpperCase() === this.props.currencyFilter
                    && (this.props.adFormatFilter === 'Show All' || listing.ad_format === this.props.adFormatFilter)
                    && (this.props.mediumFilter === '' || listing.medium === this.props.mediumFilter)) {
                    return listing;
                } else {
                    return null;
                }
            })
        }

    }

    /**
     * Display Title of Listings Component
     * Purely for presentational purposes 
     * @param {Number} listingSize size of the listing array after filtering
     */
    decideTitle(listingSize) {
        const listingType = (this.props.modeFilter === 'Advertiser' ? 'Content Spaces' : 'Contents');
        const isEmpty = (listingSize > 0 ? '' : 'No ')
        return isEmpty + listingType + ' Available';
    }

    render() {
        const displayData = this.filterDataWithProps(this.decideDataToDisplay());
        let pages = Math.ceil(this.props.totalListingCount / 20);
        let items = [];
        if (this.props.totalListingCount > 0) {
            for (let i = 1; i < pages + 1; i++) {
                items.push(<Pagination.Item
                    key={'listingPage' + i}
                    active={i === this.props.currentPageNumber}
                    onClick={() => this.props.onPageItemClick(i)}
                >
                    {i}
                </Pagination.Item>);
            }
        }


        if (this.props.hasError) {
            return <ErrorPage />
        } else if (this.props.fetched && !this.props.hasError) {
            return <div className='marketplace-listings-container' ref={(ref) => this._containerDiv = ref}>
                <h3 className='marketplace-title'>{this.decideTitle(displayData.length)}</h3>
                {
                    displayData.map((listing, i) => {
                        return <ListingCard key={'listingCard' + i} listing={listing} modeFilter={this.props.modeFilter} />
                    })
                }
                <div style={{ textAlign: 'center', marginBottom: '96px' }}>
                    <Pagination className='listing-pages' bsStyle='small'>{items}</Pagination>
                </div>

            </div>
        } else {
            return <div className='loading-container'><CircularProgress className='marketplace-listing-loading' size={100} thickness={6} /> </div>
        }

    }
}

const mapStateToProps = (state) => {
    return {
        currencyFilter: state.MenuBarFilterReducer.currencyFilter,
        modeFilter: state.MenuBarFilterReducer.modeFilter,
        budgetFilter: state.MarketplaceFilterReducer.budgetFilter,
        adFormatFilter: state.MarketplaceFilterReducer.adFormatFilter,
        mediumFilter: state.MarketplaceFilterReducer.mediumFilter,
        contentSpaceListings: state.MarketplaceDataReducer.db.contentSpaceListings,
        requestListings: state.MarketplaceDataReducer.db.requestListings,
        keywordFilter: state.MarketplaceFilterReducer.keywordFilter,
        totalListingCount: state.MarketplaceDataReducer.total,
        currentPageNumber: state.MarketplaceFilterReducer.currentPageNumber,
        fetched: state.MarketplaceDataReducer.fetched,
        fetching: state.MarketplaceDataReducer.fetching,
        hasError: state.MarketplaceDataReducer.hasError
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onPageItemClick: (page) => {
            dispatch({
                type: 'SET_PAGE_NUMBER',
                value: page
            })
        }
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MarketplaceListings);