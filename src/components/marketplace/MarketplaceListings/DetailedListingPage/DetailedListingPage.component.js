import React, { Component } from 'react';
import axios from 'axios';

import './DetailedListingPage.component.css';


class DetailedListingPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fetched: false,
            error: null,
            listing: null
        }
    }
    
    componentWillMount() {
        // call on start load to get data
        const baseURL = "http://localhost:3000/api/listing?id=";
        axios.get(baseURL+this.props.match.params.id)
            .then((response) => {
                this.setState({
                    ...this.state,
                    fetched: true,
                    listing: response.data
                })
            })
            .catch((err) => {
                this.setState({
                    ...this.state,
                    fetched: true,
                    error: err
                })                
        })
        // reset view
        window.scrollTo(0,0);
    }

    render() {
        // console.log(this.props.match.params.id)
        // make a request to get detailed listing info using ID
        // parse info onto the page
        return <div className='detailed-listing-container'>
            {
                (this.state.fetched
                    ? ( this.state.listing.type === "request" 
                        ? <DetailedRequestListing listing={this.state.listing} />
                        : <DetailedContentSpaceListing listing={this.state.listing} />)
                    : null
                )
            }
        </div>
    }
}

const DetailedRequestListing = ({ listing }) => (
    <div style={{textAlign: 'left', fontSize: '14px', fontFamily: 'sans serif', fontStretch: 'normal'}}>
        <div>Listing Type: {listing.type}</div>
        <div>Requestor: {listing.requestor}</div>
        <div>Currency: {listing.currency}</div>
        <div>Marketing Type: {listing.marketingType}</div>
        <div>Marketing Medium: {listing.medium}</div>
        <div>Content Topic: {listing.contentTopic}</div>
        <div>Images: {listing.images}</div>
        <div>Ask Date: {listing.ask_date_from}</div>
        <div>Description: {listing.requestDescription}</div>
    </div>
)

const DetailedContentSpaceListing = ({ listing }) => (
    <div style={{textAlign: 'left', fontSize: '14px', fontFamily: 'sans serif', fontStretch: 'normal'}}>
        <div>Listing Type: {listing.type}</div>
        <div>Creator: {listing.creator}</div>
        <div>Promotion Duration: {listing.ask_date_from} - {listing.ask_date_to}</div>
        <div>Marketing Type: {listing.marketingType}</div>
        <div>Marketing Medium: {listing.medium}</div>
        <div>Content Topic: {listing.contentTopic}</div>
        <div>Pricing: {listing.pricing + " " + listing.currency + " " + listing.timeUnit}</div>
        <div>Description: {listing.listingDescription}</div>
    </div>
)


export default DetailedListingPage;