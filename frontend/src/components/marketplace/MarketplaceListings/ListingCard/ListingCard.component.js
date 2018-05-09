/*
Core Libs
*/
import React, { Component } from 'react';
import { Card, CardHeader, CardText, CardTitle } from 'material-ui/Card';
import Divider from 'material-ui/Divider';

import branded_content_ph      from '../../../../assets/images/branded_content_placeholder.png'
import influencer_marketing_ph from '../../../../assets/images/influencer_marketing_placeholder.png'
import sponsorships_ph         from '../../../../assets/images/sponsorships_placeholder.png';
import default_ph              from '../../../../assets/images/pug_face.jpg'

import './ListingCard.component.css'
/**
 * Singleton of a Listing display
 * expects props of 
 */
class ListingCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            width: window.innerWidth
        }
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this.decideCardWidth = this.decideCardWidth.bind(this);
        this.decideMarginLeft = this.decideMarginLeft.bind(this);
        this.decidePlaceholderImage = this.decidePlaceholderImage.bind(this);
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth });
    }

    decideCardWidth() {
        if(this.state.width >= 1440){
            return '30%';
        }else if(this.state.width >= 1200){
            return '45%';
        }else{
            return '80%';
        }
    }

    decideMarginLeft(){
        if(this.state.width >= 1200) {
            return '2%';
        }else{
            return '10%';
        }
    }

    decidePlaceholderImage(){
        switch(this.props.listing.genre){
            case 'Branded Content':
                return branded_content_ph;
            case 'Influencer Post':
                return influencer_marketing_ph;
            case 'Sponsorship':
                return sponsorships_ph;
            default:
                return default_ph;
        }
    }

    render() {
        return <div>
            <Card className="listing-card-container" 
                style={{ 
                    width: this.decideCardWidth(),
                    marginLeft: this.decideMarginLeft(),
                }
            }>
                
                <div className="poster-tag">{this.props.listing.username} </div>
                <div className="price-tag">{this.props.listing.pricing+" "+this.props.listing.currency}</div>

                <CardTitle title={this.props.listing.name} subtitle={"Posted on: "+this.props.listing.ask_date_from} />
                <img src={this.decidePlaceholderImage()} className="listing-img"/>
                <CardText className="listing-msg">
                    {this.props.listing.msg}
                </CardText>
            <div className="btn-contact-action">Contact {this.props.listing.username}</div>
            </Card>
        </div>
    }
}


export default ListingCard;