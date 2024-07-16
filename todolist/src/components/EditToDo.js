import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


const EditToDo = () => {
  const { id } = useParams();
  const [todo, setTodo] = useState({});
  const [description, setDescription] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const history = useHistory();

  useEffect(() => {
    fetchTodo();
  }, []);

  const fetchTodo = () => {
    axios.get(`/api/todos/${id}`)
      .then(response => {
        setTodo(response.data);
        setDescription(response.data.description);
        setIsComplete(response.data.isComplete);
      })
      .catch(error => {
        console.error('Error fetching todo:', error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`/api/todos/${id}`, { description, isComplete })
      .then(response => {
        console.log('Todo updated successfully:', response.data);
        alert('Todo updated successfully!');
        history.push('/');
      })
      .catch(error => {
        console.error('Error updating todo:', error);
      });
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Edit Todo</h2>
      <Form onSubmit={handleSubmit} className="text-center">
        <Form.Group controlId="formDescription">
          <Form.Label>Description:</Form.Label>
          <Form.Control
            type="text"
            value={description}
            onChange={e => setDescription(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Check
          type="checkbox"
          id="isComplete"
          label="Complete"
          checked={isComplete}
          onChange={e => setIsComplete(e.target.checked)}
        />
        <Button variant="primary" type="submit" className="mt-3">Update Todo</Button>
      </Form>
    </div>
  );
};

export default EditToDo;
