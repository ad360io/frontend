/*
Core Libs
*/
import React from 'react';

/*
Local CSS
*/
import './CreateListing.component.css'

import ConnectedCreateListingForm from './CreateListingForm/ConnectedCreateListingForm'


/**
 * Create Listing Component
 */
const CreateListing = () => (
    <div className="create-container">
        <ConnectedCreateListingForm />
    </div>
)

export default CreateListing;
