// Redux
import { applyMiddleware, createStore } from 'redux';
import thunk                            from 'redux-thunk';
import { createLogger }                 from 'redux-logger';

// Reducers
import RootReducer from '../reducers/RootReducer';

// Networking
import axios from 'axios';

// Middleware
const middleware = [ thunk ];
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}

// Store
const store = createStore(
    RootReducer,
    applyMiddleware(...middleware)
);

// Core dispatcher
var databaseDispatcher = () => {
    store.dispatch((dispatch) => {
        dispatch({type: 'FETCH_DATABASE_PENDING'})
        axios.get(`${window.location.protocol}//${window.location.host}/api/db`)
            .then((response) => {
                dispatch({
                    type: 'FETCH_DATABASE_FULFILLED',
                    payload: response.data
                })
            })
            .catch((err) => {
                dispatch({
                    type: 'FETCH_DATABASE_REJECTED',
                    payload: err
                })
            })
    })
}

// Register dispatcher every 10 minutes.
const tenMinutes = 1000 * 60 * 10;
setInterval(databaseDispatcher, tenMinutes);
databaseDispatcher();

export default store;
