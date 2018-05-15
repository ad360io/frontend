// Default state
const defaultState = {
    profile: {
        name: 'User Name',
        nickname: 'Nickname',
        email: 'Email',
        avatar_url: '' 
    }
}

/**
 * Example to build a simple reducer.
 * @param {*} state   Current state fetched from the store.
 * @param {*} action  String or Enumerators to represent the desired operations.
 */
const ProfileReducer = (state=defaultState, action) => {
    
    switch(action.type)
    {
        case 'SET_PROFILE':
            return {
                ...state,
                profile: action.value
            };
                   
        default:
            return state;
    }
}


export default ProfileReducer;