export interface IActionType {
    type: string;
    payload: object| string | boolean;
}

const actionTypes = {
    // auth
    SIGN_IN_SUCCESS: 'SIGN_IN_SUCCESS',
    SIGN_IN_ERROR: 'SIGN_IN_ERROR',
}

export default actionTypes;