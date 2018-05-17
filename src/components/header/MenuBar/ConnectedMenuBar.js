import { connect } from 'react-redux';
import MenuBar     from './MenuBar.component';


const mapStateToProps = (state) => {
    return {
        modeFilter    : state.MenuBarFilterReducer.modeFilter,
        currencyFilter: state.MenuBarFilterReducer.currencyFilter,
        profile       : state.ProfileReducer.profile
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onModeClick: (mode)=>{
            dispatch({
                type: 'SET_MODE_FILTER',
                modeFilter: mode
            })
        },
        onCurrencyClick: (currency) => {
            dispatch({
                type: 'SET_CURRENCY_FILTER',
                currencyFilter: currency
            })
        }
    }
}

const ConnectedMenuBar = connect(
    mapStateToProps,
    mapDispatchToProps
)(MenuBar)


export default ConnectedMenuBar;