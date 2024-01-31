import React from 'react';
import BootstrapSpinner from 'react-bootstrap/Spinner';

const Spiner = () => {
  return (
    <>
      <div className='d-flex justify-content-center align-items-center' style={{ width: "100%", height: "50vh" }}>
        <BootstrapSpinner animation="border" variant="danger" />&nbsp; Loading....
      </div>
    </>
  );
}

export default Spiner;
