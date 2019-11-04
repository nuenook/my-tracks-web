import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import {Provider} from 'react-redux';
import { createFirestoreInstance, getFirestore } from 'redux-firestore' // <- needed if using firestore
import { ReactReduxFirebaseProvider, getFirebase } from 'react-redux-firebase';
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import rootReducer from './redux/reducers';
import NavBars from './components/layout/Navbars';
import PrivateRoute from './route/PrivateRoute';
import routes from './route';
import AuthContextProvider from './contexts/AuthContext'
import fbConfig from './firebase';

const store = createStore(rootReducer,
  compose(
    applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore}))
  )
);

const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
}
const rrfProps = {
  firebase: fbConfig,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance // <- needed if using firestore
}

const App: React.FC = () => {
  return (
    <AuthContextProvider>
      <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
      <BrowserRouter>
        <NavBars />
        <div className="container">
          <Switch>
            {routes.map(route => {
              if (route.isPrivate){
              return <PrivateRoute key={route.path} {...route} />
              }
              else {
                return <Route key={route.path} {...route} />
              }
                
            })}
          </Switch>
        </div>
      </BrowserRouter>
      </ReactReduxFirebaseProvider>
      </Provider>
    </AuthContextProvider>
  );
}

export default App;
