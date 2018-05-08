// Default state
const defaultState = {
   open: true,
   sliderValue: 50
}

/**
 * Example to build a simple reducer.
 * @param {*} state   Current state fetched from the store.
 * @param {*} action  String or Enumerators to represent the desired operations.
 */
const MarketplaceDrawerReducer = (state=defaultState, action) => {
    
    switch(action.type)
    {
        case 'OPEN_DRAWER':
            return {
                ...state,
                open: true
            };
        
        case 'CLOSE_DRAWER':
            return {
                ...state,
                open: false
            }

        case 'TOGGLE_DRAWER':
            return {
                ...state,
                open: !state.open
            }

        case 'SET_DRAWER':
            return {
                ...state,
                open: action.value
            }

        case 'SET_SLIDER_VALUE':
            return {
                ...state,
                sliderValue: action.value
            }
            
        default:
            return state;
    }
}


export default MarketplaceDrawerReducer;