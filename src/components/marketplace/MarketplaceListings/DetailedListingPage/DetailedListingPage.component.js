import React, { Component } from 'react';
import axios from 'axios';

import './DetailedListingPage.component.css';

/*
Placeholder Images
*/
import branded_content_ph      from '../../../../assets/images/branded_content_placeholder.png';
import influencer_marketing_ph from '../../../../assets/images/influencer_marketing_placeholder.png';
import sponsorships_ph         from '../../../../assets/images/sponsorships_placeholder.png';
import default_ph              from '../../../../assets/images/pug_face.jpg';

import { Card, CardText, CardTitle }  from 'material-ui';
import Divider                        from 'material-ui/Divider';

import DetailedImageSlider from './DetailedImageSlider/DetailedImageSlider.component';


class DetailedListingPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fetched: false,
            error: null,
            listing: null,
            width: window.innerWidth
        }

        // Binding functions
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this.decideImage = this.decideImage.bind(this);
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ ...this.state, width: window.innerWidth });
    }

    decideImage(url, marketingType) {
        if(marketingType === 'Branded Content'){
            return branded_content_ph;
        }else if(marketingType === 'Influencer Post'){
            return influencer_marketing_ph;
        }else{
            return sponsorships_ph;
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
                        ? <DetailedRequestListing 
                                listing={this.state.listing}
                                decideImage={this.decideImage}
                          />
                        : <DetailedContentSpaceListing 
                                listing={this.state.listing} 
                                decideImage={this.decideImage}
                          />
                      )
                    : null
                )
            }
        </div>
    }
}

const DetailedRequestListing = ({ listing, decideImage }) => (
    

    <div style={{textAlign: 'left', fontSize: '14px', fontFamily: 'sans serif', fontStretch: 'normal'}}>
        {
            /* ********************  SCHEMA OF A REQUEST LISTING ********************
                "id" : #,
                "type" : "",
                "requestor": "",
                "currency": "",
                "marketingType": "",
                "medium": "",
                "contentTopic": "",
                "images": "",
                "ask_date_from": "",
                "requestDescription": ""
            */
        }
        <Card className='detailed-image-container'>
            <CardText>
                <DetailedImageSlider imageSrc={decideImage(listing.images, listing.marketingType)} />
            </CardText>
        </Card>
        
        <Card className='listing-concrete-details-container'>
            <CardTitle>
            <h1>{listing.contentTopic}</h1>
            </CardTitle>
            <Divider />
            <CardText>
            <div>Marketing Type: {listing.marketingType} {listing.type}</div>
            <div>Marketing Medium: {listing.medium}</div>
            <br />
            <div>{listing.requestDescription}</div>
            </CardText>
        </Card>
        
        <Card className='poster-info-container'>
            <CardTitle>
                <h3>Requestor Info:</h3>
            </CardTitle>
            <CardText>
            <h4>{listing.requestor} trading in {listing.currency}</h4>
            <div>Ask Date: {listing.ask_date_from}</div>
            </CardText>
        </Card>
    </div>
)

const DetailedContentSpaceListing = ({ listing, decideImage }) => (
    <div style={{textAlign: 'left', fontSize: '14px', fontFamily: 'sans serif', fontStretch: 'normal'}}>
        {
            /* ********************  SCHEMA OF A CONTENT SPACE LISTING ********************
                "id" : #,
                "type" : "",
                "creator": "",
                "ask_date_from": "",
                "ask_date_to": "",
                "marketingType": "",
                "medium": "",
                "contentTopic": "",
                "pricing": #,
                "timeUnit": "",
                "currency": "",
                "listingDescription": "",
                "referralURI": ""
            */
        }
        <div><img src={decideImage(null, listing.type)}></img></div>
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