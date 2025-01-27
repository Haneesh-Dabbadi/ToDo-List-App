import React, { useEffect, useState } from 'react';
import Create from './Create';
import axios from 'axios';
import { BsCircleFill, BsFillCheckCircleFill, BsFillTrashFill } from 'react-icons/bs'; // Import the icons

export const Home = () => {
  const [todos, setTodos] = useState([]);
  
  useEffect(() => {
    axios.get('http://localhost:3001/get')
      .then(result => setTodos(result.data))
      .catch(err => console.log(err));
  }, []);

  const handleEdit = (id, currentStatus) => {
    const newStatus = !currentStatus; // Toggle the current status (done or not done)
    
    axios.put(`http://localhost:3001/update/${id}`, { done: newStatus })
      .then(result => {
        // Update state locally to reflect the change
        setTodos(todos.map(todo => 
          todo._id === id ? { ...todo, done: newStatus } : todo
        ));
      })
      .catch(err => console.log(err));
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/delete/${id}`)
      .then(result => {
        // Remove the deleted task from the state
        setTodos(todos.filter(todo => todo._id !== id));
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="home">
      <h2>To-Do List</h2>
      <Create />
      {todos.length === 0 ? (
        <div>
          <h2>No Records</h2>
        </div>
      ) : (
        todos.map((todo, index) => (
          <div key={index} className="task">
            <div className="checkbox" onClick={() => handleEdit(todo._id, todo.done)}>
              {todo.done ? <BsFillCheckCircleFill className="icon" /> : <BsCircleFill className="icon" />}
              <p className={todo.done ? "line_through" : ""}>{todo.task}</p>
            </div>
            <div>
              <span><BsFillTrashFill className="icon" onClick={() => handleDelete(todo._id)} /></span>
            </div>
          </div>
        ))
      )}
    </div>
  );
};
