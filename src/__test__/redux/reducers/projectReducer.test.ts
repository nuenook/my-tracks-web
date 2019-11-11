import projectReducer, { initState } from '../../../redux/reducers/projectReducer';
import  actionTypes, { IActionType } from '../../../types/actions.type';

describe('projectReducer ', () => {
    let actionTest: IActionType;
    beforeEach(() => {
        actionTest = {
            type: '@@INIT'
        }
    })
    it("store should set default state", () => {
        const state = projectReducer(undefined, actionTest);

        expect(state).toEqual(initState);
    })

    it("when create project success", () => {
        const action = {
            type: actionTypes.PROJECT_CREATE_SUCCESS
        };

        const state = projectReducer(initState, action);
        
        expect(state).toEqual(initState);
    })

    it("when create project error, should get error message", () => {
        const action = {
            type: actionTypes.PROJECT_CREATE_ERROR,
            payload: "server error"
        };

        const state = projectReducer(initState, action);

        expect(state).toEqual(initState);
    })

    it("when select a project, store sould save data of a project", () => {
        const action = {
            type: actionTypes.PROJECT_SELECT,
            payload: {
                id: "p-111",
                projectName: "my fit app"
            }
        };

        const state = projectReducer(initState, action);

        expect(state).toEqual({...initState, selectProject: action.payload});
    })
})