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
import MarketingTypeDropdown from './MarketingTypeDropdown/MarketingTypeDropdown.component';
import AvailabilityPicker    from './AvailabilityPicker/AvailabilityPicker.component';

/*
Material UI
*/
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';


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
        const labelStyle = {
            lable: {
                fontSize: '30px'
            }
        }
        return <div className='create-listing-form-container'>
            <h2 className='create-listing-form-title'>{this.decideFormTitle()}</h2>

            <form className='create-form'> 
                <FormGroup hidden={this.props.modeFilter==='Advertiser'}>
                    <p className='control-label'>
                        *Select Promotion Duration
                    </p>
                    <AvailabilityPicker />
                </FormGroup>

                <MarketingTypeDropdown />

                <FormGroup controlId='control-form-topic'>
                    <p className='control-label'>
                        *Content Topic
                    </p>
                    <FormControl type='text' onChange={this.handleTopicChange} required />
                </FormGroup>

                 <FormGroup controlId='control-form-price' hidden={this.props.modeFilter==='Advertiser'}>
                    <p className='control-label'>
                        *Price per time unit (day/week/month/year)
                    </p>
                    <FormControl type='number' style={{width: '50%', float: 'left'}} />
                    <FormControl componentClass='select' style={{width: '50%'}} required>
                        <option value='day'>per day</option>
                        <option value='week'>per week</option>
                        <option value='month'>per month</option>
                        <option value='year'>per year</option>
                    </FormControl>
               
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

                <FormGroup controlId='control-form-image' hidden={this.props.modeFilter === 'Publisher'}>
                    <p className='control-label'>
                        Content Samples and Inspiration (optional)
                    </p>
                    <FormControl type='file' />
                </FormGroup>  

                <FormGroup controlId='control-form-additional' hidden={this.props.modeFilter === 'Advertiser'}>
                    <p className='control-label noselect'>
                        Additional Services (optional)
                    </p>
                    <div style={{width: '10%', float: 'left'}}>
                        <Checkbox color="default"/>
                    </div>
                    <div style={{width: '90%', height: '48px', marginTop: '9px'}}>Banner</div>

                    <div style={{width: '10%', float: 'left'}}>
                        <Checkbox color="default"/>
                    </div>
                    <div style={{width: '90%', height: '48px', marginTop: '9px'}}>Fullscreen Overlay</div>

                    <div style={{width: '10%', float: 'left'}}>
                        <Checkbox color="default"/>
                    </div>
                    <div style={{width: '90%', height: '48px', marginTop: '9px'}}>Custom Art</div>

                     <div style={{width: '10%', float: 'left'}}>
                        <Checkbox color="default"/>
                    </div>
                    <div style={{width: '90%', height: '48px', marginTop: '9px'}}>Other</div>
                
                </FormGroup>    

                <FormGroup controlId='control-form-referral' hidden={this.props.modeFilter === 'Advertiser'}>
                    <p className='control-label'>
                        Referral URI (optional)
                    </p>
                    <FormControl type='text' />
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