// Initial state
const initialState = {
   fetching: false,
   fetched: false,
   db: {
       adListings: [],
       adspaceListings: [],
       advertiserDailyData: {
            Impressions: 0,
            Expenses: 0,
            Balance: 0,
            Impressions_trend: '0',
            Expenses_trend: '0',
            Balance_trend: '0'
       },
       publisherDailyData: {
            Impressions: 0,
            Revenue: 0,
            Balance: 0,
            Impressions_trend: '0',
            Revenue_trend: '0',
            Balance_trend: '0'
       },
       eqcImpressions:[[]],
       xqcImpressions:[[]],
       eqcClicks: [[]],
       xqcClicks: [[]]
   },
   isEmpty: false,
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
            let isEmpty = (action.payload.length === 0);
            return {
                ...state,
                fetching: false,
                fetched: true,
                db: action.payload,
                isEmpty
            }
        }
        default:
            return state;
    }
}

export default DatabaseReducer;
