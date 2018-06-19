import React, { Component } from 'react';

import { SplitButton, MenuItem } from 'react-bootstrap';

class SortingSelector extends Component {

    constructor(props){
        super(props);
        this.state = {
            title: 'Price (Low - High)'
        }

        this.handleItemClick = this.handleItemClick.bind(this);
    }

    handleItemClick(value) {
        this.setState({ title : value})
    }

    render () {
        return <div>
        <SplitButton
            className='split-btn-marketing-type'
            title={this.state.title}
            pullRight
        >
            <MenuItem onClick={() => this.handleItemClick('Price (Low - High)')}>Price (Low - High)</MenuItem>
            <MenuItem onClick={() => this.handleItemClick('Price (High - Low)')}>Price (High - Low)</MenuItem>
            <MenuItem onClick={() => this.handleItemClick('Relevance')}>Relevance</MenuItem>
        </SplitButton>
    </div>
    }
}


export default SortingSelector;