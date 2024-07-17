import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { Link } from 'react-router-dom';
import { FaCheck, FaTimes } from 'react-icons/fa';
import Toast from 'react-bootstrap/Toast';
import '../App.css';

const ListToDo = () => {
  const [todos, setTodos] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = () => {
    axios.get('/api/todos')
      .then(response => {
        setTodos(response.data);
      })
      .catch(error => {
        console.error('Error fetching todo list:', error);
      });
  };

  const handleDelete = (id) => {
    axios.delete(`/api/todos/${id}`)
      .then(response => {
        console.log('Deleted successfully:', response.data);
        fetchTodos();
        setToastMessage('Deleted successfully');
        setShowToast(true);
      })
      .catch(error => {
        console.error('Error deleting todo:', error);
      });
  };

  const handleStatus = (id, currentStatus) => {
    const updatedStatus = !currentStatus;
    axios.put(`/api/todos/${id}`, { isComplete: updatedStatus })
      .then(response => {
        console.log('Todo status updated successfully:', response.data);
        setTodos(todos.map(todo =>
          todo.id === id ? { ...todo, isComplete: updatedStatus } : todo
        ));
        setToastMessage(`Marked ${updatedStatus ? 'Complete' : 'Incomplete'}`);
        setShowToast(true);
      })
      .catch(error => {
        console.error('Error updating todo status:', error);
      });
  };

  const renderActionsDropdown = (id, currentStatus) => (
    <Dropdown as={ButtonGroup}>
      <Button variant="secondary" size="sm">Actions</Button>
      <Dropdown.Toggle split variant="secondary" id={`dropdown-split-basic-${id}`} size="sm" />

      <Dropdown.Menu>
        <Dropdown.Item as={Link} to={`/edit/${id}`}>Edit</Dropdown.Item>
        <Dropdown.Item onClick={() => handleStatus(id, currentStatus)}>
          {currentStatus ? 'Mark Incomplete' : 'Mark Complete'}
        </Dropdown.Item>
        <Dropdown.Item onClick={() => handleDelete(id)} className="text-danger">Delete</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );

  const renderStatusIcon = (isComplete) => (
    isComplete ? <FaCheck color="green" /> : <FaTimes color="red" />
  );

  return (
    <div className="container">
      <main className="mt-4">
        <nav>
          <Button variant="primary" as={Link} to="/create">Create New List</Button>
        </nav>
        <Toast show={showToast} onClose={() => setShowToast(false)} delay={10000} autohide className="bg-danger">
          <Toast.Header>
            <strong className="me-auto text-white">Todo Notification</strong>
          </Toast.Header>
          <Toast.Body className="text-white">{toastMessage}</Toast.Body>
        </Toast>
        <Table striped bordered hover size="sm" className="table-custom text-center">
          <thead>
            <tr>
              <th>Description</th>
              <th>Complete Check</th>
              <th>Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {todos.map(todo => (
              <tr key={todo.id}>
                <td>{todo.description}</td>
                <td>{renderStatusIcon(todo.isComplete)}</td>
                <td>{new Date(todo.updatedAt).toLocaleString()}</td>
                <td>{renderActionsDropdown(todo.id, todo.isComplete)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </main>
    </div>
  );
};

export default ListToDo;
