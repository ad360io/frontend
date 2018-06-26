/** DEFAULT STATE */
const defaultState = {
    marketingType   : '',         
    marketingMedium : '',
    description: '',
    topic: '',
    imgFile: null,
}

/**
 * MenuBar Filter Reducer
 *      manipulate the unit of currency,
 *      manipulate the mode of user.
 * @param { Object } state   Current state fetched from the store.
 * @param { Object } action  String or Enumerators to represent the desired operations.
 */
const CreateListingFormReducer = (state=defaultState, action) => {
    
    switch(action.type)
    {
        case 'SET_MARKETING_TYPE':
            return {
                ...state,
                marketingType: action.marketingType,
            };
        
        case 'SET_MARKETING_MEDIUM':
            return {
                ...state,
                marketingMedium: action.marketingMedium,
            }

        case 'SET_DESCRIPTION':
            return {
                ...state,
                description: action.description,
            }
            
        case 'SET_TOPIC': 
            return {
                ...state,
                topic: action.topic,
            }

        default:
            return state;
    }
}


export default CreateListingFormReducer;