import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function EditProfile() {
  const { id } = useParams();
  const [user, setUser] = useState({ name: '', email: '' });

  useEffect(() => {
    axios.get(`http://localhost:3001//${id}`).then((response) => {
      setUser(response.data);
    });
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.put(`http://localhost:3001/users/${id}`, user);
      // Redirect to the user profile page after successful update
      window.location.href = `/profile/${id}`;
    } catch (error) {
      console.error('Error updating user profile', error);
    }
  };

  return (
    <div>
      <h1>Edit Profile</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={user.name} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Email:
          <input type="email" name="email" value={user.email} onChange={handleInputChange} />
        </label>
        <br />
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
}

export default EditProfile;
