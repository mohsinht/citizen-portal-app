import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Dashboard from './components/dashboard/Dashboard';
import ComplaintDetails from './components/complaints/ComplaintDetails';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import AddComplaint from './components/complaints/AddComplaint'
import ChooseDept from './components/complaints/ChooseDept';
import viewcomplaints from './components/complaints/viewcomplaints';

function App() {
  return (
    <BrowserRouter>
        <div className="App">
        <Navbar />
        
        <Switch>
          <Route exact path='/' component = { Dashboard } ></Route>
          <Route path='/complaint/:id' component = { ComplaintDetails } ></Route>
          <Route path='/signin' component = { SignIn } ></Route>
          <Route path='/register' component = { SignUp } ></Route>
          <Route path='/add/:slug' component = { AddComplaint } ></Route>
          <Route path='/selectdepartment' component = { ChooseDept } ></Route>
          <Route path='/view' component = { viewcomplaints } ></Route>
        </Switch>

      </div>
    </BrowserRouter>
  );
}

export default App;
