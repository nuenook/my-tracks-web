import Redux from 'redux';
import {ICred} from '../../types/auth.type'
import actionTypes from '../../types/actions.type'
export const signIn = (credentials: ICred) => {
    return (dispatch: Redux.Dispatch<Redux.Action>, getState: any, {getFirebase}: any) => {
      const firebase = getFirebase();
      
      firebase.auth().signInWithEmailAndPassword(
        credentials.email,
        credentials.password
      ).then(() => {
        dispatch({ type: actionTypes.SIGN_IN_SUCCESS });
      }).catch((err: Error) => {
        dispatch({ type: actionTypes.SIGN_IN_ERROR, err });
      });
  
    }
  }