/*
Redux Libs
*/
import { combineReducers } from 'redux';

/*
Other Reducers
*/
import SampleReducer            from './sampleReducer';
import FilterReducer            from './FilterReducer';
import MarketplaceDrawerReducer from './MarketplaceDrawerReducer'


/**
 * Organize and combine all reducers
 * All new reducers must be added to rootReducer to be accessed by store
 */
const RootReducer = combineReducers({
    SampleReducer,
    FilterReducer,
    MarketplaceDrawerReducer
})


export default RootReducer;