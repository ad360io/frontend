/** DEFAULT STATE */
const defaultState = {
    advertiserForm : {
        marketingType   : '',         
        marketingMedium : '',
        description: '',
        topic: '',
        imgFile: null,
    },
    publisherForm : {
        marketingType   : '',         
        marketingMedium : '',
        description: '',
        topic: '',
        imgFile: null,
    }
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
        case 'SET_ADV_FORM_MARKETING_TYPE':
            return {
                ...state,
                advertiserForm : {
                    ...state.advertiserForm,
                    marketingType: action.marketingType,
                }
            };
        
        case 'SET_ADV_FORM_MARKETING_MEDIUM':
            return {
                ...state,
                advertiserForm : {
                    ...state.advertiserForm,
                    marketingMedium: action.marketingMedium,
                }
            }

        case 'SET_ADV_FORM_DESCRIPTION':
            return {
                ...state,
                advertiserForm : {
                    ...state.advertiserForm,
                    description: action.description,
                }
            }
            
        case 'SET_ADV_FORM_TOPIC': 
            return {
                ...state,
                advertiserForm : {
                    ...state.advertiserForm,
                    topic: action.topic,
                }
            }

        default:
            return state;
    }
}


export default CreateListingFormReducer;