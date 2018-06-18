/*
Core Libs
*/
import React from 'react';
import { connect } from 'react-redux';

import SearchInput from 'react-search-input';

import './KeywordFilter.component.css';

const KeywordFilter = ({onChange}) => (
    <div className='keyword-filter-container'>
        <SearchInput className='search-input' onChange />
    </div>
)

const mapStateToProps = (state) => {
    return {
       
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(KeywordFilter);