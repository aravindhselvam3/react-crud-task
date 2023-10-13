import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function CreateUser() {
  const [newUser, setNewUser] = useState({ name: '', email: '' });
  const nameInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/users/', newUser);
  
      setNewUser({ name: '', email: '' });
      nameInputRef.current.focus();
    } catch (error) {
      console.error('Error creating user', error);
    }
  };

  return (
    <div>
      <h1>Create User</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={newUser.name}
            onChange={handleInputChange}
            ref={nameInputRef} 
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={newUser.email}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <button type="submit">Create User</button>
      </form>
     
      <Link to="/users">Go to Users</Link>
    </div>
  );
}

export default CreateUser;
