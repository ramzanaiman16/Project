import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import { FaHeart, FaShoppingBag } from 'react-icons/fa';
import '../Shop/shop.css';
import Spinner from '../../components/Spiner/Spiner';
import { Link } from 'react-router-dom';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const [showspin, setShowSpin] = useState(true);

  const userToken = localStorage.getItem('userToken');
  const axiosInstance = axios.create({
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });

  useEffect(() => {
    getAllProducts();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setShowSpin(false); // Fix the typo here
    }, 1200);
  }, []);

  const getAllProducts = async () => {
    try {
      const response = await axiosInstance.get('https://sttockery.netlify.app/.netlify/functions/App');
      if (response.status === 200) {
        setProducts(response.data);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      {showspin ? (
        <Spinner />
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {products.map((product, index) => (
            <Card key={index} sx={{ maxWidth: 300, margin: 4, flexBasis: 'calc(33.33% - 16px)' }}>
              <CardActionArea>
                <div className="card-wrapper">
                  <Link to={`/products`}>
                    <CardMedia
                      component="img"
                      height="200"
                      width="100%"
                      image={`https://sttockery.netlify.app/.netlify/functions/App/${product.image}`}
                      alt=""
                      className="card-image"
                    />
                  </Link>

                  <ul className="product__hover">
                    <li>
                      <a href="#">
                        <FaHeart />
                      </a>
                      <a href="#">
                        <FaShoppingBag />
                      </a>
                    </li>
                  </ul>
                </div>
              </CardActionArea>
            </Card>
          ))}
          {error && <p>{error}</p>}
        </div>
      )}
    </>
  );
};

export default Shop;
