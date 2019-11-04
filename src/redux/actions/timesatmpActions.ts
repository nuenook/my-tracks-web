import { IAddProjectTime } from '../../types/projectTime.type'
import actionTypes from '../../types/actions.type';
import ToDayDate from '../../utils/ToDayDate';

export const createProjectTimestamp = (projectTime: IAddProjectTime) => {
    return (dispatch: any, getState: any, { getFirestore }: any) => {
        const firestore = getFirestore();
        const userId = getState().firebase.auth.uid;

        firestore.collection('timestamps').add({
            ...projectTime,
            onDay: ToDayDate(projectTime.timestamp),
            userId
        }).then(() => {
            dispatch({ type: actionTypes.TIMESTAMP_CREATE_SUCCESS });
        }).catch((err: Error) => {
            dispatch({ type: actionTypes.TIMESTAMP_CREATE_ERROR, payload: err.message });
        });

    }
}

export const deleteProjectTimestamp = (timestampId: string) => {
    return (dispatch: any, getState: any, { getFirestore }: any) => {
        const firestore = getFirestore();

        firestore.collection('timestamps').doc(timestampId).delete().then(() => {
            dispatch({ type: actionTypes.TIMESTAMP_DELETE_SUCCESS });
        }).catch((err: Error) => {
            dispatch({ type: actionTypes.TIMESTAMP_DELETE_ERROR, payload: err.message });
        });

    }
}

export const selectCurrentDate = (selectDate: Date) => {
    return (dispatch: any) => dispatch({ type: actionTypes.TIMESTAMP_SELECT, payload: selectDate });
}