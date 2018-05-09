// Default state
const defaultState = {
   isDrawerOpen: true,
   sliderValue: 50,
   adGenre: 'Show All'
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
                isDrawerOpen: true
            };
        
        case 'CLOSE_DRAWER':
            return {
                ...state,
                isDrawerOpen: false
            }

        case 'TOGGLE_DRAWER':
            return {
                ...state,
                isDrawerOpen: !state.open
            }

        case 'SET_DRAWER':
            return {
                ...state,
                isDrawerOpen: action.value
            }

        case 'SET_SLIDER_VALUE':
            return {
                ...state,
                sliderValue: action.value
            }
            
        case 'SET_AD_GENRE':
            return {
                ...state,
                adGenre: action.value
            }
        default:
            return state;
    }
}


export default MarketplaceDrawerReducer;