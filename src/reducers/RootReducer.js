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


/**
 * Organize and combine all reducers
 * All new reducers must be added to RootReducer to be accessed by store
 */
const RootReducer = combineReducers({
    MenuBarFilterReducer,
    MarketplaceFilterReducer,
    ProfileReducer
})


export default RootReducer;
