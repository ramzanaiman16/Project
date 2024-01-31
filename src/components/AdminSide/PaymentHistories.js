import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate, Link } from 'react-router-dom';
import Spiner from "../../components/Spiner/Spiner"


import axios from 'axios';
import './orderStyle.css';

const PaymentHistories = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [paymentHistory, setPaymentHistory] = useState([]);
    const [showspin, setShowSpin] = useState(true);

    const userToken = localStorage.getItem('userToken');
    const axiosInstance = axios.create({
        headers: {
            Authorization: `Bearer ${userToken}`,
        },
    });

    useEffect(() => {
        const fetchPaymentHistory = async () => {
            try {
                const response = await axiosInstance.get(`https://sttockery.netlify.app/.netlify/functions/App/user/${id}/payment-history`);
                setPaymentHistory(response.data.data);
            } catch (error) {
                console.error('Error fetching payment history:', error);
            }
        };

        fetchPaymentHistory();
    }, [id]);
    useEffect(() => {
        setTimeout(() => {
            setShowSpin(false);
        }, 1200);
    }, []);

    return (

<>
{ showspin ? <Spiner /> : (
        <div className='payment-container'>      
        <div className="payment-history-container">
            <h2 className="payment-history-heading">Payment History</h2>
            <ul className="payment-history-list">
                {paymentHistory.map((payment) => (
                    <li key={payment._id} className="payment-history-item">
                        <p className="payment-info">
                            <strong>Payment ID:</strong> {payment._id}
                        </p>
                        <p className="payment-info">
                            <strong>User ID:</strong> {payment.userId}
                        </p>
                        <p className="payment-info">
                            <strong>Amount:</strong> {payment.amount}
                        </p>
                        <p className="payment-info">
                            <strong>Currency:</strong> {payment.currency}
                        </p>
                        {/* Add more important details as needed */}
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

export default PaymentHistories;
