/*
Core Libs
*/
import React, { Component } from 'react';
import axios                from 'axios';

/*
React Bootstrap Components
*/
import { Button }                  from 'react-bootstrap';
import { Popover, OverlayTrigger } from 'react-bootstrap';
import { Alert }                   from 'react-bootstrap';


/**
 * InviteList Component
 * User should be able to create a new smart contract when accepting a invite
 * Invite listing should be removed from list after action is performed.
 */
class OfferList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            finished: false,
            err: null,
            activeOffers: [],
            doingAction: [{}],
        }
        this.loadData = this.loadData.bind(this);
        this.loadData();
        this.handleDeclineOffer = this.handleDeclineOffer.bind(this);
        this.handleAcceptOffer = this.handleAcceptOffer.bind(this);
        this.isOfferDoingAction = this.isOfferDoingAction.bind(this);
    }

    isOfferDoingAction(offer) {
        return this.state.doingAction.includes(offer);
    }

    componentWillReceiveProps() {
        this.loadData();
    }

    loadData() {
        const activeListingURL = "https://qchain-marketplace-postgrest.herokuapp.com/my_offers_view";
        const config = {
            headers: { Authorization: "Bearer " + localStorage.getItem('id_token')}
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
    }

    handleAcceptOffer(offer) {
        let newDoingAction = this.state.doingAction.concat(offer);
        this.setState({
            ...this.state,
            doingAction: newDoingAction
        })
        const createContractURL = "https://qchain-marketplace-postgrest.herokuapp.com/contract";
        const config = {
            headers: { Authorization: "Bearer " + localStorage.getItem('id_token')}
        };
        const payload = {
            name: offer.topic,
            advertiser: localStorage.getItem('role'),
            publisher: offer.sender,
            start_date: offer.date_added,
            end_date: offer.expiration_date,
            currency: offer.currency,
            payout_cap: offer.price,
            contentlisting: offer.listing_id,
            contentspacelisting: null
        }
        console.log(payload);
        axios.post(createContractURL, payload, config)
                    .then(() => {
                        // success
                        this.patchListing(offer.listing_id);
                        this.deleteOffer(offer.id);
                    })
                    .catch((err) => {
                        console.log("CREATE CONTRACT ERR")
                        console.log(err);
                    })
    }

    patchListing(listingId) {
        const patchListingURL = "https://qchain-marketplace-postgrest.herokuapp.com/listing?id=eq."+listingId;
        const config = {
            headers: { Authorization: "Bearer " + localStorage.getItem('id_token')}
        };
        const payload = {
            isactive: false
        }
        axios.patch(patchListingURL,payload, config)
                    .then(() => {
                        // success
                    })
                    .catch((err) => {
                        console.log("PATCH LISTING ERR")
                        console.log(err);
                    })
    }

    handleDeclineOffer(offerId) {
        this.deleteOffer(offerId);
    }

    deleteOffer(offerId) {
        const deleteOfferURL = "https://qchain-marketplace-postgrest.herokuapp.com/offer?id=eq."+offerId;
        const config = {
            headers: { Authorization: "Bearer " + localStorage.getItem('id_token')}
        };
        axios.delete(deleteOfferURL, config)
                    .then(() => {
                        // success
                        this.loadData();
                    })
                    .catch((err) => {
                        console.log("DELETE OFFER ERR")
                        console.log(err);
                    })
    }

    render() {
        return <div className='invite-list-container'>
            <div className='table-responsive' style={{height: '320px', margin:'2%'}}>
                {
                    (this.state.finished && this.state.err === null && this.state.activeOffers.length === 0)
                        ? (<p style={{textAlign: 'center'}}>There is currently no offering...</p>)
                        : null
                }

                {
                    (this.state.finished && this.state.err === null && this.state.activeOffers.length > 0)
                        ? (
                            <table className='table table-bordered mb-0'>
                                <thead className='thead-default'>
                                    <tr>
                                        <th>Offer Detail</th>
                                        <th style={{width:'25%', textAlign:'center'}}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                    <OfferRenderer offerList={this.state.activeOffers}
                                        onAccept={this.handleAcceptOffer}
                                        onDecline={this.handleDeclineOffer}
                                        doingAction={this.isOfferDoingAction}
                                    />
                                }      
                                </tbody>
                            </table>
                        )
                        : null
                }

                
            </div>
        </div>
    }
    
}

/**
 * Dynamically generate dummy data, 
 * can take in props in future to create all invite listings.
 */
const OfferRenderer = ({offerList, onAccept, onDecline, doingAction}) => (
    
    offerList.map((offer, i) => {
        const infoPopover = (
            <Popover title={ offer.sender_name + ' sent you an offer!'} id={'popover'+i}>
                <strong>Ad Format</strong> {offer.ad_format} <br/>
                <strong>Date Added</strong> {offer.date_added} <br/>
                <strong>Pricing</strong> {offer.price} {offer.currency}
            </Popover>
        )
        return (
            <tr key={'offer-tr'+i}>
                    <td>
                        <OverlayTrigger trigger={['hover', 'focus']} placement='right' overlay={infoPopover}>
                            <a style={{cursor: 'pointer'}}> {offer.topic} ({offer.currency}) - {offer.sender_name}</a>
                        </OverlayTrigger> 
                    </td>
                    <td style={{textAlign: 'center'}}>
                    {
                        (doingAction(offer))
                            ? <span style={{color: '#777777'}}>Processing Action...</span>
                            : <div>
                                <Button bsStyle='success' onClick={() => onAccept(offer)} style={{marginRight: '10px'}}>Accept</Button>
                                <Button bsStyle='danger' onClick={() => onDecline(offer.id)}>Decline</Button>
                            </div>
                    }
                        
                    </td>
                </tr>
        )
    })
)


export default OfferList;