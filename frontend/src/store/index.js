import { createStore } from 'redux';
import rootReducer from '../reducers/rootReducer';


/**
 * Initialization of the Redux Store
 * provided with organized reducers.
 */
const store = createStore(rootReducer);


export default store;