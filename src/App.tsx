import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBars from './components/layout/Navbars';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import CreatePage from './pages/CreatePage';
import HomePage from './pages/HomePage';
import ReportPage from './pages/ReportPage';
import { AuthProvider } from './route/AuthRoute';
import PrivateRoute from './route/PrivateRoute';
import LoginPage from './pages/LoginPage';
import LogoutPage from './pages/LogoutPage'

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <NavBars />
        <div className="container">
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <PrivateRoute exact path="/create" component={CreatePage} />
            <Route path="/report">
              <ReportPage />
            </Route>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route exact path="/logout" component={LogoutPage} />
          </Switch>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
