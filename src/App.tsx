import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBars from './components/layout/Navbars';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import CreatePage from './pages/CreatePage';
import HomePage from './pages/HomePage';
import ReportPage from './pages/ReportPage';

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
          <Route path="/report">
            <ReportPage />
          </Route>
        </Switch>

      </div>
    </BrowserRouter>
  );
}

export default App;
