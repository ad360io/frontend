/*
Core Libs
*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

/*
React Bootstrap Components
*/
import { Button } from 'react-bootstrap';
import { Popover, OverlayTrigger } from 'react-bootstrap';

import Divider from '@material-ui/core/Divider';
import {myOffersViewApi} from "../../../../common/api/services/my-offers-view-api";
import {LoadingPanel} from "../../../../common/components/LoadingPanel";

/*
Named Exports
*/
// import { ProfileConnectedOfferRenderer } from "./OfferList";



/**
 * OfferList Component
 * User should be able to create a new smart contract when accepting a invite
 * Invite listing should be removed from list after action is performed.
 */
class OfferList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            finished: false,
            err: null,
            activeOffers: null,
        };
    }

    componentDidMount() {
        this.loadData();
    }

    loadData = async () => {
        const { allApis: {getJson}} = this.props;

        let resp = await myOffersViewApi(getJson);

        this.setState({activeOffers: resp.data});

        /*

        const activeListingURL = "https://marketplacedb.qchain.co/my_offers_view";
        const config = {
            headers: { Authorization: "Bearer " + localStorage.getItem('id_token') }
        };
        axios.get(activeListingURL, config)
            .then((response) => {
                this.setState({
                    ...this.state,
                    finished: true,
                    activeOffers: response.data
                })
            })
            .catch((err) => {
                console.log(err);
                this.setState({
                    ...this.state,
                    finished: true,
                    err: err
                })
            })

        */

        this.setState({nem_address: this.props.nem_address});
        this.setState({eth_address: this.props.eth_address});

        console.log(this.props.nem_address);
        console.log(this.state.nem_address);
    };

    render() {
        let { activeOffers } = this.state;

        if( activeOffers == null ) return <LoadingPanel/>;

        return (
            <div className='invite-list-container'>
                <div className='table-responsive' style={{ height: '100%', margin: '2%', minHeight: '320px' }}>
                    {(activeOffers.length === 0) ?
                        <p style={{ textAlign: 'center' }}>You don't have any offers right now.</p> :
                        ( <table className='table table-bordered mb-0'>
                            <thead className='thead-default'>
                            <tr>
                                <th>Offer Detail</th>
                                <th style={{ width: '25%', textAlign: 'center' }}>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            { activeOffers.map((offer, i) =>
                                <OfferRenderer offer={offer} refreshData={this.loadData} key={'offer' + i} />
                            )}
                            </tbody>
                        </table>
                        )
                    }
                </div>
            </div>
        );
    }

}

