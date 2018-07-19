/*
Core Libs
*/
import React, { Component } from 'react';
import { connect } from 'react-redux';

/*
React Bootstrap
*/
import { Button, ButtonGroup } from 'react-bootstrap';

/*
Local CSS
*/
import './MarketingTypeDropdown.component.css';

class MarketingTypeDropdown extends Component {
    constructor(props) {
        super(props);
        
        this.showMedium = this.showMedium.bind(this);
    }

    showMedium(adFormat, medium) {
        
        if (adFormat === 'Branded Content' || adFormat === 'Patron Journalism') {
            return <div>
                <p className='marketing-type-selector-title'>Select Medium</p>
                <ButtonGroup justified >
                    <Button
                        className='btn-marketing-type-selector'
                        onClick={() => this.props.onMediumClick('Written Piece')}
                        active={medium === 'Written Piece'}
                        href="#"
                    >
                        Written Piece
                </Button>
                    <Button
                        className='btn-marketing-type-selector'
                        onClick={() => this.props.onMediumClick('Audio Piece')}
                        active={medium === 'Audio Piece'}
                        href="#"
                    >
                        Audio Piece
                </Button>
                    <Button
                        className='btn-marketing-type-selector'
                        onClick={() => this.props.onMediumClick('Video Piece')}
                        active={medium === 'Video Piece'}
                        href="#"
                    >
                        Video Piece
                </Button>
                    <Button
                        className='btn-marketing-type-selector'
                        onClick={() => this.props.onMediumClick('Other')}
                        active={medium === 'Other'}
                        href="#"
                    >
                        Other
                </Button>
                </ButtonGroup>
                <ButtonGroup justified style={{ marginBottom: '25px' }} >
                    <Button
                        className='btn-marketing-type-selector'
                        onClick={() => this.props.onMediumClick('Webinar')}
                        active={medium === 'Webinar'}
                        href="#"
                    >
                        Webinar
                    </Button>
                    <Button
                        className='btn-marketing-type-selector'
                        onClick={() => this.props.onMediumClick('Email')}
                        active={medium === 'Email'}
                        href="#"
                    >
                        Email
                    </Button>
                </ButtonGroup>
            </div>
        } else if (adFormat === 'Influencer Post') {
            return <div>
                <p className='marketing-type-selector-title'>Select Medium</p>
                <ButtonGroup justified >
                    <Button
                        className='btn-marketing-type-selector'
                        onClick={() => this.props.onMediumClick('Tweet')}
                        active={medium === 'Tweet'}
                        href="#"
                    >
                        Tweet
                    </Button>
                    <Button
                        className='btn-marketing-type-selector'
                        onClick={() => this.props.onMediumClick('Instagram')}
                        active={medium === 'Instagram'}
                        href="#"
                    >
                        Instagram
                    </Button>
                    <Button
                        className='btn-marketing-type-selector'
                        onClick={() => this.props.onMediumClick('Twitch')}
                        active={medium === 'Twitch'}
                        href="#"
                    >
                        Twitch
                    </Button>
                    <Button
                        className='btn-marketing-type-selector'
                        onClick={() => this.props.onMediumClick('Youtube')}
                        active={medium === 'Youtube'}
                        href="#"
                    >
                        Youtube
                    </Button>
                </ButtonGroup>
                <ButtonGroup style={{ marginBottom: '25px' }} justified >
                    <Button
                        className='btn-marketing-type-selector'
                        onClick={() => this.props.onMediumClick('Facebook')}
                        active={medium === 'Facebook'}
                        href="#"
                    >
                        Facebook
                    </Button>
                    <Button
                        className='btn-marketing-type-selector'
                        onClick={() => this.props.onMediumClick('Twitter')}
                        active={medium === 'Twitter'}
                        href="#"
                    >
                        Twitter
                    </Button>
                    <Button
                        className='btn-marketing-type-selector'
                        onClick={() => this.props.onMediumClick('NicoNico')}
                        active={medium === 'NicoNico'}
                        href="#"
                    >
                        NicoNico
                    </Button>
                    <Button
                        className='btn-marketing-type-selector'
                        onClick={() => this.props.onMediumClick('Other')}
                        active={medium === 'Other'}
                        href="#"
                    >
                        Other
                    </Button>
                </ButtonGroup>
            </div>
        } else if ( adFormat === 'Sponsorship' ){
            return <div>
                <ButtonGroup justified>
                    <Button
                        className='btn-marketing-type-selector'
                        onClick={() => this.props.onMediumClick('Event')}
                        active={medium === 'Event'}
                        href="#"
                    >
                        Event
                    </Button>
                    <Button
                        className='btn-marketing-type-selector'
                        onClick={() => this.props.onMediumClick('Individual')}
                        active={medium === 'Individual'}
                        href="#"
                    >
                        Individual
                    </Button>
                    <Button
                        className='btn-marketing-type-selector'
                        onClick={() => this.props.onMediumClick('Other')}
                        active={medium === 'Other'}
                        href="#"
                    >
                        Other
                    </Button>
                    <Button
                        className='btn-marketing-type-selector'
                        onClick={() => this.props.onMediumClick('Website')}
                        active={medium === 'Website'}
                        href="#"
                    >
                        Website
                    </Button>
                </ButtonGroup>
                <ButtonGroup justified style={{ marginBottom: '25px' }} >
                    <Button
                        className='btn-marketing-type-selector'
                        onClick={() => this.props.onMediumClick('Artistic Creation')}
                        active={medium === 'Artistic Creation'}
                        href="#"
                    >
                        Artistic Creation
                    </Button>
                    <Button
                        className='btn-marketing-type-selector'
                        onClick={() => this.props.onMediumClick('Email Newsletter')}
                        active={medium === 'Webinar'}
                        href="#"
                    >
                        Email Newsletter
                    </Button>
                </ButtonGroup>
            </div>
        } else {
            return null;
        }
    }

