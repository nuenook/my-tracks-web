import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase'
import authReducer from './authReducer';
import timestampReducer from './timestampReducer';
import projectReducer from './projectReducer'

const rootReducer = combineReducers({
    firestore: firestoreReducer,
    firebase: firebaseReducer,
    auth: authReducer,
    project: projectReducer,
    timestamp: timestampReducer
})

export default rootReducer