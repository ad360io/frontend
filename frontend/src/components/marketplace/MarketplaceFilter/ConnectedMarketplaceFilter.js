import { connect }       from 'react-redux';
import MarketplaceFilter from './MarketplaceFilter.component'

const mapStateToFilterProps = (state) => {
    return {
        budgetFilter : state.MarketplaceFilterReducer.budgetFilter,
        activeTypes  : state.MarketplaceFilterReducer.activeTypes,
        isDrawerOpen : state.MarketplaceFilterReducer.isDrawerOpen,
        currency     : state.MenuBarFilterReducer.currencyFilter,
        adGenreFilter: state.MarketplaceFilterReducer.adGenreFilter
    }
}

const mapDispatchToFilterProps = (dispatch) => {
    return {
        onSliderChange:(event, budgetFilter)=>{
            dispatch({
                type:"SET_BUDGET_VALUE",
                value: budgetFilter
            })
        },
        onDrawerRequestChange: (open)=>{
            dispatch({
                type: 'SET_DRAWER',
                value: open
            })
        },
        onAdGenreClick: (adGenre) => {
            dispatch({
                type: 'SET_AD_GENRE',
                value: adGenre
            })
        },
        closeDrawer: () => {
            dispatch({
                type: 'CLOSE_DRAWER'
            })
        },
        openDrawer: () => {
            dispatch({
                type: 'OPEN_DRAWER'
            })
        }
    }
}

const ConnectedMarketplaceFilter = connect(
    mapStateToFilterProps,
    mapDispatchToFilterProps
)(MarketplaceFilter)


export default ConnectedMarketplaceFilter;