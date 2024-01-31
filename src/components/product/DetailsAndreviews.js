import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  CardActions
} from '@mui/material';
import Button from '@mui/material/Button';
import { useSelector, useDispatch } from 'react-redux';
import { GoStarFill } from 'react-icons/go';
import './details.css';
import { Link } from 'react-router-dom';
import { addtoCart } from '../../redux/cartSlice';
import Spiner from "../../components/Spiner/Spiner"


const DetailsAndreviews = () => {


  const dispatch = useDispatch();
  const products = useSelector((state) => state.cart.cart);
  const [showspin, setShowSpin] = useState(true);

  const { id } = useParams();
  const [product, setProduct] = useState(null);


  const userToken = localStorage.getItem('userToken');
  console.log('User Token:', userToken);
  
  const axiosInstance = axios.create({
    headers: {
        Authorization: `Bearer ${userToken}`,
    },
});

  const fetchProduct = async () => {
    try {
      const response = await axiosInstance.get(`https://sttockery.netlify.app/.netlify/functions/App/get/${id}/product`);
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  useEffect(() => {
    setTimeout(() => {
        setShowSpin(false);
    }, 1200);
}, []);


  return (


    <>
 { showspin ? <Spiner /> : (
    <div className="container-details">
      {product && (
        <Card className="card" sx={{ maxWidth: 300 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image={`https://sttockery.netlify.app/.netlify/functions/App/${product.image}`}
              alt={product.description[0]}
            />
            <CardContent className="cardContent">
              <Typography gutterBottom variant="h5" component="div">
                ${product.price}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Description: {product.description[0]}
              </Typography>
              <CardActions style={{ color: "yellow" }}>
                {Array.from({ length: Math.floor(product.ratings) }).map((_, index) => (
                  <GoStarFill size={20} key={index} />
                ))}
              </CardActions>

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
            </CardContent>
          </CardActionArea>
        </Card>
      )}
      {product && product.reviews && product.reviews.length > 0 && (
        <Card>
          <CardContent className="reviewsContainer">
            <Typography variant="h6" gutterBottom className='review h6'>
              Reviews And Rates:
            </Typography>
            {product.reviews.map((review) => (
              <div key={review._id} className="review">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <Typography variant="body1">
                      <p style={{ fontSize: '1.2em', fontWeight: 'bold' }}>
                        User: {review.name}
                      </p>
                    </Typography>
                    <Typography variant="body2">
                      <CardActions style={{ color: "yellow" }}>
                        <p style={{ fontWeight: 'bold' }}>Rating:</p>
                        {Array.from({ length: Math.floor(review.rating) }).map((_, index) => (
                          <GoStarFill size={20} key={index} />
                        ))}
                      </CardActions>
                    </Typography>
                  </div>
                 
                </div>
                <Typography variant="body2">
                  <p style={{ fontSize: '1.1em', fontWeight: 'bold' }}>
                    Comment: {review.comment}
                  </p>
                </Typography>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
    )}
    </>
  );
};

export default DetailsAndreviews;
