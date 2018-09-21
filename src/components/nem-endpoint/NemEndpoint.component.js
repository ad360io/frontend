/*
Core Libs
*/
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

/*
NEM SDK
*/
// import nem from 'nem-sdk';
var nem = require("nem-sdk").default;

/*
Children Component
*/
// import CircularProgress from 'material-ui/CircularProgress';


class NemEndpoint extends Component {

    constructor(props) {
        super(props);

        /* CONFIG */
        this.mainnet_NIS = 'http://san.nem.ninja';
        this.testnet_NIS = 'http://192.3.61.243';

        this.NEM_port = 7890;

        this.NEM_mainnet_networkId = 104;
        this.NEM_testnet_networkId = -104;

        // this.NEM_node_URI = mainnet_NIS;
        this.NEM_node_URI = this.testnet_NIS;

        // this.NEM_networkId = nem.model.network.data.mainnet.id;
        this.NEM_networkId = nem.model.network.data.testnet.id;


        /* Create connection to NIS supernode */
        this.endpoint = nem.model.objects.create('endpoint')(this.NEM_node_URI, this.NEM_port);
        // this.endpoint = nem.model.objects.create('endpoint')('http://192.3.61.243', 7890);

    }

    get_XQC_balance = (address) => {
        // get mosaics owned by account
        var mosaics;

        console.log(mosaics);
        console.log(address.replace('-', ''));

        // nem.com.requests.account.mosaics.owned(this.endpoint, 'TABCP73ZM4HIXITP6SZMYVB3EPX7OSHKP5PCEJQY').then(function(res) {
        nem.com.requests.account.mosaics.owned(this.endpoint, address.replace('-', '')).then(function(res) {
            mosaics = res.data;
        }, function(err) {
            console.error(err);
        })

        console.log(nem);
        console.log(this.endpoint);
        console.log(mosaics);

        // filter XQC variable
        // var xqc = mosaics.filter(i => i.mosaicId.namespaceId === 'qchain' && i.mosaicId.name === 'xqc')[0];

        // return xqc.quantity;
    }

    read_base64_wallet(wlt_txt_base64) {
        // decode Base64 .wlt text to word array
        var word_array = nem.crypto.js.enc.Base64.parse(wlt_txt_base64);

        // convert word array to UTF8 string, i.e. stringified JSON, then parse to JSON array
        var wallet = JSON.parse(nem.crypto.js.enc.Utf8.stringify(word_array));

        return wallet;
    }


    // decideTitle(listingSize) {
    //     const listingType = (this.props.modeFilter === 'Advertiser' ? 'Content Spaces' : 'Contents');
    //     const isEmpty = (listingSize > 0 ? '' : 'No ')
    //     return isEmpty + listingType + ' Available';
    // }

    render() {
        return null
    }
}

// const mapStateToProps = (state) => {
//     return {
//         modeFilter: state.MenuBarFilterReducer.modeFilter,
//         listings: state.MarketplaceDataReducer.db.listings,
//         totalListingCount: state.MarketplaceDataReducer.total,
//         currentPageNumber: state.MarketplaceFilterReducer.currentPageNumber,
//         fetched: state.MarketplaceDataReducer.fetched,
//         fetching: state.MarketplaceDataReducer.fetching,
//         hasError: state.MarketplaceDataReducer.hasError
//     }
// }

// const mapDispatchToProps = (dispatch) => {
//     return {
//         onPageItemClick: (page) => {
//             dispatch({
//                 type: 'SET_PAGE_NUMBER',
//                 value: page
//             })
//         }
//     }
// }


// export default connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(NemEndpoint);


// export default connect(
//     NemEndpoint
// )(NemEndpoint);

// export default NemEndpoint;
// export default new NemEndpoint();
