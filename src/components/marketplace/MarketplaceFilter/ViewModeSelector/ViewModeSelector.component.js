/*
Core Libs
*/
import React, { Component } from 'react';
import { connect } from 'react-redux';

/*
React Bootstrap
*/
import { Button, ButtonGroup } from 'react-bootstrap';

/*
Action
*/
import { setViewMode } from '../../../../actions/MarketplaceActions';


class ViewModeSelector extends Component {
    render() {
        return <ButtonGroup
            style={{
                display: this.props.decideHidden(), 
                marginLeft:'25px', 
                marginBottom:'5%',
            }}
        >
            <Button 
                style={{
                    paddingLeft: '25px',
                    paddingRight: '25px'
                }}
                active={this.props.viewModeFilter === 'Grid'}
                onClick={()=>this.props.onViewModeClick('Grid')}
            >
                    <i className="fas fa-th-large"></i>Grid
            </Button>
            <Button 
                style={{
                    paddingRight: '18px'
                }}
                active={this.props.viewModeFilter === 'Listing'}
                onClick={()=>this.props.onViewModeClick('Listing')}
            >
                <i className="fas fa-align-justify"></i>Listing
            </Button>
        </ButtonGroup>
    }
}

const mapStateToProps = (state) => {
    return {
        viewModeFilter: state.MarketplaceFilterReducer.viewModeFilter
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onViewModeClick: (viewModeFilter) => {
            dispatch(setViewMode(viewModeFilter))
        }
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ViewModeSelector);