import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory, useParams, Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const EditToDo = () => {
  const [description, setDescription] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    axios.get(`/api/todos/${id}`)
      .then(response => {
        const { description, isComplete } = response.data;
        setDescription(description);
        setIsComplete(isComplete);
      })
      .catch(error => {
        console.error('Error fetching todo:', error);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`/api/todos/${id}`, { description, isComplete })
      .then(response => {
        console.log('Updated successfully:', response.data);
        history.push('/', { toastMessage: 'Updated successfully!', toastVariant: 'success' }); // Pass state
      })
      .catch(error => {
        console.error('Error updating todo:', error);
      });
  };

  return (
    <div className="formbold-main-wrapper">
      <div className="EditToDo-form-wrapper">
        <h2>Edit To Do List</h2>
        <hr />
        <form onSubmit={handleSubmit} className="text-center">
          <div className="formbold-input-group">
            <label htmlFor="description" className="formbold-form-label">List To Do:</label>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Enter your to-do list"
              className="formbold-form-input EditToDo-form-input"
              required
            />
          </div>
          <div className="formbold-input-radio-wrapper">
            <label className="formbold-form-label">Status:</label>
            <div className="formbold-radio-flex">
              <div className="formbold-radio-group">
                <label className="formbold-radio-label">
                  <input
                    type="radio"
                    name="isComplete"
                    checked={isComplete}
                    onChange={() => setIsComplete(true)}
                    className="formbold-input-radio"
                  />
                  Complete
                  <span className="formbold-radio-checkmark"></span>
                </label>
              </div>
              <div className="formbold-radio-group">
                <label className="formbold-radio-label">
                  <input
                    type="radio"
                    name="isComplete"
                    checked={!isComplete}
                    onChange={() => setIsComplete(false)}
                    className="formbold-input-radio"
                  />
                  Incomplete
                  <span className="formbold-radio-checkmark"></span>
                </label>
              </div>
            </div>
          </div>
          <div>
            <Link to="/" className="btn btn-secondary">Back to List</Link>
            <Button variant="outline-primary" type="submit" className="EditToDo-submit-btn">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditToDo;
