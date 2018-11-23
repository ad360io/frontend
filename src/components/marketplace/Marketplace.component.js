/*
Core Libs
*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import './Marketplace.component.css';

/*
Children Components
*/
import MarketplaceFilter from './MarketplaceFilter/MarketplaceFilter.component';
import MarketplaceListings from './MarketplaceListings/MarketplaceListings.component';
import Footer from '../footer/Footer.component';

import {marketplaceApi} from "../../common/api/services/marketplace-api";


/**
 * Marketplace Component
 *      displays accurate listings base on filters
 *      filters set in MarketplaceFilter is sent to Redux state.
 *          Future Task: * Dynamic loading the listing (automate pagination)
 */
const pageSize = 5;

class Marketplace extends Component {
    constructor(props) {
        super(props);

        this.state = {
            listing: null,
            total: 0,
            currentPageNum: 1,
            filters: {
                budget: 7.5,
                adFormatFilter: 'Show All',
                mediumFilter: '',
                sortingType: 'Date Added',
                keyword: ''
            }
        };

        this.getData();
    }

    getParamQuery = () => {
        const { modeFilter, currencyFilter } = this.props;
        const { filters : {budget, sortingType, adFormatFilter, mediumFilter} } = this.state;

        let sortValue = {
            'Date Added'           : 'id.desc',
            'Price (Low - High)'   : 'price',
            'Price (High - Low)'   : 'price.desc'
        }[sortingType] || null;

        return {
            // ...( modeFilter === "Advertiser" && { }),
            ...( sortValue == null ? {} : {order : sortValue} ),
            ...( adFormatFilter === 'Show All' ? {} :
                {
                    ad_format: `eq.${encodeURIComponent(this.props.adFormatFilter)}`,
                    ...(!isEmpty(mediumFilter) ? { medium: `eq.${encodeURIComponent(this.props.mediumFilter)}`} : {})
                }
            ),
            currency: `eq.${currencyFilter}`,
            price: `lte.${budget * 1000}`
        }
    };

    getData = async() => {
        const { allApis : {getJson} } = this.props;
        const { currentPageNum } = this.state;

        let params = this.getParamQuery();

        let headers = {
            Prefer: "count=exact",
            Range: `${pageSize * (currentPageNum - 1)}-${(pageSize * currentPageNum) - 1}`
        };

        let resp = await marketplaceApi.getListing(getJson, params, headers);

        let total = +resp.headers['content-range'].split('/')[1];

        this.setState({listing: resp.data, total})
    };

    componentDidMount() {
        document.title = "Qchain - Marketplace";
    }


    componentDidUpdate(prevProps) {}

    render() {
        const {
            filters,
            listing, total, currentPageNum
        } = this.state;

        return (
            <div style={{ 'position': 'relative' }}>
                <div className='marketplace-container'>
                    <MarketplaceFilter
                        {...{
                            filters,
                            onChange: (filters) => this.setState({filters}, () => this.getData())
                        }}
                    />
                    <MarketplaceListings
                        {...{
                            listing, total, currentPageNum,
                            onChangePage: (page) => this.setState({currentPageNum: page}, () => this.getData())
                        }}
                    />
                </div>

                {/*<br /><br /><br /><br />*/}

                {/*<Footer />*/}
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        modeFilter: state.MenuBarFilterReducer.modeFilter,
        currencyFilter: state.MenuBarFilterReducer.currencyFilter,
    }
};

export default connect(
    mapStateToProps,
)(Marketplace);
