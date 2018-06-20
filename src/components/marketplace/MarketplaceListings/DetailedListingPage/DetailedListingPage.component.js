import React, { Component } from 'react';
//import { connect } from 'react-redux';

class DetailedListingPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props.match.params.id)
        return <div>I'm a detailed listing page</div>
    }
}

export default DetailedListingPage;