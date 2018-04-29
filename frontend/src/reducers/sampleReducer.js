/**
 * Example to build a simple reducer.
 * @param {*} state   Current state fetched from the store.
 * @param {*} action  String or Enumerators to represent the desired operations.
 */
const SampleReducer = (state={}, action) => {
    
    switch(action.type)
    {
        case 'SAMPLE_TOGGLE':
            return {
                ...state,
                sampleAction: !state.sampleAction
            };

        case 'SAMPLE_START':
            return {
                ...state,
                sampleAction: true
            }

        default:
            return state;
    }
}


export default SampleReducer;