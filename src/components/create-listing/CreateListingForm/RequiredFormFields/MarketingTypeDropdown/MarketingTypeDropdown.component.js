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

    showMedium(marketingType, marketingMedium) {
        
        if (marketingType === 'Branded Content' || marketingType === 'Patron Journalism') {
            return <div>
                <p className='marketing-type-selector-title'>Select Medium</p>
                <ButtonGroup style={{ marginBottom: '25px' }} justified >
                    <Button
                        className='btn-marketing-type-selector'
                        onClick={() => this.props.onMediumClick('Written Piece')}
                        active={marketingMedium === 'Written Piece'}
                        href="#"
                    >
                        Written Piece
                </Button>
                    <Button
                        className='btn-marketing-type-selector'
                        onClick={() => this.props.onMediumClick('Audio Piece')}
                        active={marketingMedium === 'Audio Piece'}
                        href="#"
                    >
                        Audio Piece
                </Button>
                    <Button
                        className='btn-marketing-type-selector'
                        onClick={() => this.props.onMediumClick('Video Piece')}
                        active={marketingMedium === 'Video Piece'}
                        href="#"
                    >
                        Video Piece
                </Button>
                    <Button
                        className='btn-marketing-type-selector'
                        onClick={() => this.props.onMediumClick('Other')}
                        active={marketingMedium === 'Other'}
                        href="#"
                    >
                        Other
                </Button>
                </ButtonGroup>
            </div>
        } else if (marketingType === 'Influencer Post') {
            return <div>
                <p className='marketing-type-selector-title'>Select Medium</p>
                <ButtonGroup justified >
                    <Button
                        className='btn-marketing-type-selector'
                        onClick={() => this.props.onMediumClick('Tweet')}
                        active={marketingMedium === 'Tweet'}
                        href="#"
                    >
                        Tweet
                    </Button>
                    <Button
                        className='btn-marketing-type-selector'
                        onClick={() => this.props.onMediumClick('Instagram')}
                        active={marketingMedium === 'Instagram'}
                        href="#"
                    >
                        Instagram
                    </Button>
                    <Button
                        className='btn-marketing-type-selector'
                        onClick={() => this.props.onMediumClick('Twitch')}
                        active={marketingMedium === 'Twitch'}
                        href="#"
                    >
                        Twitch
                    </Button>
                    <Button
                        className='btn-marketing-type-selector'
                        onClick={() => this.props.onMediumClick('Youtube')}
                        active={marketingMedium === 'Youtube'}
                        href="#"
                    >
                        Youtube
                    </Button>
                </ButtonGroup>
                <ButtonGroup style={{ marginBottom: '25px' }} justified >
                    <Button
                        className='btn-marketing-type-selector'
                        onClick={() => this.props.onMediumClick('Facebook')}
                        active={marketingMedium === 'Facebook'}
                        href="#"
                    >
                        Facebook
                    </Button>
                    <Button
                        className='btn-marketing-type-selector'
                        onClick={() => this.props.onMediumClick('Twitter')}
                        active={marketingMedium === 'Twitter'}
                        href="#"
                    >
                        Twitter
                    </Button>
                    <Button
                        className='btn-marketing-type-selector'
                        onClick={() => this.props.onMediumClick('NicoNico')}
                        active={marketingMedium === 'NicoNico'}
                        href="#"
                    >
                        NicoNico
                    </Button>
                    <Button
                        className='btn-marketing-type-selector'
                        onClick={() => this.props.onMediumClick('Other')}
                        active={marketingMedium === 'Other'}
                        href="#"
                    >
                        Other
                    </Button>
                </ButtonGroup>
            </div>
        } else {
            return null;
        }
    }

    render() {
        const marketingType = ( this.props.modeFilter === 'Advertiser' ? this.props.adv_marketingType : this.props.pub_makretingType );
        const marketingMedium = ( this.props.modeFilter === 'Advertiser' ? this.props.adv_marketingMedium : this.props.pub_marketingMedium );

        return <div>
            <p className='marketing-type-selector-title'>Select Authentic Marketing Type</p>
            <ButtonGroup style={{ marginBottom: '25px' }} justified >
                <Button
                    className='btn-marketing-type-selector'
                    onClick={() => this.props.onTypeClick('Branded Content')}
                    active={marketingType === 'Branded Content'}
                    href="#"
                >
                    Branded Content
                </Button>
                <Button
                    className='btn-marketing-type-selector'
                    onClick={() => this.props.onTypeClick('Influencer Post')}
                    active={marketingType === 'Influencer Post'}
                    href="#"
                >
                    Influencer Post
                </Button>
                <Button
                    className='btn-marketing-type-selector'
                    onClick={() => this.props.onTypeClick('Sponsorship')}
                    active={marketingType === 'Sponsorship'}
                    href="#"
                >
                    Sponsorship
                </Button>
                <Button
                    className='btn-marketing-type-selector'
                    onClick={() => this.props.onTypeClick('Patron Journalism')}
                    active={marketingType === 'Patron Journalism'}
                    href="#"
                >
                    Patron Journalism
                </Button>
            </ButtonGroup>
            {this.showMedium(marketingType, marketingMedium)}
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        modeFilter          : state.MenuBarFilterReducer.modeFilter,
        adv_marketingType   : state.CreateListingFormReducer.advertiserForm.marketingType,
        adv_marketingMedium : state.CreateListingFormReducer.advertiserForm.marketingMedium,
        pub_makretingType   : state.CreateListingFormReducer.publisherForm.marketingType,
        pub_marketingMedium : state.CreateListingFormReducer.publisherForm.marketingMedium
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onTypeClick: (value) => {
            if(value === 'Sponsorship'){
                dispatch({
                    type: 'SET_ADV_FORM_MARKETING_TYPE',
                    marketingType: value
                }) && dispatch({
                    type: 'SET_ADV_FORM_MARKETING_MEDIUM',
                    marketingMedium: 'Other'
                })
            }else{
                dispatch({
                    type: 'SET_ADV_FORM_MARKETING_TYPE',
                    marketingType: value
                })
            }
        },

        onMediumClick: (value) => {
            dispatch({
                type: 'SET_ADV_FORM_MARKETING_MEDIUM',
                marketingMedium: value
            })

        }
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MarketingTypeDropdown);