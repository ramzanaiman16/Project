import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div>
      <h1>Error 404 - Page not found</h1>
      <p>Something went wrong while loading data</p>
      <Link to="/">Back to Home</Link>
    </div>
  );
};

export default ErrorPage;
