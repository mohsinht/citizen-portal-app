    
import authReducer from './authReducer'
import complaintReducer from './complaintReducer'
import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase'
 
const rootReducer = combineReducers({
  auth: authReducer,
  complaint: complaintReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
});

export default rootReducer;