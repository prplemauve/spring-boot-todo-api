import React from 'react';
import './App.css'; 
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import ListToDo from './components/ListToDo';
import CreateToDo from './components/CreateToDo';
import EditToDo from './components/EditToDo';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1 className="text-center">To-Do List</h1>
        </header>
        <main className="mt-4">
          <Switch>
            <Route exact path="/" component={ListToDo} />
            <Route exact path="/create" component={CreateToDo} />
            <Route exact path="/edit/:id" component={EditToDo} />
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
