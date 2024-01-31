import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './design.css';
import { Link } from 'react-router-dom';
import Spiner from "../../components/Spiner/Spiner"



const Dashboard = () => {
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalSoldOutProducts, setTotalSoldOutProducts] = useState(0);
  const [showspin, setShowSpin] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userToken = localStorage.getItem('userToken');
        const axiosInstance = axios.create({
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });

        // Fetch total revenue
        const revenueResponse = await axiosInstance.get('https://sttockery.netlify.app/.netlify/functions/App/list-customers');
        const totalRevenue = revenueResponse.data.totalRevenue;
        setTotalRevenue(totalRevenue);

        
        const soldOutProductsResponse = await axiosInstance.get('https://sttockery.netlify.app/.netlify/functions/App/sale-products');
        const totalSoldOutProducts = soldOutProductsResponse.data.data.reduce(
          (total, product) => total + product.totalQuantity,
          0
        );
        setTotalSoldOutProducts(totalSoldOutProducts);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [])

  useEffect(() => {
    setTimeout(() => {
        setShowSpin(false);
    }, 1200);
}, []);
  return (
    <>
     { showspin ? <Spiner /> : (
      <div className="container container-fluid">
        <div className="row">
          <div className="col-12 col-md-10">
            <h1 className="my-4">Dashboard</h1>
            <div className="row pr-4">
              <div className="col-xl-12 col-sm-12 mb-3">
                <div className="card text-white bg-primary o-hidden h-100">
                  <div className="card-body">
                    <div className="text-center card-font-size">
                      Total Revenue<br /> <b>${totalRevenue}</b>
                    </div>
                  </div>
                </div>
              </div>
            </div>


          <div className="row pr-4">
            <div className="col-xl-3 col-sm-6 mb-3">
              <div className="card text-white bg-success o-hidden h-100">
                <div className="card-body">
                  <div className="text-center card-font-size">
                    Products
                  </div>
                </div>
                <Link className="card-footer text-white clearfix small z-1" to="/admin-products">
                  <span className="float-left">View Details</span>
                  <span className="float-right">
                    <i className="fa fa-angle-right"></i>
                  </span>
                </Link>
              </div>
            </div>

            <div className="col-xl-3 col-sm-6 mb-3">
              <div className="card text-white bg-danger o-hidden h-100">
                <div className="card-body">
                  <div className="text-center card-font-size">
                    Orders
                  </div>
                </div>
                <Link className="card-footer text-white clearfix small z-1" to="/customerList">
                  <span className="float-left">View Details</span>
                  <span className="float-right">
                    <i className="fa fa-angle-right"></i>
                  </span>
                </Link>
              </div>
            </div>

            <div className="col-xl-3 col-sm-6 mb-3">
              <div className="card text-white bg-info o-hidden h-100">
                <div className="card-body">
                  <div className="text-center card-font-size">
                    Users
                  </div>
                </div>
                <Link className="card-footer text-white clearfix small z-1" to="/admin/allUsers">
                  <span className="float-left">View Details</span>
                  <span className="float-right">
                    <i className="fa fa-angle-right"></i>
                  </span>
                </Link>
              </div>
            </div>

            <div className="col-xl-3 col-sm-6 mb-3">
              <div className="card text-white bg-warning o-hidden h-100">
                <div className="card-body">
                <div className="text-center card-font-size">
                 Sale Products<br /> <b>{totalSoldOutProducts}</b>
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
      )}
    </>
  )
}

export default Dashboard
