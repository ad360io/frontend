import React from 'react';
import { connect } from 'react-redux';

import './MarketingTypeFilter.component.css';

import { setContentGenre } from '../../../../actions/MarketplaceActions';

import { Button, SplitButton, MenuItem } from 'react-bootstrap';

const MarketingTypeFilter = ({onMarketingTypeClick, marketingTypeFilter}) => (
    <div>
        <Button
            className='btn-marketing-type'
            onClick={() => {onMarketingTypeClick('Show All')}}
            active={marketingTypeFilter === 'Show All'}
        >
            Show All
        </Button>
        <SplitButton
            className='split-btn-marketing-type'
            title='Branded Content'
            id='branded-content-menu'
            pullRight
            onClick={() => onMarketingTypeClick('Branded Content')}
            active={marketingTypeFilter === 'Branded Content'}
        >
            <MenuItem >Written Post</MenuItem>
            <MenuItem >Podcast</MenuItem>
            <MenuItem >Video</MenuItem>
        </SplitButton>
        <SplitButton
            className='split-btn-marketing-type'
            title='Influencer Post'
            id='influencer-post-menu'
            pullRight
            onClick={() => onMarketingTypeClick('Influencer Post')}
            active={marketingTypeFilter === 'Influencer Post'}
        >
            <MenuItem >Tweet</MenuItem>
            <MenuItem >Instagram</MenuItem>
            <MenuItem >Twitch</MenuItem>
            <MenuItem >Youtube</MenuItem>
            <MenuItem >Facebook</MenuItem>
            <MenuItem >Twitter</MenuItem>
            <MenuItem >NicoNico</MenuItem>
        </SplitButton>
        <Button
            className='btn-marketing-type'
            onClick={() => onMarketingTypeClick('Sponsorship')}
            active={marketingTypeFilter === 'Sponsorship'}
        >
            Sponsorship
        </Button>
    </div>
)

const mapStateToProps = (state) => {
    return {
        marketingTypeFilter: state.MarketplaceFilterReducer.contentGenreFilter,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onMarketingTypeClick: (marketingType) => {
            dispatch(setContentGenre(marketingType))
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MarketingTypeFilter)