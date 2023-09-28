import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function EditUser() {
  const { id } = useParams();
  const [user, setUser] = useState({ name: '', email: '' });
  const [userIds, setUserIds] = useState([]); // To store the list of user IDs
  const [selectedId, setSelectedId] = useState(id); // Initialize selectedId with the current ID

  useEffect(() => {
    // Fetch the list of user IDs and user data
    axios.get('http://localhost:3001/users').then((response) => {
      const ids = response.data.map((userData) => userData.id);
      setUserIds(ids);
    });

    //Fetch the user data to pre-fill the form
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
      // Make a PUT request to update the user information
      await axios.put(`http://localhost:3001/users/${selectedId}`, user);
      // Redirect to the user profile page after successful update
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
