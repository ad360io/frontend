import React from 'react';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';

const FormSubmitButton = ({className}) => (
    <Button color='primary' variant='raised' className={className}>Confirm</Button>
)

const mapStateToProps = (state) => {
    return {

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