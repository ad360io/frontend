import { connect }         from 'react-redux';
import MarketplaceListings from './MarketplaceListings.component';

const mapStateToProps = (state) => {
    return {
        currencyFilter: state.MenuBarFilterReducer.currencyFilter,
        modeFilter    : state.MenuBarFilterReducer.modeFilter,
        budgetFilter  : state.MarketplaceFilterReducer.budgetFilter,
        adGenreFilter : state.MarketplaceFilterReducer.adGenreFilter
    }
}

const mapDispatchToProps = (dispatch) => {
    return {}
}

const ConnectedMarketplaceListings = connect(
    mapStateToProps,
    mapDispatchToProps
)(MarketplaceListings)

export default ConnectedMarketplaceListings;