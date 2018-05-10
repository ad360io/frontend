import { connect }       from 'react-redux';
import CreateListingForm from './CreateListingForm.component'

const mapStateToProps = (state) => {
    return {
        modeFilter     : state.MenuBarFilterReducer.modeFilter,
        currencyFilter : state.MenuBarFilterReducer.currencyFilter
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

const ConnectedCreateListingForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateListingForm)


export default ConnectedCreateListingForm;