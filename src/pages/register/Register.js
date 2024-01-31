import React, { useState, useEffect } from 'react';
import './register.css'
import Logo from '../../components/Logo/Logo'
import { useNavigate } from 'react-router-dom';
import { register } from "../../pages/services/Apis"
import Spiner from "../../components/Spiner/Spiner"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const [showspin, setShowSpin] = useState(true);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (name === '') {
            setMessage('Name is required!');
        } else if (email === '') {
            setMessage('Email is required!');
        } else if (!email.includes('@')) {
            setMessage('Enter a valid email!');
        } else if (password === '') {
            setMessage('Password is required!');
        } else {
            try {
                const response = await register({ name, email, password });
                if (response.status === 200) {
                    setName('');
                    setEmail('');
                    setPassword('');
                    console.log('Registration successful!');
                    toast.success('Registration successful! Please Login.');
                }
            } catch (error) {
                setMessage('An error occurred. Please try again.');
            }
            toast.success('Registration successful! Please Login.');
            navigate('/login');
            console.log('Form Submitted');
        }
    };

    useEffect(() => {
        setTimeout(() => {
            setShowSpin(false);
        }, 1200);
    }, []);

    useEffect(() => {
        if (message) {
            toast.error(message);
            setMessage('');
        }
    }, [message]);


    return (
        <>
           { showspin ? <Spiner /> : (
                <div className='register-container'>
                    <form onSubmit={handleSubmit} className="register-form">
                        <div className='logo-design'>
                            {<Logo />}
                        </div>
                        <h1>REGISTER FORM</h1>
                        <input
                            type="name"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                        <button type="submit">Register</button>
                        {message && <p className="message">{message}</p>}
                    </form>

                    <ToastContainer />  
                </div>
                 )}
        </>
    )
}

export default Register;
