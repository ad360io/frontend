/*
Core Libs
*/
import React, { Component } from 'react';

/*
Material UI Components
*/
import { Card, CardText, CardTitle } from 'material-ui/Card';

/*
React Bootstrap
*/
import { Modal, Button, FormGroup, FormControl } from 'react-bootstrap';

/*
Placeholder Images
*/
import branded_content_ph      from '../../../../assets/images/branded_content_placeholder.png';
import influencer_marketing_ph from '../../../../assets/images/influencer_marketing_placeholder.png';
import sponsorships_ph         from '../../../../assets/images/sponsorships_placeholder.png';
import default_ph              from '../../../../assets/images/pug_face.jpg';

/*
Local CSS
*/
import './ListingCard.component.css';


/**
 * Singleton of a Listing display
 * expects props of a single listing object
 */
class ListingCard extends Component {
    constructor(props) {
        super(props)

        // Using window.innerWidth in state to acheive responsiveness
        this.state = {
            width: window.innerWidth,
            modalShow: false,
        }

        // Binding functions
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this.decideCardWidth = this.decideCardWidth.bind(this);
        this.decideMarginLeft = this.decideMarginLeft.bind(this);
        this.decidePlaceholderImage = this.decidePlaceholderImage.bind(this);
        this.decideTitleDisplayText = this.decideTitleDisplayText.bind(this);
        this.handleHideModal = this.handleHideModal.bind(this);
        this.handleShowModal = this.handleShowModal.bind(this);
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

    handleShowModal(){
        this.setState({ ...this.state, show: true });
    }

    handleHideModal(){
        this.setState({ ...this.state, show: false });
    }

    /**
     * Based on window width, change card width
     * to avoid too many white spaces on the card
     */
    decideCardWidth() {
        if(this.state.width >= 1440){
            return '30%';
        }else if(this.state.width >= 1200){
            return '45%';
        }else{
            return '80%';
        }
    }

    /**
     * On medium to small screens, save space from margin-left
     */
    decideMarginLeft(){
        if(this.state.width >= 1200) {
            return '2%';
        }else{
            return '10%';
        }
    }

    /**
     * Decide placeholder image based on the listing's genre
     */
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

    /**
     * To prevent text flowing over the listing card itself,
     * we can trim the title by calculating amount of space given
     * and replace the rest of title with '...'
     */
    decideTitleDisplayText() {
        // Each character in CardTitle is around 10-13px
        let cardWidthInPercent;
        let drawerSize = 300;
        
        if(this.state.width >= 1440){
            // In 3 column mode, each card is 30% of the (full window width - drawer size)
            // To guarantee no visual bug, assume each character is 13px
            cardWidthInPercent = .3
            
        }else if(this.state.width >= 1200){
            // In 2 column mode, each card is 45% of the full window width - drawer size
            cardWidthInPercent = .45
        }else{
            // Single column mode, each card is 80% of the full window width
            cardWidthInPercent = .8
        }

        // Drawer closes at small screen, take into account
        if(this.state.width <= 768){
            drawerSize = 0;
        }

        // Get the count of original title 
        // and the count of characters without overflowing
        // to detect if we need '...' at the end of title.
        const numberOfCharOriginal = this.props.listing.name.length;
        const numberOfCharAllowed = Math.floor((this.state.width - drawerSize) * cardWidthInPercent / 13 - 3);
        const dotDotDot = (numberOfCharAllowed < numberOfCharOriginal ? '...' : '')
        return this.props.listing.name.slice(0, numberOfCharAllowed)+dotDotDot;
    }

    render() {
        return <div>
            <Card className='listing-card-container' 
                style={{ 
                    width: this.decideCardWidth(),
                    marginLeft: this.decideMarginLeft(),
                }
            }>
                <div className='poster-tag'>{this.props.listing.username} </div>
                <div className='price-tag'>{this.props.listing.pricing+' '+this.props.listing.currency}</div>

                <CardTitle title={this.decideTitleDisplayText()} subtitle={'Posted on: '+this.props.listing.ask_date_from} />
                <img src={this.decidePlaceholderImage()} className='listing-img' alt='listing-img'/>
                <CardText className='listing-msg'>
                    {this.props.listing.msg}
                </CardText>
                <Button bsStyle='primary' className='btn-contact-action' onClick={this.handleShowModal}>Contact {this.props.listing.username}</Button>
            </Card>

            <Modal show={this.state.show} onHide={this.handleHideModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Invite to {this.props.listing.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h3>Why you should get in touch with us?</h3>
                    <p>{this.props.listing.msg}</p>
                    <br/>
                    <h3>Our pricing</h3>
                    <p>{this.props.listing.pricing+' '+this.props.listing.currency.toUpperCase()}</p>
                    <br />
                    <h3>Additional Info</h3>
                    <FormGroup controlId='control-form-additional-info'>
                        <FormControl componentClass='textarea' 
                            placeholder='Is there anything that you want them to know?' 
                            maxLength={280} 
                            rows={8}
                            style={{resize: 'vertical'}}/>
                    </FormGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button disabled>Send Invite</Button>
                    <Button onClick={this.handleHideModal}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    }
}


export default ListingCard;