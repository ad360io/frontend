/*
Core Libs
*/
import React, { Component } from 'react';

/*
React Bootstrap
*/
import { FormGroup, FormControl } from 'react-bootstrap';
import { Button, ButtonGroup } from 'react-bootstrap';

/*
Local CSS
*/
import './MarketingTypeDropdown.component.css';

class MarketingTypeDropdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedMedium: '',
            selectedType: ''
        }
        this.showMedium = this.showMedium.bind(this);
        this.handleTypeClick = this.handleTypeClick.bind(this);
        this.handleMediumChange = this.handleMediumChange.bind(this);
    }

    handleMediumChange(event) {
        this.setState({
            ...this.state,
            selectedMedium: event.target.value
        })
    }

    handleTypeClick(value) {
        if (value === 'Sponsorship') {
            this.setState({
                selectedMedium: '',
                selectedType: value
            })
        } else {
            this.setState({
                ...this.state,
                selectedType: value
            })
        }

    }

    showMedium() {
        if (this.state.selectedType === 'Branded Content' || this.state.selectedType === 'Patron Journalism') {
            return <FormGroup controlId='control-form-genre'>
                <p className='control-label'>Select Medium</p>
                <FormControl
                    componentClass='select'
                    onChange={this.handleMediumChange}
                    required
                >
                    <option value='Written Post'>Written Piece</option>
                    <option value='Podcast'>Audio Piece</option>
                    <option value='Video'>Video Piece</option>
                    <option value='Other'>Other</option>
                </FormControl>
            </FormGroup>
        } else if (this.state.selectedType === 'Influencer Post') {
            return <FormGroup controlId='control-form-genre'>
                <p className='control-label'>Select Medium</p>
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

        } else {
            return null;
        }
    }

    render() {
        return <div>
            <p className='marketing-type-selector-title'>Select Authentic Marketing Type</p>
            <ButtonGroup style={{marginBottom: '25px'}} justified >
                <Button
                    className='btn-marketing-type-selector'
                    onClick={() => this.handleTypeClick('Branded Content')}
                    active={this.state.selectedType === 'Branded Content'}
                    href="#"
                >
                    Branded Content
                </Button>
                <Button
                    className='btn-marketing-type-selector'
                    onClick={() => this.handleTypeClick('Influencer Post')}
                    active={this.state.selectedType === 'Influencer Post'}
                    href="#"
                >
                    Influencer Post
                </Button>
                <Button
                    className='btn-marketing-type-selector'
                    onClick={() => this.handleTypeClick('Sponsorship')}
                    active={this.state.selectedType === 'Sponsorship'}
                    href="#"
                >
                    Sponsorship
                </Button>
                <Button
                    className='btn-marketing-type-selector'
                    onClick={() => this.handleTypeClick('Patron Journalism')}
                    active={this.state.selectedType === 'Patron Journalism'}
                    href="#"
                >
                    Patron Journalism
                </Button>
            </ButtonGroup>
            {this.showMedium()}
        </div>
    }
}


export default MarketingTypeDropdown;