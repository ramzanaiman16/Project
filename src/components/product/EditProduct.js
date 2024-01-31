import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { editProduct } from '../../redux/cartSlice';
import './edit.css';
import Spiner from "../../components/Spiner/Spiner"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showspin, setShowSpin] = useState(true);

  const [editedProduct, setEditedProduct] = useState({
    price: '',
    description: '',
    image: '',
    type: '',     
    category: '',  
  });

  const [preview, setPreview] = useState('');

  const userToken = localStorage.getItem('userToken');
  const axiosInstance = axios.create({
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`https://sttockery.netlify.app/.netlify/functions/App/get/${id}/product`);
        setEditedProduct({
          price: response.data.price.toString(),
          description: response.data.description,
          image: response.data.image,
          type: response.data.type,      // Set type from response
          category: response.data.category,  // Set category from response
        });
        setPreview(response.data.image);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };
    fetchData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct({ ...editedProduct, [name]: value });
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append('image', editedProduct.image);
    formData.append('price', editedProduct.price);
    formData.append('description', editedProduct.description);
    formData.append('type', editedProduct.type);       // Include type in formData
    formData.append('category', editedProduct.category); // Include category in formData

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    try {
      const response = await axiosInstance.put(`https://sttockery.netlify.app/.netlify/functions/App/edit/${id}`, formData, config);
      if (response.status === 200) {
        const updatedProduct = { id, ...editedProduct };
        dispatch(editProduct(updatedProduct));
        toast.success('Product updated ', updatedProduct);
        navigate('/products');
      }
    } catch (error) {
      toast.error('Error updating product:', error);
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
    
    <div className="edit-product">
      <h2>Edit Product</h2>

      <div>
       Price:
        <input type="price" name="price" value={editedProduct.price} onChange={handleInputChange} />
       Description:
        <input name="description" value={editedProduct.description} onChange={handleInputChange}></input>
      </div>

      <div>
        Type:
        <select
          name="type"
          value={editedProduct.type}  
          onChange={handleInputChange} 
        >
          <option value="" disabled>Select your type</option>
          <option value="Photos">Photos</option>
          <option value="Videos">Videos</option>
          <option value="Music">Music</option>
        </select>

        Category:
        <select
          name="category"
          value={editedProduct.category}  
          onChange={handleInputChange}   
        >
          <option value="" disabled>Select your category</option>
          <option value="Women">Women</option>
          <option value="Animal">Animal</option>
          <option value="Mountain">Mountain</option>
          <option value="Men">Men</option>
        </select>
      </div>

      <button onClick={handleSave}>Save Changes</button>

      <ToastContainer />
    </div>
    )}
    </>
  );
}

export default EditProduct;
