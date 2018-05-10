/*
Redux Libs
*/
import { combineReducers } from 'redux';

/*
Other Reducers
*/
import MenuBarFilterReducer     from './MenuBarFilterReducer';
import MarketplaceFilterReducer from './MarketplaceFilterReducer'


/**
 * Organize and combine all reducers
 * All new reducers must be added to rootReducer to be accessed by store
 */
const RootReducer = combineReducers({
    MenuBarFilterReducer,
    MarketplaceFilterReducer
})


export default RootReducer;