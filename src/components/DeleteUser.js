import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function DeleteUser() {
  const { id } = useParams();
  const [selectedId, setSelectedId] = useState('');
  const [userIds, setUserIds] = useState([]); // State to store user IDs

  useEffect(() => {
    // Fetch user IDs and populate the dropdown options
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
      // Make a DELETE request to remove the user from the server
      await axios.delete(`http://localhost:3001/users/${selectedId}`);
      // Redirect to the list of users after successful deletion
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
          {/* Populate the dropdown with user IDs */}
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
