import React, { useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Userlist from './components/Userlist';
import Createuser from './components/Createuser';
import Edituser from './components/Edituser';

function App() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  

  const createUser = (newUser) => {
    setUsers([...users, newUser]);
  };

  const updateUser = (updatedUser) => {
    const updatedUsers = users.map((user) =>
      user.id === updatedUser.id ? updatedUser : user
    );
    setUsers(updatedUsers);
    setSelectedUser(null);
  };

  const deleteUser = (userId) => {
    // DELETE request to delete the user
    axios.delete(`https://jsonplaceholder.typicode.com/users/${userId}`).then(() => {
      const updatedUsers = users.filter((user) => user.id !== userId);
      setUsers(updatedUsers);
      alert("User Deleted")
    });
  };

  return (
    <Router>
      <div style={{
        backgroundColor: 'slate',
        width:'100%',
        height:'100%'
      }}>
        <Routes>
          <Route path="/" element={<Userlist onDelete={deleteUser}/>} />
          <Route path="/create" element={<Createuser onCreate={createUser}/>} />
          <Route path="/edit/:userId" element={<Edituser onUpdate={updateUser}/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
