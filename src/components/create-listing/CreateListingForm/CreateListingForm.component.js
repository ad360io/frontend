/*
Core Libs
*/
import React, { Component } from 'react';
import { connect }          from 'react-redux';

/*
React Bootstrap Components
*/
import { FormGroup, Button, FormControl } from 'react-bootstrap';

/*
Local CSS
*/
import './CreateListingForm.component.css';

/*
Children Components
*/
import RequiredFormFields from './RequiredFormFields/RequiredFormFields.component';
import OptionalFormFields from './OptionalFormFields/OptionalFormFields.component';

/*
Material UI
*/
import Checkbox from '@material-ui/core/Checkbox';


/**
 * Create Listing Form Component
 */
class CreateListingForm extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            description: '',
            topic: '',
        }

        this.handleTopicChange = this.handleTopicChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);

        this.decideFormTitle = this.decideFormTitle.bind(this);
        this.decideDescriptionLabel = this.decideDescriptionLabel.bind(this);
        
        this.handleSubmitForm = this.handleSubmitForm.bind(this);
    }

    decideFormTitle() {
        return (this.props.modeFilter === 'Advertiser' 
            ? 'Request Content Space Availability'
            : 'Create Content Space Listings'
        );
    }

    handleDescriptionChange(event) {
        this.setState({
            ...this.state,
            description: event.target.value
        })
        console.log(this.state)
    }

    handleTopicChange(event) {
        this.setState({
            ...this.state,
            topic: event.target.value
        })
    }

    handleSubmitForm(){
        // build URL to Postgrest
    }

    decideDescriptionLabel() {
        return (this.props.modeFilter === 'Advertiser' 
                    ? "Content Description"
                    : "Listing Description")
    }

    render() {
        return <div className='create-listing-form-container'>
            <h2 className='create-listing-form-title'>{this.decideFormTitle()}</h2>

            <form className='create-form'> 
                <RequiredFormFields 
                    handleDescriptionChange={this.handleDescriptionChange}
                    handleTopicChange={this.handleTopicChange}
                    decideDescriptionLabel={this.decideDescriptionLabel}
                />

                <OptionalFormFields />

            </form>
        </div>;
    }
}

const mapStateToProps = (state) => {
    return {
        modeFilter     : state.MenuBarFilterReducer.modeFilter,
        currencyFilter : state.MenuBarFilterReducer.currencyFilter
    }
}

const mapDispatchToProps = (dispatch) => {
    return {}
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateListingForm)