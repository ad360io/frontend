/*
Core Libs
*/
import React, { Component } from 'react';

/*
Local CSS
*/
import './CreateListing.component.css'

import ConnectedCreateListingForm from './CreateListingForm/ConnectedCreateListingForm'


/**
 * Create Listing Component
 *     Work to be done:
 *         - Change genres on UI
 *         - Set action creators
 *         - onCreate push action to Redux
 *         - Polish UI
 * 
 * Should be a generic component for users to create listings
 * Change listings types and criteria base on user mode:
 *     For Advertiser: create ads
 *     For Publisher : create adspace 
 */
class CreateListing extends Component {
    render() {
        return <div className="create-container">
            <ConnectedCreateListingForm />
        </div>;
    }
}


export default CreateListing;