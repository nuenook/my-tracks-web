import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBars from './components/layout/Navbars';
import PrivateRoute from './route/PrivateRoute';
import routes from './route';
import { AuthProvider } from './route/AuthRoute'

const App: React.FC = () => {
  return (
    <AuthProvider>
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
    </AuthProvider>
  );
}

export default App;
