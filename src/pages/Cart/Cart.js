import React,{useState,useEffect} from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removefromCart } from "../../redux/cartSlice";
import './cart.css'

import Spiner from "../../components/Spiner/Spiner"


const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cart);
  console.log(cartItems)
  const dispatch = useDispatch();
  const [showspin, setShowSpin] = useState(true);
  useEffect(() => {
    setTimeout(() => {
        setShowSpin(false);
    }, 1200);
}, [])
 
  return (


    <>
{ showspin ? <Spiner /> : (

    <div className="container">
      <div className="row">
        <div className="col-lg-8">
          <div className="product__details__pic">
            <div className="product__details__slider__content">
              <div className="product__details__pic__slider owl-carousel owl-loaded">
                <ul>
                  {cartItems.map((item) => (
                    <li key={item._id}>
                      <div className="d-flex">
                        <img src={item.image} alt="" />
                        <div>
                          <h4>${item.price}</h4>
                          <h4>{item.description}</h4>
                          <button
                            className="btn btn-warning btn-sm"
                            onClick={() => dispatch(removefromCart({ id: item.id }))}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <br />
          <div style={{ background: "#fffaf7", padding: "10px 20px" }}>
            <div className="down">
              <Link to="/checkout">
                <button
                  type="submit"
                  className="site-btn2"
                  style={{
                    backgroundColor: "#EA3F23",
                    borderRadius: "20px",
                    width: "300px",
                  }}
                >
                  Checkout
                </button>
              </Link>
            </div>
          </div>
          <br />
          <div style={{ background: "#fffaf7", padding: "10px 20px" }}>
            <div className="down">
              <div className="card" style={{ width: "18rem" }}>
                <div className="card-body">
                  <h5 className="card-title" style={{ textAlign: "center" }}>
                    Product Title
                  </h5>
                </div>
                <hr />
                <div className="card-body">
                  <p>This is a dummy text description of the product</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

)}

    </>
  );
};

export default Cart;
