/*
Core Libs
*/
import React, { Component } from 'react';
import { connect } from 'react-redux';

/*
React Bootstrap
*/
import { FormGroup, FormControl } from 'react-bootstrap';
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

    showMedium() {
        if (this.props.marketingType === 'Branded Content' || this.props.marketingType === 'Patron Journalism') {
            return <div>
                <p className='marketing-type-selector-title'>Select Medium</p>
                <ButtonGroup style={{ marginBottom: '25px' }} justified >
                    <Button
                        className='btn-marketing-type-selector'
                        onClick={() => this.props.onMediumClick('Written Piece')}
                        active={this.props.marketingMedium === 'Written Piece'}
                        href="#"
                    >
                        Written Piece
                </Button>
                    <Button
                        className='btn-marketing-type-selector'
                        onClick={() => this.props.onMediumClick('Audio Piece')}
                        active={this.props.marketingMedium === 'Audio Piece'}
                        href="#"
                    >
                        Audio Piece
                </Button>
                    <Button
                        className='btn-marketing-type-selector'
                        onClick={() => this.props.onMediumClick('Video Piece')}
                        active={this.props.marketingMedium === 'Video Piece'}
                        href="#"
                    >
                        Video Piece
                </Button>
                    <Button
                        className='btn-marketing-type-selector'
                        onClick={() => this.props.onMediumClick('Other')}
                        active={this.props.marketingMedium === 'Other'}
                        href="#"
                    >
                        Other
                </Button>
                </ButtonGroup>
            </div>
        } else if (this.props.marketingType === 'Influencer Post') {
            return <div>
                <p className='marketing-type-selector-title'>Select Medium</p>
                <ButtonGroup justified >
                    <Button
                        className='btn-marketing-type-selector'
                        onClick={() => this.props.onMediumClick('Tweet')}
                        active={this.props.marketingMedium === 'Tweet'}
                        href="#"
                    >
                        Tweet
                    </Button>
                    <Button
                        className='btn-marketing-type-selector'
                        onClick={() => this.props.onMediumClick('Instagram')}
                        active={this.props.marketingMedium === 'Instagram'}
                        href="#"
                    >
                        Instagram
                    </Button>
                    <Button
                        className='btn-marketing-type-selector'
                        onClick={() => this.props.onMediumClick('Twitch')}
                        active={this.props.marketingMedium === 'Twitch'}
                        href="#"
                    >
                        Twitch
                    </Button>
                    <Button
                        className='btn-marketing-type-selector'
                        onClick={() => this.props.onMediumClick('Youtube')}
                        active={this.props.marketingMedium === 'Youtube'}
                        href="#"
                    >
                        Youtube
                    </Button>
                </ButtonGroup>
                <ButtonGroup style={{ marginBottom: '25px' }} justified >
                    <Button
                        className='btn-marketing-type-selector'
                        onClick={() => this.props.onMediumClick('Facebook')}
                        active={this.props.marketingMedium === 'Facebook'}
                        href="#"
                    >
                        Facebook
                    </Button>
                    <Button
                        className='btn-marketing-type-selector'
                        onClick={() => this.props.onMediumClick('Twitter')}
                        active={this.props.marketingMedium === 'Twitter'}
                        href="#"
                    >
                        Twitter
                    </Button>
                    <Button
                        className='btn-marketing-type-selector'
                        onClick={() => this.props.onMediumClick('NicoNico')}
                        active={this.props.marketingMedium === 'NicoNico'}
                        href="#"
                    >
                        NicoNico
                    </Button>
                    <Button
                        className='btn-marketing-type-selector'
                        onClick={() => this.props.onMediumClick('Other')}
                        active={this.props.marketingMedium === 'Other'}
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
        return <div>
            <p className='marketing-type-selector-title'>Select Authentic Marketing Type</p>
            <ButtonGroup style={{ marginBottom: '25px' }} justified >
                <Button
                    className='btn-marketing-type-selector'
                    onClick={() => this.props.onTypeClick('Branded Content')}
                    active={this.props.marketingType === 'Branded Content'}
                    href="#"
                >
                    Branded Content
                </Button>
                <Button
                    className='btn-marketing-type-selector'
                    onClick={() => this.props.onTypeClick('Influencer Post')}
                    active={this.props.marketingType === 'Influencer Post'}
                    href="#"
                >
                    Influencer Post
                </Button>
                <Button
                    className='btn-marketing-type-selector'
                    onClick={() => this.props.onTypeClick('Sponsorship')}
                    active={this.props.marketingType === 'Sponsorship'}
                    href="#"
                >
                    Sponsorship
                </Button>
                <Button
                    className='btn-marketing-type-selector'
                    onClick={() => this.props.onTypeClick('Patron Journalism')}
                    active={this.props.marketingType === 'Patron Journalism'}
                    href="#"
                >
                    Patron Journalism
                </Button>
            </ButtonGroup>
            {this.showMedium()}
        </div>
    }
}

const mapStateToProps = (props) => {
    return {
        marketingType   : props.CreateListingFormReducer.marketingType,
        marketingMedium : props.CreateListingFormReducer.marketingMedium,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onTypeClick: (value) => {
            if(value === 'Sponsorship'){
                dispatch({
                    type: 'SET_MARKETING_TYPE',
                    marketingType: value
                }) && dispatch({
                    type: 'SET_MARKETING_MEDIUM',
                    marketingMedium: 'Other'
                })
            }else{
                dispatch({
                    type: 'SET_MARKETING_TYPE',
                    marketingType: value
                })
            }
        },

        onMediumClick: (value) => {
            dispatch({
                type: 'SET_MARKETING_MEDIUM',
                marketingMedium: value
            })

        }
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MarketingTypeDropdown);