class OfferRenderer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isProcessing: false,
            actionInfo: ''
        };
        this.getInfoPopover = this.getInfoPopover.bind(this);
        this.handleDeclineOffer = this.handleDeclineOffer.bind(this);
        this.handleAcceptOffer = this.handleAcceptOffer.bind(this);
        this.makePayment = this.makePayment.bind(this);
        this.createContractAfterBalanceCheck = this.createContractAfterBalanceCheck.bind(this);
        this.handleOkayClick = this.handleOkayClick.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }

    loadData = async () => {
        this.setState({nem_address: this.props.nem_address});
        this.setState({eth_address: this.props.eth_address});

        console.log('asf');
        console.log(this.props.nem_address);
        console.log(this.state.nem_address);
        console.log('bsd');
    };

    makePayment(existingBalance, currencyType, price) {
        const listingURL = `https://marketplacedb.qchain.co/wallet_view`;

        const config = {
            headers: { Authorization: "Bearer " + localStorage.getItem('id_token') }
        };

        const payload = (currencyType === 'EQC')
            ? { eqc_balance: (existingBalance - price) }
            : { xqc_balance: (existingBalance - price) }

        axios.patch(listingURL, payload, config)
            .then(() => {
                //success, toggle isactive on this listing to false
            })
            .catch((err) => {
                console.log("INACTIVATE ERR");
                console.log(err);
            })
    }


    handleAcceptOffer() {
        this.setState({
            ...this.state,
            isProcessing: true
        })

        const walletURL_ = `https://marketplacedb.qchain.co/wallet_view`;
        const config = {
            headers: { Authorization: "Bearer " + localStorage.getItem('id_token') }
        };

        var walletURL = "https://nis.qchain.co/account/mosaic/owned?address=";

        var self = this;

        console.log('hi');
        console.log(this.state.nem_address);

        axios.get(walletURL_, config)
            .then((response) => {
                //success, response.data[0]
                let startDate = new Date(this.props.offer.start_date);
                let endDate = new Date(this.props.offer.end_date);

                if (this.props.offer.currency === 'EQC') {
                    if (response.data[0].eqc_balance >= this.props.offer.price * dateDiffInDays(startDate, endDate)) {
                        this.createContractAfterBalanceCheck(response.data[0].eqc_balance, this.props.offer.price * dateDiffInDays(startDate, endDate))
                    } else {
                        this.setState({
                            ...this.state,
                            isProcessing: false,
                            actionInfo: 'Insufficient EQC'
                        })
                    }
                } else {
                    if (response.data[0].xqc_balance >= this.props.offer.price * dateDiffInDays(startDate, endDate)) {
                        this.createContractAfterBalanceCheck(response.data[0].xqc_balance, this.props.offer.price * dateDiffInDays(startDate, endDate))

                        console.log(self.state.nem_address);
                    } else {
                        this.setState({
                            ...this.state,
                            isProcessing: false,
                            actionInfo: 'Insufficient XQC'
                        })

                        console.log(self.state.nem_address);
                    }
                }
            })
            .catch((err) => {
                console.log("ACCEPT OFFER ERR");
                console.log(err);
            })

    }

    createContractAfterBalanceCheck(existingBalance, payoutCap) {
        const createContractURL = "https://marketplacedb.qchain.co/contract";
        const config = {
            headers: { Authorization: "Bearer " + localStorage.getItem('id_token') }
        };
        const payload = {
            name: this.props.offer.topic,
            advertiser: localStorage.getItem('role'),
            publisher: this.props.offer.sender,
            start_date: this.props.offer.start_date,
            end_date: this.props.offer.end_date,
            currency: this.props.offer.currency,
            payout_cap: payoutCap,
            contentlisting: this.props.offer.listing_id,
            contentspacelisting: null
        };

        axios.post(createContractURL, payload, config)
            .then(() => {
                // success
                this.patchListing();
                this.deleteOffer();
                this.makePayment(existingBalance);
            })
            .catch((err) => {
                console.log("CREATE CONTRACT ERR")
                console.log(err);
            })
    }

    patchListing() {
        const patchListingURL = "https://marketplacedb.qchain.co/listing?id=eq." + this.props.offer.listing_id;
        const config = {
            headers: { Authorization: "Bearer " + localStorage.getItem('id_token') }
        };
        const payload = {
            isactive: false
        }
        axios.patch(patchListingURL, payload, config)
            .then(() => {
                // success
            })
            .catch((err) => {
                console.log("PATCH LISTING ERR")
                console.log(err);
            })
    }

    handleDeclineOffer() {
        this.deleteOffer();
    }

    deleteOffer() {
        const deleteOfferURL = "https://marketplacedb.qchain.co/offer?id=eq." + this.props.offer.id;
        const config = {
            headers: { Authorization: "Bearer " + localStorage.getItem('id_token') }
        };
        axios.delete(deleteOfferURL, config)
            .then(() => {
                // success
                this.props.refreshData();
            })
            .catch((err) => {
                console.log("DELETE OFFER ERR")
                console.log(err);
            })
    }

    getInfoPopover() {
        let startDate = new Date(this.props.offer.start_date);
        let endDate = new Date(this.props.offer.end_date);
        return (
            <Popover title={this.props.offer.sender_name + ' sent you an offer!'} id={'popover' + this.props.offer.id}>
                <strong>Ad Format</strong> {this.props.offer.ad_format} <br />
                <Divider />
                <strong>Start Date</strong> {this.props.offer.start_date} <br />
                <strong>End Date</strong> {this.props.offer.end_date} <br />
                <Divider />
                <strong>Pricing</strong> {this.props.offer.price} {this.props.offer.currency} per day<br />
                <strong>Total</strong> {this.props.offer.price * dateDiffInDays(startDate, endDate)} {this.props.offer.currency}
                <Divider />
                <strong>Message</strong><br />
                {this.props.offer.message}
            </Popover>
        )
    }

    handleOkayClick() {
        this.setState({
            ...this.state,
            actionInfo: ''
        })
    }

    render() {
        return <tr className='offer-renderer-tr'>
            <td style={{ paddingTop: '16px' }}>
                <OverlayTrigger trigger={['hover', 'focus']} placement='right' overlay={this.getInfoPopover()}>
                    <a style={{ cursor: 'pointer' }}> {this.props.offer.topic} ({this.props.offer.currency}) - {this.props.offer.sender_name}</a>
                </OverlayTrigger>
            </td>
            <td style={{ textAlign: 'center' }}>
                {
                    (this.state.isProcessing)
                        ? <span style={{ color: '#777777' }}>Processing Action...</span>
                        : <div>
                            {
                                (this.state.actionInfo.length > 0)
                                    ? <div>{this.state.actionInfo} <Button style={{ marginLeft: '5px' }} onClick={this.handleOkayClick}>OK</Button></div>
                                    : (<div>
                                        <Button
                                            bsStyle='success'
                                            onClick={() => this.handleAcceptOffer()}
                                            style={{ marginRight: '10px' }}
                                        > Accept </Button>
                                        <Button bsStyle='danger' onClick={() => this.handleDeclineOffer()}>Decline</Button>
                                    </div>)
                            }
                        </div>
                }
            </td>
        </tr>
    }

}

const _MS_PER_DAY = 1000 * 60 * 60 * 24;

// a and b are javascript Date objects
function dateDiffInDays(a, b) {
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    return (Math.ceil((utc2 - utc1) / _MS_PER_DAY) + 1 === 0 ? 1 : Math.ceil((utc2 - utc1) / _MS_PER_DAY) + 1);
}

const mapStateToProps = (state) => {
    return {
        profile: state.ProfileReducer.profile,
        nem_address: state.ProfileReducer.profile.nem_address,
        eth_address: state.ProfileReducer.profile.eth_address,
    }
}

export default connect(
    mapStateToProps
)(OfferList);

export const ProfileConnectedOfferRenderer = connect(
    mapStateToProps
)(OfferRenderer);
