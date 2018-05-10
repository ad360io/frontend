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
 */
class CreateListing extends Component {
    render() {
        return <div className="create-container">
            <ConnectedCreateListingForm />
        </div>;
    }
}


export default CreateListing;