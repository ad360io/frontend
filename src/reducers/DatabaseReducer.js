// Initial state
const initialState = {
   fetching: false,
   fetched: false,
   db: {},
   error: null
}


/**
 *  Core database reducer.
 *  Fetches data from the database and updates the state.
 */
const DatabaseReducer = (state=initialState, action) => {

    switch(action.type) {
        case 'FETCH_DATABASE_PENDING': {
            return {
                ...state,
                fetching: true
            }
        }
        case 'FETCH_DATABASE_REJECTED': {
            return {
                ...state,
                fetching: false,
                error: action.payload
            }
        }
        case 'FETCH_DATABASE_FULFILLED': {
            return {
                ...state,
                fetching: false,
                fetched: true,
                db: action.payload
            }
        }
        default:
            return state;
    }
}

export default DatabaseReducer;
