import React, { useState, useEffect } from 'react';
import './customerList.css';
import axios from 'axios';
import Spiner from "../../components/Spiner/Spiner"

const CustomersList = () => {
  const [customer, setCustomer] = useState(null);
  const [payments, setPayments] = useState([]);
  const [showspin, setShowSpin] = useState(true);

  const userToken = localStorage.getItem('userToken');
  const axiosInstance = axios.create({
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });

  useEffect(() => {
    // Fetch customer data from the server
    axiosInstance.get('https://sttockery.netlify.app/.netlify/functions/App/list-customers')
      .then(response => {
        setCustomer(response.data.customer);
        setPayments(response.data.payments);
      })
      .catch(error => {
        console.error('Error fetching customer data:', error);
      });
  }, []); 

  useEffect(() => {
    setTimeout(() => {
        setShowSpin(false);
    }, 1200);
}, []);

  return (


    <>
{ showspin ? <Spiner /> : (


    <div className="customer-list-container">
      <h2 className="customer-list-heading">Customer Information</h2>
      {customer && (
        <div className="customer-item customer-info">
          <span>Name:</span> {customer.name}
          <br />
          <span>Email:</span> {customer.email}
          <br />
          <span>Phone:</span> {customer.phone}
        </div>
      )}

      <h2 className="customer-list-heading payment-history">Payment History</h2>
      <ul className="customer-list">
        {payments.map(payment => (
          <li key={payment.id} className="customer-item">
            {/* Render payment details */}
            <p className="payment-id">Payment ID: {payment.id}</p>
            <p className="payment-amount">Amount: {payment.amount}</p>
            {/* Add more details as needed */}
          </li>
        ))}
      </ul>
    </div>
    )}
    </>
  );
};

export default CustomersList;
