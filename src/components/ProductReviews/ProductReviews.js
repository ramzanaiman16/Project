import React, { useState ,useEffect} from 'react';
import { FaStar } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import './ReviewPageStyle.css';

import Spiner from "../../components/Spiner/Spiner"



const ProductReviews = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);
    const [comment, setComment] = useState('');
    const [showspin, setShowSpin] = useState(true);


    const userToken = localStorage.getItem('userToken');
    const axiosInstance = axios.create({
        headers: {
            Authorization: `Bearer ${userToken}`,
        },
    });

    const handleReviewSubmit = async () => {
        try {
            console.log('Submitting review:', { rating, comment });

            const queryParams = new URLSearchParams(location.search);
            const productIds = queryParams.get('productIds');

            const response = await axiosInstance.put(`http://localhost:5000https://sttockery.netlify.app/.netlify/functions/App/api/products/review`, {
                rating: rating,
                comment: comment,
                productId: productIds,
            });

            if (response.status === 200) {
                console.log('Review submitted successfully:', response.data);
                setRating(null);
                setComment('');

                // Optional: Redirect to a success page or show a success message to the user
                navigate('/');
            } else {
                console.error('Unexpected response status:', response.status);
            }
        } catch (error) {
            console.error('An error occurred while submitting the review:', error);

            if (error.response && error.response.data && error.response.data.error) {
                console.error('Server error:', error.response.data.error);
            }
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
        <div className='review-container'>

        <div className='review'>
            <div>
                <h2>Rate and Review</h2>
            </div>
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
                                onClick={() => setRating(ratingValue)}
                            />
                            <FaStar
                                className='star'
                                color={ratingValue <= (hover || rating) ? '#ffc107' : '#e4e5e9'}
                                size={60}
                                onMouseEnter={() => setHover(ratingValue)}
                                onMouseLeave={() => setHover(null)}
                            />
                        </label>
                    );
                })}
            </div>
            <div>

                <label htmlFor='comment'>Comment :</label>
                <textarea id='comment' value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
            </div>

            <div>

                <button className='button-review' onClick={handleReviewSubmit}>Submit Review</button>
            </div>
        </div>
        </div>
        )}
        </>
    );
};

export default ProductReviews;
