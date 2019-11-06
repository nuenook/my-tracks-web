
import actionTypes, {IActionType} from '../../types/actions.type'

const initStates = {
    selectDate: new Date()
}


const timestampReducer = (state = initStates, action: IActionType) => {
    switch (action.type) {
        case actionTypes.TIMESTAMP_CREATE_SUCCESS:
            console.log('create timestamp success');
            return state;
        case actionTypes.TIMESTAMP_CREATE_ERROR:
            console.log('create timestamp error', action.payload);
            return state;
        case actionTypes.TIMESTAMP_SELECT:
            return {...state, selectDate: action.payload}
        case actionTypes.TIMESTAMP_DELETE_SUCCESS: 
            return state;
        case actionTypes.TIMESTAMP_DELETE_ERROR: 
            console.log("delete timestamp error: ", action.payload)
            return state;
        default:
            return state;
    }
}

export default timestampReducer;