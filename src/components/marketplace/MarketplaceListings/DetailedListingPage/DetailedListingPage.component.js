import React, { Component } from 'react';
//import { connect } from 'react-redux';

import './DetailedListingPage.component.css';


class DetailedListingPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        // console.log(this.props.match.params.id)
        // make a request to get detailed listing info using ID
        // parse info onto the page
        return <div className='detailed-listing-container'>
            <p>I'm a detailed listing page</p>
            <p>ID = {this.props.match.params.id}</p>
        </div>
    }
}

export default DetailedListingPage;