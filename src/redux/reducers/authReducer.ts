
import actionTypes, {IActionType} from '../../types/actions.type'

export const initStates = {
    authError: ""
}


const authReducer = (state = initStates, action: IActionType) => {
    switch(action.type) {
        case actionTypes.SIGN_IN_SUCCESS: 
            return {
                ...state,
                authError: ""
            }
        case actionTypes.SIGN_IN_ERROR:
            console.log('login error');
            alert(action.payload)
            return {
              ...state,
              authError: action.payload
            }
        default: 
            return state
    }
}

export default authReducer;