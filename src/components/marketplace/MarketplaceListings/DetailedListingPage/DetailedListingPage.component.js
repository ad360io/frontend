import React, { Component } from 'react';
import axios from 'axios';

import './DetailedListingPage.component.css';


class DetailedListingPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fetched: false,
            error: null,
            listing: null
        }
    }
    
    componentWillMount() {
        // call on start load to get data
        const baseURL = "http://localhost:3000/api/listing?id=";
        axios.get(baseURL+this.props.match.params.id)
            .then((response) => {
                this.setState({
                    ...this.state,
                    fetched: true,
                    listing: response.data
                })
                console.log(this.state)
            })
            .catch((err) => {
                this.setState({
                    ...this.state,
                    fetched: true,
                    error: err
                })
                console.log(err)
                
        })
        // reset view
        window.scrollTo(0,0);
    }

    render() {
        // console.log(this.props.match.params.id)
        // make a request to get detailed listing info using ID
        // parse info onto the page
        return <div className='detailed-listing-container'>
            <p>I'm a detailed listing page</p>
            <p>ID = {this.props.match.params.id}</p>
        </div>
    }
}



export default DetailedListingPage;