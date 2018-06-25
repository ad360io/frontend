/*
Core Libs
*/
import React from 'react';
import { connect } from 'react-redux'

/*
Material UI
*/
import Button from '@material-ui/core/Button';


const FormConfirmation = ({ modeFilter }) => (
    <div>
        <Button type='submit'
            className='control-form-submit btn-lg btn-primary'
            onClick={null}
            disabled
        >
            {modeFilter === 'Publisher' ? 'Post Listing' : 'Request Listing'}
        </Button>
    </div>
)

const mapStateToProps = (state) => {
    return {
        modeFilter: state.MenuBarFilterReducer.modeFilter
    }
}

const mapDispatchToProps = (dispatch) => {
    return {}
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FormConfirmation);