import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './users.css';
import Spiner from "../../components/Spiner/Spiner"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'customer', 
  });
  const [showspin, setShowSpin] = useState(true);

  useEffect(() => {
    const userToken = localStorage.getItem('userToken');
    const axiosInstance = axios.create({
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });

    axiosInstance
      .get(`https://sttockery.netlify.app/.netlify/functions/App/admin/user/${id}`)
      .then((response) => {
        const user = response.data;
        setFormData({
          name: user.name,
          email: user.email,
          role: user.role,
        });
      })
      .catch((error) => {
        console.error('Error fetching user details:', error);
      });
  }, [id]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userToken = localStorage.getItem('userToken');
      const axiosInstance = axios.create({
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      await axiosInstance.put(`https://sttockery.netlify.app/.netlify/functions/App/update/${id}`, formData);
      console.log('User details updated successfully');
      toast.success('User updated successfully');
      navigate('/admin/allUsers');
    } catch (error) {
      toast.error('Error updating user details:', error);
    }
  };


  useEffect(() => {
    setTimeout(() => {
        setShowSpin(false);
    }, 1200);
}, []);

  return (
<>
    { showspin ? <Spiner /> : (
    <div className="container-wrapper">
      <div className="form-container">
        <form className="form-shadow" onSubmit={handleSubmit}>
          <h1 className="form-heading">Update User</h1>

          <div className="form-group">
            <label htmlFor="nameField">Name</label>
            <input
              type="name"
              id="nameField"
              className="form-control"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="emailField">Email</label>
            <input
              type="email"
              id="emailField"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="roleField">Role</label>
            <select
              id="roleField"
              className="form-control"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
            >
              <option value="customer">customer</option>
              <option value="admin">admin</option>
            </select>
          </div>

          <button type="submit" className="btn update-btn">
            Update
          </button>
        </form>
      </div>
      <ToastContainer /> 
    </div>
    )}
    </>
  );
};

export default EditUser;
