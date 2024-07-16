import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import ListToDo from './components/ListToDo';
import CreateToDo from './components/CreateToDo';
import EditToDo from './components/EditToDo';

function App() {
  return (
    <Router>
      <div className="container mt-5">
        <header className="App-header">
          <h1 className="text-center">To-Do App</h1>
          <nav className="navbar navbar-light bg-light justify-content-end">
            <span className="navbar-brand mb-0 h1">To-Do List</span>
            <a href="/create" className="btn btn-primary">Create</a>
          </nav>
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
