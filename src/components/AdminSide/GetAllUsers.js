import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spiner from "../../components/Spiner/Spiner"

const AllUsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showspin, setShowSpin] = useState(true);

  useEffect(() => {
    // Fetch all users from the server
    axios.get('https://sttockery.netlify.app/.netlify/functions/App/admin/all-users')
      .then(response => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setTimeout(() => {
        setShowSpin(false);
    }, 1200);
}, []);

  return (

    <>

{ showspin ? <Spiner /> : (
    <div>
      <h2>All Users</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {users.map(user => (
            <li key={user._id}>
              <p>User ID: {user._id}</p>
              <p>Name: {user.name}</p>
              <p>Email: {user.email}</p>
              {/* Add more user details as needed */}
            </li>
          ))}
        </ul>
      )}
    </div>

)}
    </>
  );
};

export default AllUsersList;
