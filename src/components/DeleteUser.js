import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function DeleteUser() {
  const { id } = useParams();
  const [selectedId, setSelectedId] = useState('');
  const [userIds, setUserIds] = useState([]); 

  useEffect(() => {

    axios.get('http://localhost:3001/users').then((response) => {
      const ids = response.data.map((user) => user.id);
      setUserIds(ids);
    });
  }, []);

  const handleSelectChange = (event) => {
    const selectedId = event.target.value;
    setSelectedId(selectedId);
  };

  const handleDelete = async () => {
    try {
      
      await axios.delete(`http://localhost:3001/users/${selectedId}`);
      
      window.location.href = '/users';
    } catch (error) {
      console.error('Error deleting user', error);
    }
  };

  return (
    <div>
      <h1>Delete User</h1>
      <label>
        Select a user to delete:
        <select onChange={handleSelectChange} value={selectedId}>
          <option value="">Select a user</option>
          
          {userIds.map((userId) => (
            <option key={userId} value={userId}>
              {userId}
            </option>
          ))}
        </select>
      </label>
      <br />
      <button onClick={handleDelete}>Delete User</button>
    </div>
  );
}

export default DeleteUser;
