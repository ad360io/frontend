/*
Core Libs
*/
import React, { Component } from 'react';
import { connect }          from 'react-redux';

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
import MarketplaceFilter   from './MarketplaceFilter/MarketplaceFilter.component';
import MarketplaceListings from './MarketplaceListings/MarketplaceListings.component';
import ErrorPage           from '../ErrorPage/ErrorPage.component';

/*
Actions
*/
import { fetch_MarketplaceData_Fulfilled,
         fetch_MarketplaceData_Pending, 
         fetch_MarketplaceData_Rejected } from '../../actions/DatabaseRequestActions';


/**
 * Marketplace Component
 *      displays accurate listings base on filters
 *      filters set in MarketplaceFilter is sent to Redux state.
 *          Future Task: * Dynamic loading the listing (automate pagination)
 */
class Marketplace extends Component {
    constructor(props) {
        super(props);
        props.onStartLoadData();
    }

    componentDidMount() {
        document.title = "Qchain - Marketplace";

        // Register data loading every 10 minutes.
        const tenMinutes = 1000 * 60 * 10;
        this.loadDataInterval = setInterval(this.props.onStartLoadData, tenMinutes);
    }

    componentWillUnmount() {
        // Tidy up
        clearInterval(this.loadDataInterval);
        this.loadDataInterval = 0;
    }

    render(){
        if(this.props.hasError) {
            return <ErrorPage />
        }else if (this.props.fetched){
            return <div>
                <div className='marketplace-container'>
                    <MarketplaceFilter />
                    <MarketplaceListings />
                </div>
            </div>
        }else{
            return <CircularProgress size={100} thickness={6} />
        }
    }
    
}

const mapStateToProps = (state) => {
    return {
        fetched        : state.MarketplaceDataReducer.fetched,
        hasError       : state.MarketplaceDataReducer.hasError
    }
}

const mapDispatchToProps = (dispatch) => {
    const TestServerURL = "http://localhost:3000/api/marketplace";
    return {
        onStartLoadData: () => {
            dispatch((dispatch) => {
                
                dispatch(fetch_MarketplaceData_Pending())
                axios.get(TestServerURL)
                    .then((response) => {
                        dispatch(fetch_MarketplaceData_Fulfilled(response.data))
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
