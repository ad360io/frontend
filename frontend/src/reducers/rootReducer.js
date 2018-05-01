/*
Redux Libs
*/
import { combineReducers } from 'redux';

/*
Other Reducers
*/
import SampleReducer       from './sampleReducer';


/**
 * Organize and combine all reducers
 * All new reducers must be added to rootReducer to be accessed by store
 */
const rootReducer = combineReducers({
    SampleReducer
})


export default rootReducer;