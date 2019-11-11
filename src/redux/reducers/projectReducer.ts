import actionTypes, {IActionType} from '../../types/actions.type'

export const initState = {
    selectProject: ""
}

const projectReducer = (state = initState, action: IActionType) => {
  switch (action.type) {
    case actionTypes.PROJECT_CREATE_SUCCESS:
      console.log('create project success');
      return state;
    case actionTypes.PROJECT_CREATE_ERROR:
      console.log('create project error', action.payload);
      return state;
    case actionTypes.PROJECT_SELECT:
        return {...state, selectProject: action.payload}
    default:
      return state;
  }
};

export default projectReducer;