import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './orderStyle.css';
import Spiner from "../../components/Spiner/Spiner"

const OrderHistories = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [checkoutHistory, setCheckoutHistory] = useState([]);
    const [showspin, setShowSpin] = useState(true);

    const userToken = localStorage.getItem('userToken');
    const axiosInstance = axios.create({
        headers: {
            Authorization: `Bearer ${userToken}`,
        },
    });

    useEffect(() => {
        const fetchCheckoutHistory = async () => {
            try {
                const response = await axiosInstance.get(`https://sttockery.netlify.app/.netlify/functions/App/user/${id}/checkout-history`);
                setCheckoutHistory(response.data.data);
                
            } catch (error) {
                console.error('Error fetching checkout history:', error);
            }
        };

        fetchCheckoutHistory();
    }, [id]);

    useEffect(() => {
        setTimeout(() => {
            setShowSpin(false);
        }, 1200);
    }, []);
    return (


        <>
  { showspin ? <Spiner /> : (


        <div className='order-container'>

        <div className="order-history-container">
            <h2 className="order-history-heading">Checkout Order History</h2>
            <ul className="order-history-list">
                {checkoutHistory.map((order) => (
                    <li key={order._id} className="order-history-item">
                        <div className="order-details">
                            <p>
                                <strong>Order ID:</strong> {order._id}
                            </p>
                            <p>
                                <strong>User ID:</strong> {order.userId}
                            </p>
                            <p>
                                <strong>Email:</strong> {order.email}
                            </p>
                        </div>
                        <div>
                            <strong>Order Items:</strong>
                            <ul className="order-items-list">
                                {order.orderItems.map((item) => (
                                    <li key={item._id} className="order-item">
                                        <p>
                                            <strong>Item Price:</strong> {item.price}
                                        </p>
                                        <p>
                                            <strong>Image:</strong> <img src={`${item.image}`} alt={`Item ${item._id}`} />
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <p className="order-total-price">
                            <strong>Total Price:</strong> {order.totalPrice}
                        </p>
                    </li>
                ))}
            <Link to="/">Back to Home</Link>
            </ul>
        </div>
        
        </div>
        
)}
        </>
    );
};

export default OrderHistories;
