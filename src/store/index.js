import { createStore } from 'redux';
import RootReducer from '../reducers/RootReducer';


/**
 * Initialization of the Redux Store
 *      served with RootReducer, which has organized reducers for the application.
 */
const store = createStore(
    RootReducer
);


export default store;