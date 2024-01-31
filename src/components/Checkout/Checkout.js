import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector } from 'react-redux';
import { loadStripe } from '@stripe/stripe-js';
import { useNavigate } from 'react-router-dom';
import { setCustomerId, setPaymentMethod } from '../../redux/cartSlice';
import axios from 'axios';
import './checkout.css';
import Spiner from "../../components/Spiner/Spiner"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Checkout = () => {

    const navigate = useNavigate();
    const cartItems = useSelector((state) => state.cart.cart);
    const [stripe, setStripe] = useState(null);
    
 const [showspin, setShowSpin] = useState(true);


    const userToken = localStorage.getItem('userToken');
  const axiosInstance = axios.create({
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });

    const dispatch = useDispatch();
  const customerId = useSelector((state) => state.cart.customerId);
  const paymentMethod = useSelector((state) => state.cart.paymentMethod);


    useEffect(() => {
        const initializeStripe = async () => {
            const stripeInstance = await loadStripe("pk_test_51OPN0VD6zgRfczWsi9HpxrkCjNWwZxTMo6uKLw6PDnsRCFxduv07oVG7tAt4FSXRMX3j0k9EwkDdyLrpktV7jN8y00L2v8BsYY");
            setStripe(stripeInstance);
        };

        initializeStripe();
    }, []);

    const calculateTotal = () => {
        let total = 0;
        cartItems.forEach((item) => {
            total += item.price;
        });
        return total;
    };

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState({
        line1: '',
        line2: '',
        city: '',
        postal_code: '',
        country: '',
    });
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [createAccount, setCreateAccount] = useState(false);
    const [country, setCountry] = useState('');
    const [orderNote, setOrderNote] = useState('');


    
    const handlePlaceOrder = async (e) => {
        e.preventDefault();
    
        const amountInCents = Math.round(calculateTotal() * 100);
    
        const orderData = {
            firstName,
            lastName,
            email,
            phone,
            password,
            address,
            city,
            postalCode,
            country,
            orderNote,
            products: cartItems,
            amount: amountInCents,
        };
    
        try {
            const response = await axiosInstance.post('https://sttockery.netlify.app/.netlify/functions/App/create/order/data', orderData);
    
            console.log('Order placed successfully', response.data);
    
            const { customerId, clientSecret } = response.data;
    
         
            dispatch(setCustomerId(customerId));
            dispatch(setPaymentMethod(clientSecret));
           toast.success('Order placed successfully', response.data);
            // Redirect or perform other actions
            navigate("/checkoutForm");
        } catch (error) {
            toast.error('Error placing order', error.response.data);
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


            <div className="container">
                <div className="row">
                    <div className="col-lg-8 fm_d">
                        <h3>Billing Detail</h3>
                        <hr />
                        <form id="form_id" onSubmit={handlePlaceOrder} >
                            <fieldset>
                                <div className="checkout__form__first-last-name">
                                    <div className="form-group">
                                        <label>First Name<span>*</span></label>
                                        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                                    </div>
                                    <div className="form-group" style={{ marginLeft: "80px" }}>
                                        <label>Last Name<span>*</span></label>
                                        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                                    </div>
                                </div>
                            </fieldset>
                            <fieldset>
                                <label>
                                    Country<span>*</span>
                                    <input
                                        type="text"
                                        value={country}
                                        onChange={(e) => setCountry(e.target.value)}
                                    />
                                </label>
                                <br />
                                <label>
                                    Address<span>*</span>
                                    <input
                                        type="text"
                                        placeholder="Street Address"
                                        value={address.line1}
                                        onChange={(e) => setAddress({ ...address, line1: e.target.value })}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Apartment, suite, unit, etc (optional)"
                                        value={address.line2}
                                        onChange={(e) => setAddress({ ...address, line2: e.target.value })}
                                    />
                                </label>
                                <br />
                                <label>
                                    Town/City<span>*</span>
                                    <input
                                        type="text"
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                    />
                                </label>
                                <br />
                                <label>
                                    PostalCode/Zip<span>*</span>
                                    <input
                                        type="text"
                                        value={postalCode}
                                        onChange={(e) => setPostalCode(e.target.value)}
                                    />
                                </label>
                                <div className="checkout__form__first-last-name">
                                    <label>
                                        Phone<span>*</span>
                                        <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
                                    </label>
                                    <label style={{ marginLeft: "80px" }}>
                                        Email<span>*</span>
                                        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    </label>
                                </div>
                                <label htmlFor="acc">
                                    <input type="checkbox" id="acc" />
                                    <span className="checkmark"></span>
                                    Create an account?
                                </label>
                                <p>Create an account by entering the information below. If you are a returning customer, login at the top of the page.</p>
                                <div className="checkout__form__checkbox">
                                    <label>
                                        Account Password <span>*</span>
                                        <input value={password} onChange={(e) => setPassword(e.target.value)} />
                                    </label>
                                    <input type="checkbox" id="orderNotes" />
                                    <label htmlFor="orderNotes">Order Notes <span>*</span></label>
                                    <textarea
                                        placeholder="Note about your order e.g Special note for Delivery"
                                        value={orderNote}
                                        onChange={(e) => setOrderNote(e.target.value)}
                                    ></textarea>
                                </div>
                            </fieldset>
                        </form>
                    </div>
                    <div className="col-lg-4">
                        <div className="checkout__order">
                            <h5>Your order</h5>
                            <div className="checkout__order__product">
                                <ul>
                                    {cartItems.map((item, index) => (
                                        <li key={index}>
                                            <span className="top__text">Product</span>
                                            <img src={item.image} alt={`Selected Product ${index + 1}`} />
                                            <div className="cart-item-info">
                                                <p>{item.description}</p>
                                            </div>
                                            <span>${item.price.toFixed(2)}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="checkout__order__total">
                                <ul>
                                    <li>Subtotal <span>${calculateTotal().toFixed(2)}</span></li>
                                    <li>Total <span>${calculateTotal().toFixed(2)}</span></li>
                                </ul>
                            </div>
                            <div className="checkout__order__widget">
                                <label htmlFor="o-acc">
                                    <input type="checkbox" id="o-acc" />
                                    <span className="checkmark"></span>
                                    Create an account?
                                </label>
                                <p>Create an account by entering the information below. If you are a returning customer, login at the top of the page.</p>
                                <label htmlFor="check-payment">
                                    <input type="checkbox" id="check-payment" />
                                    <span className="checkmark"></span>
                                    Cheque payment
                                </label>
                                <label htmlFor="paypal">
                                    <input type="checkbox" id="paypal" />
                                    <span className="checkmark"></span>
                                    PayPal
                                </label>
                            </div>
                            <form onSubmit={handlePlaceOrder}>
                                <button type="submit" className="site-btn">
                                    Place order
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
                <ToastContainer />  
            </div>
            )}
        </>
    );
};

export default Checkout;
