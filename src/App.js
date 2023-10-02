import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import CreateUser from './components/CreateUser';
import ListUsers from './components/ListUsers';
import EditUser from './components/EditUser';
import DeleteUser from './components/DeleteUser';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import Home from './components/Home';

function App({id}) {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '' });
  const [showStatus, setShowStatus] = useState('all');

  const padding = {
    padding: 15
  }

  useEffect(() => {
    axios.get('http://localhost:3001/users/').then((response) => {
      setUsers(response.data);
    });
  }, []);

  const newUserNameRef = useRef(null);

  const addUser = async (event) => {
    event.preventDefault();

    try {
      await axios.post('http://localhost:3001/users/', newUser);
      setNewUser({ name: '', email: '' });
      newUserNameRef.current.focus();
    } catch (error) {
      console.error('Error creating user', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleStatusChange = (event) => {
    setShowStatus(event.target.value);
  };

  return (
    <Router>
      <div>
        <Link style={padding} to="/">Home</Link>
        <Link style={padding} to="/users">List Users</Link>
        <Link style={padding} to="/create-user">Create User</Link>
        <Link style={padding} to={`/edit-user/${id}`}>Edit User</Link>
          <Link style={padding} to={`/delete-user/${id}`}>Delete Users</Link>


      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<ListUsers users={users} showStatus={showStatus} />} />
        <Route
          path="/create-user"
          element={
            <CreateUser
              addUser={addUser}
              newUser={newUser}
              handleInputChange={handleInputChange}
              newUserNameRef={newUserNameRef}
            />
          }
        />
        <Route path="/edit-user/:id" element={<EditUser />} />
        <Route path="/delete-user/:id" element={<DeleteUser />} />
      </Routes>
    </Router>
  );
}

export default App;

