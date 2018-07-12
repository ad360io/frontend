import React, { Component } from 'react';
import { connect }          from 'react-redux';

import axios from 'axios';

import Button from '@material-ui/core/Button';

class FormSubmitButton extends Component{
    constructor(props){
        super(props);
        this.handleSubmitClick = this.handleSubmitClick.bind(this);
        this.createPayload = this.createPayload.bind(this);
        this.state ={
            posted: false,
            finished: false,
            err: null,
        }
    }
    
    handleSubmitClick() {
        const listingURL = "https://qchain-marketplace-postgrest.herokuapp.com/listing";
        console.log(this.createPayload());
        axios.post(listingURL, this.createPayload())
                    .then((response) => {
                        console.log(response);
                    })
                    .catch((err) => {
                        console.log(err);
                    })
    }

    createPayload(){
        if(this.props.modeFilter === 'Advertiser'){
            return {
                id: 3,
                name: this.props.advertiserForm.topic,
                description: this.props.advertiserForm.description,
                subcategory: this.props.advertiserForm.marketingMedium,
                date_added: new Date().toISOString().slice(0, 10),
                expiration_date: null,
                url: null,
                price: null,
                currency: this.props.currencyFilter,
                type: this.props.advertiserForm.marketingType,
                classtype: "request",
                advertiser: "yao"
            } 
        }else {
            return {
                id: 4,
                name: this.props.publisherForm.topic,
                description: this.props.publisherForm.description,
                subcategory: this.props.publisherForm.marketingMedium,
                date_added: this.props.publisherForm.dateFrom,
                expiration_date: this.props.publisherForm.dateTo,
                url: null,
                price: this.props.publisherForm.price,
                currency: this.props.currencyFilter,
                type: this.props.publisherForm.marketingType,
                classtype: "listing",
                publisher: "yao"
            }
        }
        
    }

    render () {
        return <Button 
                color='primary' 
                variant='raised' 
                className={this.props.classname}
                onClick={()=> this.handleSubmitClick()}
            >
                Confirm
            </Button>
    }
}

const mapStateToProps = (state) => {
    return {
        modeFilter      : state.MenuBarFilterReducer.modeFilter,
        currencyFilter  : state.MenuBarFilterReducer.currencyFilter,
        advertiserForm  : state.CreateListingFormReducer.advertiserForm,
        publisherForm   : state.CreateListingFormReducer.publisherForm
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FormSubmitButton);