    render() {
        const adFormat = ( this.props.modeFilter === 'Advertiser' ? this.props.adv_adFormat : this.props.pub_adFormat);
        const medium = ( this.props.modeFilter === 'Advertiser' ? this.props.adv_medium : this.props.pub_medium );

        return <div>
            <p className='marketing-type-selector-title'>Select Authentic Marketing Type</p>
            <ButtonGroup style={{ marginBottom: '25px' }} justified >
                <Button
                    className='btn-marketing-type-selector'
                    onClick={() => this.props.onTypeClick('Branded Content')}
                    active={adFormat === 'Branded Content'}
                    href="#"
                >
                    Branded Content
                </Button>
                <Button
                    className='btn-marketing-type-selector'
                    onClick={() => this.props.onTypeClick('Influencer Post')}
                    active={adFormat === 'Influencer Post'}
                    href="#"
                >
                    Influencer Post
                </Button>
                <Button
                    className='btn-marketing-type-selector'
                    onClick={() => this.props.onTypeClick('Sponsorship')}
                    active={adFormat === 'Sponsorship'}
                    href="#"
                >
                    Sponsorship
                </Button>
                <Button
                    className='btn-marketing-type-selector'
                    onClick={() => this.props.onTypeClick('Patron Journalism')}
                    active={adFormat === 'Patron Journalism'}
                    href="#"
                >
                    Patron Journalism
                </Button>
            </ButtonGroup>
            {this.showMedium(adFormat, medium)}
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        adv_adFormat        : state.CreateListingFormReducer.advertiserForm.adFormat,
        adv_medium          : state.CreateListingFormReducer.advertiserForm.medium,
        pub_adFormat        : state.CreateListingFormReducer.publisherForm.adFormat,
        pub_medium          : state.CreateListingFormReducer.publisherForm.medium
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    const { modeFilter } = ownProps;
    return {
        onTypeClick: (value) => {
            if(modeFilter === 'Advertiser') {
                if(value === 'Sponsorship'){
                    dispatch({
                        type: 'SET_ADV_FORM_MARKETING_TYPE',
                        adFormat: value
                    }) && dispatch({
                        type: 'SET_ADV_FORM_MARKETING_MEDIUM',
                        medium: 'Other'
                    })
                }else{
                    dispatch({
                        type: 'SET_ADV_FORM_MARKETING_TYPE',
                        adFormat: value
                    })
                }
            }else {
                if(value === 'Sponsorship'){
                    dispatch({
                        type: 'SET_PUB_FORM_MARKETING_TYPE',
                        adFormat: value
                    }) && dispatch({
                        type: 'SET_PUB_FORM_MARKETING_MEDIUM',
                        medium: 'Other'
                    })
                }else{
                    dispatch({
                        type: 'SET_PUB_FORM_MARKETING_TYPE',
                        adFormat: value
                    })
                }
            }
           
        },

        onMediumClick: (value) => {
            if(modeFilter === 'Advertiser') {
                dispatch({
                    type: 'SET_ADV_FORM_MARKETING_MEDIUM',
                    medium: value
                })
            }else {
                dispatch({
                    type: 'SET_PUB_FORM_MARKETING_MEDIUM',
                    medium: value
                })
            }
        }
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MarketingTypeDropdown);