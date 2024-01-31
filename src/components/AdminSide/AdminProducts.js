import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CardActions } from '@mui/material';
import { GoStarFill } from 'react-icons/go';
import { Link } from 'react-router-dom';
import { addtoCart } from '../../redux/cartSlice';
import axios from 'axios';
import Button from '@mui/material/Button';
import { FaStar } from 'react-icons/fa';
import { Card, CardActionArea, CardMedia, CardContent, Typography } from '@mui/material';
import Search from '../../pages/ProductDetails/Search';
import '../product/shopSidebar.css';
import Spiner from "../Spiner/Spiner"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.cart.cart);
  const [localProducts, setLocalProducts] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });
  const [ratingFilter, setRatingFilter] = useState(null);
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  const [showspin, setShowSpin] = useState(true);

  const userToken = localStorage.getItem('userToken');
  const axiosInstance = axios.create({
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get('https://sttockery.netlify.app/.netlify/functions/App/product/filter', {
        params: {
          minPrice: priceRange.min,
          maxPrice: priceRange.max,
          minRating: ratingFilter,
        },
      });
      console.log('Fetched filtered products:', response.data);
      toast.success('Fetched filtered products:', response.data);
      setLocalProducts(response.data);
    } catch (error) {
      console.error('Error fetching filtered data:', error);
      toast.error('Error fetching filtered data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [priceRange, ratingFilter]);

  useEffect(() => {
    setTimeout(() => {
        setShowSpin(false);
    }, 1200);
}, []);

  const handleRangeChange = (e) => {
    const { name, value } = e.target;
    setPriceRange((prevRange) => ({
      ...prevRange,
      [name]: parseInt(value, 10),
    }));
  };

  const handleRatingChange = (e) => {
    // Assuming your rating filter is a numeric value
    const selectedRating = parseInt(e.target.value, 10);
    setRatingFilter((prevRating) => (prevRating === selectedRating ? null : selectedRating));
  };

  const handleClearFilter = () => {
    setRatingFilter(null);
    setRating(null);
  };

  const handleFilterChange = () => {
    fetchData();
  };

  const handleDelete = async (productId) => {
    console.log('Deleting product with ID:', productId);

    try {
      await axiosInstance.delete(`https://sttockery.netlify.app/.netlify/functions/App/${productId}/delete`);
      setLocalProducts((prevProducts) => prevProducts.filter((product) => product._id !== productId));
      console.log(`Deleted product with ID ${productId}`);
      toast.success(`Deleted product`);
    } catch (error) {
      toast.error('Error deleting product:', error);
    }
  };

  return (
    <>
    { showspin ? <Spiner /> : (

      <div>
      <Search />
      <section className="shop">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-3">
              <div className="c">
                <div className="shop__sidebar">
                  <div className="sidebar__categories">
                    <div className="section-title">
                      <h3>Filters</h3>
                    </div>
                  </div>
                  <h4>Shop by price</h4>
                  <hr />
                  <div className="sidebar__filter">
                    <div className="filter-range-wrap">
                      <div className="price">
                        <p>Price:</p>
                        <input
                          type="range"
                          id="priceRangeMin"
                          name="min"
                          min="0"
                          max="5000"
                          value={priceRange.min}
                          onChange={handleRangeChange}
                          style={{ width: '200px' }}
                        />
                        <br />
                        <span>${priceRange.min} - ${priceRange.max}</span>
                      </div>
                    </div>
                  </div>
                  <h4>Shop by Review</h4>
                  <hr />
                  <div className="sidebar__sizes">
                    <div className="size__list">
                      <div className='rating-container'>
                        {[...Array(5)].map((star, i) => {
                          const ratingValue = i + 1;
                          return (
                            <label key={i} htmlFor={`star-${ratingValue}`}>
                              <input
                                type='radio'
                                id={`star-${ratingValue}`}
                                name='rating'
                                value={ratingValue}
                                onClick={handleRatingChange}
                                checked={ratingValue === rating}
                              />
                              <FaStar
                                className='star'
                                color={ratingValue <= (hover || rating) ? '#ffc107' : '#e4e5e9'}
                                size={40}
                                onMouseEnter={() => setHover(ratingValue)}
                                onMouseLeave={() => setHover(null)}
                              />
                            </label>
                          );
                        })}
                      </div>
                    </div>
                    <Button onClick={handleClearFilter}>Clear Rating</Button>
                  </div>
                  <div className="sidebar__color d-none">
                    <div className="section-title">
                      <h4>Shop by size</h4>
                    </div>
                    <div className="size__list color__list">
                      <label htmlFor="black">
                        Blacks
                        <input type="checkbox" id="black" />
                        <span className="checkmark"></span>
                      </label>
                    </div>
                    <Button onClick={handleFilterChange}>Apply Filters</Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-9 col-md-9">
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                {localProducts.map((product) => (
                  <Card key={product.id} sx={{ maxWidth: 200, margin: 4, flexBasis: 'calc(33.33% - 16px)' }}>
                    <Link to={`/detailsAndReviews/${product._id}`}>
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          height="140"
                          image={`https://sttockery.netlify.app/.netlify/functions/App/${product.image}`}
                          alt={product.name}
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="div">
                            ${product.price}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {product.description}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Link>
                 

<CardActions style={{ color: "yellow" }}>
                      {Array.from({ length: Math.floor(product.ratings) }).map((_, index) => (
                        <GoStarFill key={index} />
                      ))}
                    </CardActions>
                    <CardActions>
                      <Typography variant="body2" color="text.secondary">
                        Ratings: {product.ratings} | Reviews: {product.reviews ? product.reviews.length : 0}
                      </Typography>

                    </CardActions>
                    <Button size="small" className="delete-button" onClick={() => handleDelete(product._id)}>
                      Delete
                    </Button>
                    <Link to={`/edit/${product._id}`}>
                      <Button size="small" className="edit-button" >
                        Edit
                      </Button>
                    </Link>
                    <CardActions>
                      <Link to='/cart'>
                        <Button
                          size="small"
                          className="add-to-cart-button"
                          onClick={() => dispatch(addtoCart({
                            id: product._id,
                            image: `https://sttockery.netlify.app/.netlify/functions/App/${product.image}`,
                            price: product.price,
                            description: product.description,
                          }))}
                        >
                          Add To Cart
                        </Button>

                      </Link>
                    </CardActions>

                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer/>
      </div>

      )}
    </>
  );
};

export default Products;
