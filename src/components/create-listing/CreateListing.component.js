/*
Core Libs
*/
import React from 'react';

/*
Local CSS
*/
import './CreateListing.component.css'

import CreateListingForm from './CreateListingForm/CreateListingForm.component'


/**
 * Create Listing Component
 */
const CreateListing = () => (
    <div className='create-container'>
        <CreateListingForm />
    </div>
)

export default CreateListing;
