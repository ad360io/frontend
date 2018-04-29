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
 * Export to be used by redux store
 */
const rootReducer = combineReducers({
    SampleReducer
})


export default rootReducer;