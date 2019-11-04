import { INewProject } from '../../types/Project.type'
import actionTypes from '../../types/actions.type';

export const createProject = (project: INewProject) => {
    return (dispatch: any, getState: any, { getFirestore }: any) => {
        const firestore = getFirestore();
        const userId = getState().firebase.auth.uid;

        firestore.collection('projects').add({
            ...project,
            userId
        }).then(() => {
            dispatch({ type: actionTypes.PROJECT_CREATE_SUCCESS });
        }).catch((err: Error) => {
            dispatch({ type: actionTypes.PROJECT_CREATE_ERROR, payload: err.message });
        });

    }
}