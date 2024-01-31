import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import './upload.css';
import Spiner from '../../components/Spiner/Spiner';

const Upload = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageDetails, setImageDetails] = useState({
    description: '',
    price: '',
    type: '', // Add type to state
    category: '', // Add category to state
  });
  const [showspin, setShowSpin] = useState(true);

  const userToken = localStorage.getItem('userToken');
  console.log('User Token:', userToken);

  if (!userToken) {
    // Handle the case when the token is not available
    console.error('User token not found.');
    // Redirect or show an error message to the user
  }

  const axiosInstance = axios.create({
    baseURL: 'https://sttockery.netlify.app/.netlify/functions/App', 
    headers: {
      Authorization: `Bearer ${userToken}`,
      'Content-Type': 'multipart/form-data',
    },
  });

  const handleUpload = async (event) => {
    event.preventDefault();
  
    try {
      const formData = new FormData();
      formData.append('image', selectedFile);
      formData.append('description', imageDetails.description);
      formData.append('price', imageDetails.price);
      formData.append('type', imageDetails.type);
      formData.append('category', imageDetails.category);
  
      await axiosInstance.post('/upload', formData);
  
      console.log('File uploaded successfully');
      toast.success('Product uploaded successfully');
      navigate('/products');
    } catch (error) {
      toast.error(`Already file has Exist , Error uploading file : ${error}`);
    }
  };
  

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleDetailsChange = (event) => {
    setImageDetails({
      ...imageDetails,
      [event.target.name]: event.target.value.trim(), 
    });
  };

  useEffect(() => {
    setTimeout(() => {
      setShowSpin(false);
    }, 1200);
  }, []);

  return (
    <>
      {showspin ? (
        <Spiner />
      ) : (
        <>
          <div className="upload-container">
            <h2>Upload Images</h2>
            <div className="upload-form">
              <form encType="multipart/form-data" onSubmit={handleUpload}>
                <input type="file" name="image" onChange={handleFileChange} />
                <br />
                <br />
                Description:
                <input
                  type="text"
                  placeholder="description (comma-separated)"
                  name="description"
                  value={imageDetails.description}
                  onChange={handleDetailsChange}
                />
                Price:
                <input
                  type="text"
                  name="price"
                  placeholder="only give 276.99 this type of price"
                  value={imageDetails.price}
                  onChange={handleDetailsChange}
                />
                Type:
                <select name="type" value={imageDetails.type} onChange={handleDetailsChange}>
                  <option value="" disabled>
                    Select your type
                  </option>
                  <option value="Photos">Photos</option>
                  <option value="Videos">Videos</option>
                  <option value="Music">Music</option>
                </select>
                Category:
                <select name="category" value={imageDetails.category} onChange={handleDetailsChange}>
                  <option value="" disabled>
                    Select your category
                  </option>
                  <option value="Women">Women</option>
                  <option value="Animal">Animal</option>
                  <option value="Mountain">Mountain</option>
                  <option value="Men">Men</option>
                </select>

                <button type="submit" className="upload-button">
                  Upload
                </button>
              </form>
            </div>
          </div>
          <ToastContainer  />
        </>
      )}
    </>
  );
};

export default Upload;
