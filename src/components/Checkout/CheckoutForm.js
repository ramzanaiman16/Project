import React, { useState,useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { setPaymentMethod, resetCart } from '../../redux/cartSlice';
import './paymentstyle.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Spiner from "../../components/Spiner/Spiner"

const CheckoutForm = () => {
    const dispatch = useDispatch();
    const customerId = useSelector((state) => state.cart.customerId);
    const cartItems = useSelector((state) => state.cart.cart);
    
 const [showspin, setShowSpin] = useState(true);

    const userToken = localStorage.getItem('userToken');
    const axiosInstance = axios.create({
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });

    const navigate = useNavigate();
    const [cardNumber, setCardNumber] = useState('');
    const [expMonth, setExpMonth] = useState('');
    const [expYear, setExpYear] = useState('');
    const [cvc, setCvc] = useState('');

    const calculateTotal = () => {
        let total = 0;
        cartItems.forEach((item) => {
            total += item.price;
        });
        return total;
    };

    const handlePaymentMethodCreation = async () => {
        try {
            const response = await axiosInstance.post('https://sttockery.netlify.app/.netlify/functions/App/create-payment-method/payment', {
                number: cardNumber,
                exp_month: expMonth,
                exp_year: expYear,
                cvc: cvc,
                customerId: customerId,
                amount: calculateTotal(),
                currency: 'pkr',
                products: cartItems.map(item => item.id),

            });

            console.log('Payment Method created:', response.data);

            dispatch(setPaymentMethod(response.data.paymentIntent.id));
            dispatch(resetCart());

            const productIds = cartItems.map(item => item.id).join(',');
           toast.success('Payment Done ');
            navigate(`/productReviews?productIds=${productIds}`);

        } catch (error) {
            console.error('Error creating Payment Method:', error.message);
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
        <div className="checkout-container-1">
            <h2 className="checkout-heading-1">Checkout Form</h2>
            <div className="form-container-1">
                {/* Cart items display */}
                <div className="cart-items-container-1">
                    <h3>Your Cart</h3>
                    <ul className="cart-item-list-1">
                        {cartItems.map((item, index) => (
                            <li key={index} className="cart-item-1">
                                <img src={item.image} alt={`Product ${index + 1}`} className="item-image-1" />
                                <div className="item-details-1">
                                    <p className="item-description-1">{item.description}</p>
                                    <p className="item-price-1">Price: ${item.price.toFixed(2)}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Payment form */}
                <div className="payment-form-1">
                    <label className="label-1">Card Number:</label>
                    <input type="text" className="input-1" onChange={(e) => setCardNumber(e.target.value)} />
                    <label className="label-1">Expiration Month:</label>
                    <input type="text" className="input-1" onChange={(e) => setExpMonth(e.target.value)} />
                    <label className="label-1">Expiration Year:</label>
                    <input type="text" className="input-1" onChange={(e) => setExpYear(e.target.value)} />
                    <label className="label-1">CVC:</label>
                    <input type="text" className="input-1" onChange={(e) => setCvc(e.target.value)} />

                    <button className="button-1" onClick={handlePaymentMethodCreation}>
                        Create Payment Method
                    </button>
                </div>
            </div>
            <ToastContainer/>
        </div>

)}
        </>
    );
};

export default CheckoutForm;
