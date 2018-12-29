/*
Core Libs
*/
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

/*
Local CSS
*/
import './ModeSelector.component.css';

/*
React Bootstrap
*/
import { ButtonGroup, Button } from 'react-bootstrap';
import { setMode } from '../../../../actions/HeaderActions';


class ModeSelector extends React.Component {
    render() {
        const { onModeClick } = this.props;
        return <ButtonGroup bsSize='small' className='mode-selector'>
            <Button
                active={this.props.modeFilter === 'Advertiser'}
                onClick={() => onModeClick('Advertiser')}
                style={{ width: 98 }}
            >
                an advertiser
            </Button>
            <Button
                active={this.props.modeFilter === 'Publisher'}
                onClick={() => onModeClick('Publisher')}
                style={{ width: 98 }}
            >
                a publisher
            </Button>
        </ButtonGroup>
    }
}

const mapStateToProps = (state) => {
    return {
        modeFilter: state.MenuBarFilterReducer.modeFilter
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onModeClick: (mode) => {
            dispatch(setMode(mode))
        },
    }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(ModeSelector));
