import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './users.css';
import Spiner from "../../components/Spiner/Spiner"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AllUsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showspin, setShowSpin] = useState(true);


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userToken = localStorage.getItem('userToken');
        const response = await axios.get('https://sttockery.netlify.app/.netlify/functions/App/admin/all-users', {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });

        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);
  

  const handleDeleteUser = async (userId) => {
    console.log('Deleting user with ID:', userId);

    try {
      const userToken = localStorage.getItem('userToken');
      await axios.delete(`https://sttockery.netlify.app/.netlify/functions/App/user/${userId}/delete`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
      console.log(`Deleted user with ID ${userId}`);
      toast.success(`Deleted user`);
    } catch (error) {
      toast.error('Error deleting user:', error);
    }
  };

  const handleExport = async () => {
    try {
      const userToken = localStorage.getItem('userToken');
      const response = await axios.get('https://sttockery.netlify.app/.netlify/functions/App/export-users', {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
        responseType: 'blob',
      });

      // Create a Blob from the response data
      const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheatml.sheet' });

      // Create a download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'users.xlsx';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      toast.error(error.response.data);
    }
  };
  useEffect(() => {
    setTimeout(() => {
        setShowSpin(false);
    }, 1200);
}, []);

  return (
    <>
    {showspin ? <Spiner /> : (
      <div className="users-container">
        <h1 className="users-heading">All Users</h1>
        <button className="export-button" onClick={handleExport}>
          Export Users
        </button>
        {loading ? (
          <p className="loading-message">Loading...</p>
        ) : (
          <ul className="users-list">
            {users.map((user) => (
              <li key={user._id} className={`user-item user-role-${user.role}`}>
              <p className="user-id">User ID: {user._id}</p>
              <p className="user-name">Name: {user.name}</p>
              <p className="user-email">Email: {user.email}</p>
              <p className="user-role">Role: {user.role}</p>
              <div className="user-actions">
                <Link to={`/admin/edit/${user._id}`}>
                  <button className="edit-button">Edit</button>
                </Link>
                <button
                  className="delete-button"
                  onClick={() => handleDeleteUser(user._id)}
                >
                  Delete
                </button>

                <Link to={`/admin/${user._id}/orderHistories`}>
                  <button
                    className="details-button"
                  >
                Order Histories
              </button>
                </Link>
                <Link to={`/admin/${user._id}/PaymentHistories`}>
              <button
                className="details-button"
              >
                Payment Histories
              </button>
              </Link>
            </div>
            </li>
              ))}
            </ul>
          )}
               <ToastContainer />  
        </div>
      )}
    </>
  );
};
export default AllUsersList;
