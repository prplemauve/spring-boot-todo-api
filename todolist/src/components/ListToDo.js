import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { FaCheck, FaTimes, FaEdit, FaTrashAlt, FaSearch } from 'react-icons/fa'; // Added FaSearch icon
import Toast from 'react-bootstrap/Toast';

const ListToDo = () => {
  const [todos, setTodos] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVariant, setToastVariant] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTodos, setFilteredTodos] = useState([]);
  const location = useLocation();

  useEffect(() => {
    if (location.state?.toastMessage) {
      setToastMessage(location.state.toastMessage);
      setToastVariant(location.state.toastVariant);
      setShowToast(true);
    }
    fetchTodos();
  }, [location]);

  useEffect(() => {
    const filtered = todos.filter(todo =>
      todo.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTodos(filtered);
  }, [todos, searchTerm]);

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
        setToastMessage('Deleted successfully!');
        setToastVariant('danger');
        setShowToast(true);
      })
      .catch(error => {
        console.error('Error deleting todo:', error);
      });
  };

  const handleStatus = (id, currentStatus) => {
    const updatedStatus = !currentStatus;
    axios.put(`/api/todos/${id}/status`, { isComplete: updatedStatus })
      .then(response => {
        console.log('Todo status updated successfully:', response.data);
        setTodos(todos.map(todo =>
          todo.id === id ? { ...todo, isComplete: updatedStatus } : todo
        ));
        setToastMessage(`Marked ${updatedStatus ? 'Complete' : 'Incomplete'}`);
        setToastVariant('success');
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
        <Dropdown.Item as={Link} to={`/edit-todo/${id}`}>
          <FaEdit className="mr-1" /> Edit
        </Dropdown.Item>
        <Dropdown.Item onClick={() => handleStatus(id, currentStatus)}>
          {currentStatus ? <><FaTimes className="mr-1" /> Mark Incomplete</> : <><FaCheck className="mr-1" /> Mark Complete</>}
        </Dropdown.Item>
        <Dropdown.Item onClick={() => handleDelete(id)} className="text-danger">
          <FaTrashAlt className="mr-1" /> Delete
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );

  const renderStatusIcon = (isComplete) => (
    isComplete ? <FaCheck color="green" /> : <FaTimes color="red" />
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="container">
      <main className="mt-4">
        <nav className="mb-3 d-flex justify-content-between align-items-center">
  <div className="search-container d-flex align-items-center">
    <input
      type="text"
      placeholder="Search..."
      value={searchTerm}
      onChange={handleSearchChange}
      className="form-control mr-3"
    />
    <FaSearch className="search-icon" />
  </div>
  <Button variant="primary" as={Link} to="/create" className="btn-primary">Create New List</Button>
</nav>

        <Toast show={showToast} onClose={() => setShowToast(false)} delay={3000} autohide className={`bg-${toastVariant}`}>
          <Toast.Body className="text-white">{toastMessage}</Toast.Body>
        </Toast>
        <Table striped bordered hover size="sm" className="table-custom text-center">
          <thead>
            <tr>
              <th>Description</th>
              <th>Complete Check</th>
              <th>Time</th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {filteredTodos.map(todo => (
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
