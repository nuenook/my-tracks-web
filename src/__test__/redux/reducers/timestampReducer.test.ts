
import timestampReducer, { initStates } from '../../../redux/reducers/timestampReducer';
import  actionTypes, { IActionType } from '../../../types/actions.type';

describe('timestampReducer ', () => {
    let actionTest: IActionType;
    beforeEach(() => {
        actionTest = {
            type: '@@INIT'
        }
    })
    it("store should set default state", () => {
        const state = timestampReducer(undefined, actionTest);

        expect(state).toEqual(initStates);
    })

    it("when create timestamp success", () => {
        const action = {
            type: actionTypes.TIMESTAMP_CREATE_SUCCESS
        };

        const state = timestampReducer(initStates, action);
        
        expect(state).toEqual(initStates);
    })

    it("when create timestamp error", () => {
        const action = {
            type: actionTypes.TIMESTAMP_CREATE_ERROR
        };

        const state = timestampReducer(initStates, action);

        expect(state).toEqual(initStates);
    })

    it("when delete timestamp success", () => {
        const action = {
            type: actionTypes.TIMESTAMP_DELETE_SUCCESS
        };

        const state = timestampReducer(initStates, action);
        
        expect(state).toEqual(initStates);
    })

    it("when delete timestamp error", () => {
        const action = {
            type: actionTypes.TIMESTAMP_DELETE_ERROR
        };

        const state = timestampReducer(initStates, action);

        expect(state).toEqual(initStates);
    })

    it("when select a timestamp, store sould save that timestamp' data", () => {
        const action = {
            type: actionTypes.TIMESTAMP_SELECT,
            payload: new Date()
        };

        const state = timestampReducer(initStates, action);

        expect(state).toEqual({...initStates, selectDate: action.payload});
    })
})