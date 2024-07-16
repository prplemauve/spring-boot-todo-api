import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const CreateToDo = () => {
  const [description, setDescription] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('/api/todos', { description, isComplete })
      .then(response => {
        console.log('Todo created successfully:', response.data);
        alert('Todo created successfully!');
        setDescription('');
        setIsComplete(false);
        history.push('/');
      })
      .catch(error => {
        console.error('Error creating todo:', error);
      });
  };

  return (
    <div className="container mt-4">
      <h2>Create New Todo</h2>
      <hr />
      <Form onSubmit={handleSubmit} className="text-center">
        <Form.Group controlId="formDescription" className="d-flex flex-column align-items-start">
          <Form.Label className="custom-label">List To Do:</Form.Label><Form.Control
            as="textarea"
            rows={3}
            value={description}
            onChange={e => setDescription(e.target.value)}
            required
          />
          
        </Form.Group>
        <div className="d-flex align-items-center justify-content-start">
          <Form.Check
            type="checkbox"
            id="isComplete"
            label="Complete"
            checked={isComplete}
            onChange={e => setIsComplete(e.target.checked)}
            className="custom-check"
          />
        </div>
        <Button variant="outline-primary" type="submit" className="mt-3">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default CreateToDo;
