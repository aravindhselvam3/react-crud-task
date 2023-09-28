import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function UserProfile() {
  const { id } = useParams();
  const [user, setUser] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:3001/users/${id}`).then((response) => {
      setUser(response.data);
    });
  }, [id]);

  return (  
    <div>
      <h1>User Profile</h1>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
    </div>
  );
}

export default UserProfile;
