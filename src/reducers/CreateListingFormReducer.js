/** DEFAULT STATE */
const defaultState = {
    advertiserForm: {
        marketingType: '',
        marketingMedium: '',
        description: '',
        topic: '',
        imgFile: null,
    },
    publisherForm: {
        marketingType: '',
        marketingMedium: '',
        description: '',
        topic: '',
        imgFile: null,
        price: '',
        timeUnit: 'per day',
        dateFrom: undefined,
        dateTo: undefined,
    }
}

/**
 * MenuBar Filter Reducer
 *      manipulate the unit of currency,
 *      manipulate the mode of user.
 * @param { Object } state   Current state fetched from the store.
 * @param { Object } action  String or Enumerators to represent the desired operations.
 */
const CreateListingFormReducer = (state = defaultState, action) => {

    switch (action.type) {
        case 'SET_ADV_FORM_MARKETING_TYPE':
            return {
                ...state,
                advertiserForm: {
                    ...state.advertiserForm,
                    marketingType: action.marketingType,
                }
            };

        case 'SET_ADV_FORM_MARKETING_MEDIUM':
            return {
                ...state,
                advertiserForm: {
                    ...state.advertiserForm,
                    marketingMedium: action.marketingMedium,
                }
            }

        case 'SET_ADV_FORM_DESCRIPTION':
            return {
                ...state,
                advertiserForm: {
                    ...state.advertiserForm,
                    description: action.description,
                }
            }

        case 'SET_ADV_FORM_TOPIC':
            return {
                ...state,
                advertiserForm: {
                    ...state.advertiserForm,
                    topic: action.topic,
                }
            }


        case 'SET_PUB_FORM_MARKETING_TYPE':
            return {
                ...state,
                publisherForm: {
                    ...state.publisherForm,
                    marketingType: action.marketingType,
                }
            };

        case 'SET_PUB_FORM_MARKETING_MEDIUM':
            return {
                ...state,
                publisherForm: {
                    ...state.publisherForm,
                    marketingMedium: action.marketingMedium,
                }
            }

        case 'SET_PUB_FORM_DESCRIPTION':
            return {
                ...state,
                publisherForm: {
                    ...state.publisherForm,
                    description: action.description,
                }
            }

        case 'SET_PUB_FORM_TOPIC':
            return {
                ...state,
                publisherForm: {
                    ...state.publisherForm,
                    topic: action.topic,
                }
            }

        case 'SET_PUB_FORM_DATE_RANGE':
            return {
                ...state,
                publisherForm: {
                    ...state.publisherForm,
                    dateTo: action.range.to,
                    dateFrom: action.range.from
                }
            }

        case 'SET_PUB_FORM_DATE_RESET':
            return {
                ...state,
                publisherForm: {
                    ...state.publisherForm,
                    dateTo: undefined,
                    dateFrom: undefined
                }
            }

        case 'SET_PUB_FORM_PRICE':
            return {
                ...state,
                publisherForm: {
                    ...state.publisherForm,
                    price: action.price,
                }
            }

        case 'SET_PUB_FORM_TIME_UNIT':
            return {
                ...state,
                publisherForm: {
                    ...state.publisherForm,
                    timeUnit: action.timeUnit,
                }
            }

        default:
            return state;
    }
}


export default CreateListingFormReducer;