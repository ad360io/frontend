// Default state
const defaultState = {
    currencyFilter : 'EQC', 
    modeFilter     : 'Advertiser'
}

/**
 * Example to build a simple reducer.
 * @param {*} state   Current state fetched from the store.
 * @param {*} action  String or Enumerators to represent the desired operations.
 */
const FilterReducer = (state=defaultState, action) => {
    
    switch(action.type)
    {
        case 'SET_CURRENCY_FILTER':
            return {
                ...state,
                currencyFilter: action.currencyFilter
            };
        
        case 'SET_MODE_FILTER':
            return {
                ...state,
                modeFilter: action.modeFilter
            }
            
        default:
            return state;
    }
}


export default FilterReducer;