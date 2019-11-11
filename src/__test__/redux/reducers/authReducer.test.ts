import authReducer, { initStates } from '../../../redux/reducers/authReducer';
import  actionTypes, { IActionType } from '../../../types/actions.type';

describe('authReducer ', () => {
    let actionTest: IActionType;
    beforeEach(() => {
        actionTest = {
            type: '@@INIT'
        }
    })
    it("store should set default state", () => {
        const state = authReducer(undefined, actionTest);

        expect(state).toEqual(initStates);
    })

    it("when sign in with right access, login success", () => {
        const action = {
            type: actionTypes.SIGN_IN_SUCCESS
        };

        const state = authReducer(initStates, action);
        
        expect(state).toEqual(initStates);
    })

    it("when sign in error, should get error message", () => {
        const action = {
            type: actionTypes.SIGN_IN_ERROR,
            payload: "username when wrong"
        };

        const state = authReducer(initStates, action);

        expect(state).toEqual({...initStates, authError: action.payload});
    })
})