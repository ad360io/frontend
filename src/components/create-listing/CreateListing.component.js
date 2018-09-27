/*
Core Libs
*/
import React, { Component } from 'react';

/*
Local CSS
*/
import './CreateListing.component.css'

/*
Children Components
*/
import CreateListingForm from './CreateListingForm/CreateListingForm.component'
import Footer from '../footer/Footer.component';


/**
 * Create Listing Component
 */
class CreateListing extends Component {

    componentDidMount() {
        document.title = "Qchain - Create";
        window.scrollTo(0, 0);
    }

    render() {
        return (
            <div style={{ 'position': 'relative' }}>
                <div className='create-container'>
                    <CreateListingForm />
                </div>

                <br /><br /><br /><br /><br /><br /><br /><br /><br />

                <Footer />
            </div>
        )
    }
}


export default CreateListing;
