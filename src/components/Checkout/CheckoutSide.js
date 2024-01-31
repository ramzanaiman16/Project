// import './checkout.css';
// import React from 'react';
// import { useSelector } from 'react-redux';
// import {loadStripe} from '@stripe/stripe-js'; 
// import axios from 'axios'

// const CheckoutSide = () => {
//   const cartItems = useSelector((state) => state.cart.cart);

//   const calculateTotal = () => {
//     let total = 0;
//     cartItems.forEach((item) => {
//       total += item.price;
//     });
//     return total;
//   };


//   const makePayment = async () => {
//     const stripe = await loadStripe("pk_test_51OPN0VD6zgRfczWsi9HpxrkCjNWwZxTMo6uKLw6PDnsRCFxduv07oVG7tAt4FSXRMX3j0k9EwkDdyLrpktV7jN8y00L2v8BsYY");
  
//     const body = {
//       products: cartItems
//     };
  
//     const headers = {
//       "Content-Type": "application/json"
//     };
  
//     try {
//       const response = await axios.post("http://localhost:5000/api/create-checkout-session", body, { headers });
  
//       const session = response.data;
  
//       const result = await stripe.redirectToCheckout({
//         sessionId: session.id
//       });
  
//       if (result.error) {
//         console.log(result.error);
//       }
//     } catch (error) {
//       console.error("Error making payment:", error);
//     }
//   };
  
//   return (
//     <>
//       <div className="checkout__order">
//         <h5>Your order</h5>
//         <div className="checkout__order__product">
//           <ul>
//             {cartItems.map((item, index) => (
//               <li key={index}>
//                 <span className="top__text">Product</span>
//                 <img src={item.image} alt={`Selected Product ${index + 1}`} />
//                 <div className="cart-item-info">
//                   <p>{item.description}</p>
//                 </div>
//                 <span>${item.price.toFixed(2)}</span>
//               </li>
//             ))}
//           </ul>
//         </div>
//         <div className="checkout__order__total">
//           <ul>
//             <li>Subtotal <span>${calculateTotal().toFixed(2)}</span></li>
//             <li>Total <span>${calculateTotal().toFixed(2)}</span></li>
//           </ul>
//         </div>
//         <div className="checkout__order__widget">
//           <label htmlFor="o-acc">
//             <input type="checkbox" id="o-acc" />
//             <span className="checkmark"></span>
//             Create an account?
//           </label>
//           <p>Create an account by entering the information below. If you are a returning customer, login at the top of the page.</p>
//           <label htmlFor="check-payment">
//             <input type="checkbox" id="check-payment" />
//             <span className="checkmark"></span>
//             Cheque payment
//           </label>
//           <label htmlFor="paypal">
//             <input type="checkbox" id="paypal" />
//             <span className="checkmark"></span>
//             PayPal
//           </label>
//         </div>
//         <form onSubmit={(e) => e.preventDefault()}>
//           <button type="submit"  className="site-btn">
//             Place order
//           </button>
//         </form>
//       </div>
//     </>
//   );
// };

// export default CheckoutSide;