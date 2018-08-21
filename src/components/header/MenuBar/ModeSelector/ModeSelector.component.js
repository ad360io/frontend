/*
Core Libs
*/
import React from 'react';
import { connect } from 'react-redux';

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

    handleModeClick = (mode) => {
        this.props.onModeClick(mode);
        const { patchUserMetadata } = this.props.auth;
        let newMetadata = { mode };
        patchUserMetadata(newMetadata);
    }

    render() {

        return <ButtonGroup bsSize='small' className='mode-selector'>
            <Button
                active={this.props.modeFilter === 'Advertiser'}
                onClick={() => this.handleModeClick('Advertiser')}
                style={{ width: 98 }}
            >
                an advertiser
            </Button>
            <Button
                active={this.props.modeFilter === 'Publisher'}
                onClick={() => this.handleModeClick('Publisher')}
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

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ModeSelector);