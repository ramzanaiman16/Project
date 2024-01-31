// frontend/src/components/CustomerList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CustomerList.css';  // Import the CSS file

const CustomerList = () => {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await axios.get('https://sttockery.netlify.app/.netlify/functions/App/list-customers');
                setCustomers(response.data);
            } catch (error) {
                console.error('Error fetching customers:', error.message);
            }
        };

        fetchCustomers();
    }, []);

    return (
        <div className="customer-list-container">
            <h2>Customer List</h2>
            <ul className="customer-list">
                {customers.map((customer) => (
                    <li key={customer.id} className="customer-item">
                        <div className="customer-info">
                            <strong>Name:</strong> {customer.name}
                        </div>
                        <div className="customer-info">
                            <strong>Email:</strong> {customer.email}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CustomerList;
