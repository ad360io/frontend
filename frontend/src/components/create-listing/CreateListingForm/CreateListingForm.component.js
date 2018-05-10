/*
Core Libs
*/
import React, { Component } from 'react';

/*
React Bootstrap Components
*/
import { FormGroup, Button, HelpBlock, FormControl } from 'react-bootstrap';

/*
Local CSS
*/
import './CreateListingForm.component.css';

class CreateListingForm extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            selectedGenre: 'Sponsorship'
        }
        this.decideTitle = this.decideTitle.bind(this);
        this.handleOnGenreChange = this.handleOnGenreChange.bind(this);
        this.showSubGenre = this.showSubGenre.bind(this);
    }

    decideTitle(){
        return (this.props.modeFilter === 'Advertiser' ? 'Ad' : 'Adspace')
    }

    handleOnGenreChange(event){
        this.setState({selectedGenre : event.target.value});
    }

    showSubGenre() {
        if (this.state.selectedGenre === 'Branded Content') {
            return <FormGroup controlId="control-form-genre">
                    <p className="control-label">*Select Sub-Category </p>
                    <FormControl componentClass="select" required>
                        <option value="Written Post">Written Post</option>
                        <option value="Podcast">Podcast</option>
                        <option value="Video">Video</option>
                        <option value="Other">Other</option>
                    </FormControl>
            </FormGroup>
        }else if (this.state.selectedGenre === 'Influencer Post'){
            return <FormGroup controlId="control-form-genre">
                <p className="control-label">*Select Sub-Category</p>
                <FormControl componentClass="select" required>
                    <option value="Tweet">Tweet</option>
                    <option value="Instagram">Instagram</option>
                    <option value="Twitch">Twitch</option>
                    <option value="Youtube">Youtube</option>
                    <option value="Facebook">Facebook</option>
                    <option value="Twitter">Twitter</option>
                    <option value="Niconico">Niconico</option>
                    <option value="Other">Other </option>
                </FormControl>
            </FormGroup>

        }else {
            return null;
        }
    }


    render() {
        return <div className="create-listing-form-container">
            <h2 className="create-listing-form-title">Create an {this.decideTitle()} Listing</h2>

            <form className="create-form">
                <FormGroup controlId='control-form-title'>
                    <p className="control-label">{'*'+this.decideTitle()+" Title"}</p>
                    <FormControl type="text" required />
                </FormGroup>
                <FormGroup controlId="control-form-genre">
                    <p className="control-label">*Select Genre</p>
                    <FormControl componentClass="select" onChange={this.handleOnGenreChange} required>
                        <option value="Sponsorship">Sponsorship</option>
                        <option value="Branded Content">Branded Content</option>
                        <option value="Influencer Post">Influencer Post</option>
                    </FormControl>
                </FormGroup>

                {this.showSubGenre()};

                <FormGroup controlId='control-form-image'>
                    <p className="control-label">{this.decideTitle() + " Image (optional)"}</p>
                    <FormControl type="file" />
                    <HelpBlock>Don't mess up your first impression!</HelpBlock>
                </FormGroup>    
                <FormGroup controlId="control-form-pitch">
                    <p className="control-label">Pitch (optional)</p>
                    <FormControl componentClass="textarea" 
                        placeholder="Show me your best pitch here!" 
                        maxLength={280} 
                        rows={8}
                        style={{resize: "vertical"}}/>
                </FormGroup>
                <Button type="submit" className="control-form-submit btn-lg btn-primary" disabled>Create</Button>
            </form>
        </div>;
    }
}
export default CreateListingForm;