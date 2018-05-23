/*
Redux Libs
*/
import { combineReducers } from 'redux';

/*
Other Reducers
*/
import MenuBarFilterReducer     from './MenuBarFilterReducer';
import MarketplaceFilterReducer from './MarketplaceFilterReducer';
import ProfileReducer           from './ProfileReducer';
import DatabaseReducer          from './DatabaseReducer';


/**
 * Root Reducer
 *      organize and combine all reducers used,
 *      all new reducers must be added to RootReducer to be accessed by store.
 */
const RootReducer = combineReducers({
    MenuBarFilterReducer,
    MarketplaceFilterReducer,
    ProfileReducer,
    DatabaseReducer
})


export default RootReducer;
