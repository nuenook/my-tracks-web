import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBars from './components/layout/navbars';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import CreatePage from './pages/createPage';
import HomePage from './pages/homePage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <NavBars />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/create">
            <CreatePage />
          </Route>
        </Switch>

      </div>
    </BrowserRouter>
  );
}

export default App;
