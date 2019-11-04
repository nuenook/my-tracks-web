
import actionTypes from '../../types/actions.type'

const initStates = {
    authError: ""
}

interface actionType {
    type: string;
    payload: object| string | boolean;
}

const authReducer = (state = initStates, action: actionType) => {
    switch(action.type) {
        case actionTypes.SIGN_IN_SUCCESS: 
            return {
                ...state,
                authError: ""
            }
        case actionTypes.SIGN_IN_ERROR:
            console.log('login error');
            return {
              ...state,
              authError: 'Login failed'
            }
        default: 
            return state
    }
}

export default authReducer;