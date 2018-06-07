/*
Core Libs
*/
import React, { Component } from 'react';

/*
React Bootstrap
*/
import { FormGroup, FormControl } from 'react-bootstrap';


class MarketingTypeDropdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedMedium: '',
            selectedType: 'Sponsorship'
        }
        this.showMedium = this.showMedium.bind(this);
        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.handleMediumChange = this.handleMediumChange.bind(this);
    }

    handleMediumChange (event) {
        this.setState({
            ...this.state,
            selectedMedium: event.target.value
        })            
    }

    handleTypeChange (event) {
        if(event.target.value === 'Sponsorship'){
            this.setState({
                selectedMedium: '',
                selectedType: event.target.value
            })
        }else{
            this.setState({
                ...this.state,
                selectedType: event.target.value
            })
        }
        
    }

    showMedium() {
        if (this.state.selectedType === 'Branded Content') {
            return <FormGroup controlId='control-form-genre'>
                    <p className='control-label'>*Select Medium</p>
                    <FormControl 
                        componentClass='select' 
                        onChange={this.handleMediumChange}
                        required
                    >
                        <option value='Written Post'>Written Post</option>
                        <option value='Podcast'>Podcast</option>
                        <option value='Video'>Video</option>
                        <option value='Other'>Other</option>
                    </FormControl>
            </FormGroup>
        }else if (this.state.selectedType === 'Influencer Post'){
            return <FormGroup controlId='control-form-genre'>
                <p className='control-label'>*Select Medium</p>
                <FormControl 
                    componentClass='select'
                    onChange={this.handleMediumChange}
                    required
                >
                    <option value='Tweet'>Tweet</option>
                    <option value='Instagram'>Instagram</option>
                    <option value='Twitch'>Twitch</option>
                    <option value='Youtube'>Youtube</option>
                    <option value='Facebook'>Facebook</option>
                    <option value='Twitter'>Twitter</option>
                    <option value='Niconico'>Niconico</option>
                    <option value='Other'>Other </option>
                </FormControl>
            </FormGroup>

        }else {
            return null;
        }
    }

    render () {
        return <div>
            <FormGroup controlId='control-form-genre'>
                <p className='control-label'>*Select Authentic Marketing Type</p>
                <FormControl componentClass='select' onChange={this.handleTypeChange} required>
                    <option value='Sponsorship'>Sponsorship</option>
                    <option value='Branded Content'>Branded Content</option>
                    <option value='Influencer Post'>Influencer Post</option>
                </FormControl>
                </FormGroup>

            {this.showMedium()}
        </div>
    }
}


export default MarketingTypeDropdown;