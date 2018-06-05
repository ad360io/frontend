/*
Core Libs
*/
import React, { Component } from 'react';
import { connect }          from 'react-redux';

/*
React Bootstrap Components
*/
import { FormGroup, Button, HelpBlock, FormControl } from 'react-bootstrap';

/*
Local CSS
*/
import './CreateListingForm.component.css';

/*
Children Components
*/
import MarketingTypeDropdown from './MarketingTypeDropdown/MarketingTypeDropdown.component';

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
                <MarketingTypeDropdown />

                <FormGroup controlId='control-form-title'>
                    <p className='control-label'>
                        *Content Topic
                    </p>
                    <FormControl type='text' onChange={this.handleTopicChange} required />
                </FormGroup>
                
                <FormGroup controlId='control-form-pitch'>
                    <p className='control-label'>*{this.decideDescriptionLabel()} </p>
                    <FormControl componentClass='textarea'  
                        maxLength={280} 
                        rows={8}
                        style={{resize: 'vertical'}}
                        onChange={this.handleDescriptionChange}    
                        required
                    />
                </FormGroup>
                <FormGroup controlId='control-form-image'>
                    <p className='control-label'>
                        {/* {`${this.decideTitle()} Image (optional)`} */}
                    </p>
                    <FormControl type='file' />
                    <HelpBlock>Don't mess up your first impression!</HelpBlock>
                </FormGroup>    
                <Button type='submit' 
                    className='control-form-submit btn-lg btn-primary'
                    onClick={this.handleSubmitForm}
                    disabled
                >
                    {this.props.modeFilter==='Publisher' ? 'Post Listing': 'Request Listing'}
                </Button>
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