/*
Core Libs
*/
import React, { Component } from 'react';
import { connect } from 'react-redux';

/*
Networking
*/
import axios from 'axios';

/*
Material UI
*/
import CircularProgress from 'material-ui/CircularProgress';

/*
Local CSS
*/
import './Marketplace.component.css';

/*
Children Components
*/
import MarketplaceFilter from './MarketplaceFilter/MarketplaceFilter.component';
import MarketplaceListings from './MarketplaceListings/MarketplaceListings.component';
import ErrorPage from '../ErrorPage/ErrorPage.component';
import DetailedListingPage from './MarketplaceListings/DetailedListingPage/DetailedListingPage.component';

/*
Actions
*/
import {
    fetch_MarketplaceData_Fulfilled,
    fetch_MarketplaceData_Pending,
    fetch_MarketplaceData_Rejected
} from '../../actions/DatabaseRequestActions';


/**
 * Marketplace Component
 *      displays accurate listings base on filters
 *      filters set in MarketplaceFilter is sent to Redux state.
 *          Future Task: * Dynamic loading the listing (automate pagination)
 */
const pageSize = 20;

class Marketplace extends Component {
    constructor(props) {
        super(props);
        const onStartURL = "https://qchain-marketplace-postgrest.herokuapp.com/detailed_listing_view";
        const config = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('id_token'),
                Prefer: "count=exact",
                Range: `${pageSize * (this.props.pageNumber - 1)}-${pageSize * this.props.pageNumber - 1}`
            }
        };
        props.loadData(onStartURL, config);
    }

    componentDidMount() {
        document.title = "Qchain - Marketplace";
    }

    componentDidUpdate(prevProps) {
        if (prevProps.pageNumber !== this.props.pageNumber) {
            const searchedURL = `https://qchain-marketplace-postgrest.herokuapp.com/detailed_listing_view?or=(name.ilike.*${this.props.keyword}*,owner_name.ilike.*${this.props.keyword}*,description.ilike.*${this.props.keyword}*)`
            const config = {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('id_token'),
                    Prefer: "count=exact",
                    Range: `${pageSize * (this.props.pageNumber - 1)}-${pageSize * this.props.pageNumber - 1}`
                }
            };
            this.props.loadData(searchedURL, config);
        }

        if (prevProps.keyword != this.props.keyword) {
            const searchedURL = `https://qchain-marketplace-postgrest.herokuapp.com/detailed_listing_view?or=(name.ilike.*${this.props.keyword}*,owner_name.ilike.*${this.props.keyword}*,description.ilike.*${this.props.keyword}*)`
            const config = {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('id_token'),
                    Prefer: "count=exact",
                    Range: `${2 * (this.props.pageNumber - 1)}-${2 * this.props.pageNumber - 1}`
                }
            };
            this.props.loadData(searchedURL, config);
        }
    }

    render() {
        return <div>
            <div className='marketplace-container'>
                <MarketplaceListings />
                <MarketplaceFilter />

            </div>
        </div>
    }

}

const mapStateToProps = (state) => {
    return {
        fetched: state.MarketplaceDataReducer.fetched,
        hasError: state.MarketplaceDataReducer.hasError,
        keyword: state.MarketplaceFilterReducer.keywordFilter,
        pageNumber: state.MarketplaceFilterReducer.currentPageNumber
    }
}

const mapDispatchToProps = (dispatch) => {

    return {
        loadData: (url, config) => {
            dispatch((dispatch) => {
                dispatch(fetch_MarketplaceData_Pending())
                axios.get(url, config)
                    .then((response) => {
                        dispatch(fetch_MarketplaceData_Fulfilled(response))
                    })
                    .catch((err) => {
                        console.log(err)
                        dispatch(fetch_MarketplaceData_Rejected(err))
                    })
            })
        }
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Marketplace);
