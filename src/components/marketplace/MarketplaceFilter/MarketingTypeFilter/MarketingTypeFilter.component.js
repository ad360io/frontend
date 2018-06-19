/*
Core Libs
*/
import React from 'react';
import { connect } from 'react-redux';

/*
Local CSS
*/
import './MarketingTypeFilter.component.css';

/*
Actions
*/
import { setContentGenre } from '../../../../actions/MarketplaceActions';

/*
React Bootstrap
*/
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
            <MenuItem >Written Piece</MenuItem>
            <MenuItem >Audio Piece</MenuItem>
            <MenuItem >Video Piece</MenuItem>
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
        <SplitButton
            className='split-btn-marketing-type'
            title='Patron Journalism'
            id='branded-content-menu'
            pullRight
            onClick={() => onMarketingTypeClick('Patron Journalism')}
            active={marketingTypeFilter === 'Patron Journalism'}
        >
            <MenuItem >Written Piece</MenuItem>
            <MenuItem >Audio Piece</MenuItem>
            <MenuItem >Video Piece</MenuItem>
        </SplitButton>
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