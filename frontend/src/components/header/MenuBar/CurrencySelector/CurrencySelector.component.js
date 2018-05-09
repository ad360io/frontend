import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';

/*
Setting up a Button Component that is responsible to dispatch currency mode action
*/
const mapStateToProps = (state, ownProps) => {
    return {
        active: ownProps.currency === state.MenuBarFilterReducer.currencyFilter
    }
}
const mapDispathToProps = (dispatch, ownProps) => {
    return {
        onClick: () => {
            dispatch({
                type: 'SET_CURRENCY_FILTER',
                currencyFilter: ownProps.currency
            })
        }
    }
}
const CurrencySelector = connect(
    mapStateToProps,
    mapDispathToProps
)(Button);


export default CurrencySelector;