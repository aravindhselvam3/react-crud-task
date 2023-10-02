import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function EditUser() {
  const { id } = useParams();
  const [user, setUser] = useState({ name: '', email: '' });
  const [userIds, setUserIds] = useState([]); 
  const [selectedId, setSelectedId] = useState(id); 

  useEffect(() => {
    
    axios.get('http://localhost:3001/users').then((response) => {
      const ids = response.data.map((userData) => userData.id);
      setUserIds(ids);
    });

   
    axios.get(`http://localhost:3001/users/${selectedId}`).then((response) => {
      setUser(response.data);
    });

  }, [selectedId]);

  const handleSelectChange = (e) => {
    setSelectedId(e.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     
      await axios.put(`http://localhost:3001/users/${selectedId}`, user);
   
      setUser({ name: '', email: '' });
      window.location.href = `/profile/${selectedId}`;
    } catch (error) {
      console.error('Error updating user', error);
    }
  };

  return (
    <div>
      <h1>Edit User</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Select a User ID to edit:
          <select onChange={handleSelectChange} value={selectedId}>
            {userIds.map((userId) => (
              <option key={userId} value={userId}>
                {userId}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <button type="submit">Update User</button>
      </form>
    </div>
  );
}

export default EditUser;
