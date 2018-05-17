import { createStore } from 'redux';
import RootReducer from '../reducers/RootReducer';


/**
 * Initialization of the Redux Store
 * provided with organized reducers.
 */

const store = createStore(
    RootReducer
);


export default store;