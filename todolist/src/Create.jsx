import React, { useState } from 'react';
import axios from 'axios';

const Create = ({ onAdd }) => {
  const [task, setTask] = useState('');

  const handleAdd = () => {
    if (task.trim() === '') return; // Ensure the task is not empty

    axios
      .post('http://localhost:3001/add', { task: task })
      .then((result) => {
       location.reload()
      })
      .catch((err) => console.error('Error:', err));
  };    

  return (
    <div className="create_form">
      <input
        type="text"
        className="input"
        placeholder="Enter a task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button type="button" className="enter-button" onClick={handleAdd}>
        Add
      </button>
    </div>
  );
};

export default Create;
