import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const ListToDo = () => {
  const [todos, setTodos] = useState([]);

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
        console.log('Todo deleted successfully:', response.data);
        fetchTodos();
      })
      .catch(error => {
        console.error('Error deleting todo:', error);
      });
  };

  const getStatusVariant = (isComplete) => {
    return isComplete ? 'success' : 'warning';
  };

  return (
    <div className="container">
      
      <main className="mt-4">
        <Table striped bordered hover size="sm" className="text-center">
          <thead>
            <tr>
              <th>Description</th>
              <th>Status</th>
              <th>Updated At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {todos.map(todo => (
              <tr key={todo.id}>
                <td>{todo.description}</td>
                <td>
                  <span className={`badge bg-${getStatusVariant(todo.isComplete)}`}>
                    {todo.isComplete ? 'Complete' : 'Incomplete'}
                  </span>
                </td>
                <td>{new Date(todo.updatedAt).toLocaleString()}</td>
                <td>
                  <Link to={`/edit/${todo.id}`} className="btn btn-info btn-sm">Edit</Link>
                  <Button variant="danger" size="sm" onClick={() => handleDelete(todo.id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </main>
    </div>
  );
};

export default ListToDo;
