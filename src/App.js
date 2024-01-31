import './App.css';
import Home from "../src/pages/Home/Home"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from "../src/pages/Login/Login"
import Register from "../src/pages/register/Register"
import ErrorPage from '../src/pages/ErrorPage'
import Navbar from '../src/components/Navbar/Navbar'
import Footer from "../src/components/Footer/Footer"
import PrivacyPolicy from "../src/components/privacy policy/PrivacyPolicy"
import Cookie from "../src/components/Cookie/Cookie"
import Shop from "../src/components/Search/Search"
import Products from "../src/components/product/Products"
import Cart from "./pages/Cart/Cart"
import Checkout from './components/Checkout/Checkout';
import Upload from './components/Upload/Upload';
import ProtectedRoutes from './ProtectedRoutes';
import EditProduct from '../src/components/product/EditProduct';
import Success from './components/payment/Success';
import Cancel from './components/payment/Cancel';
import CustomersList from './components/customerList/CustomersList';
import CheckoutForm from './components/Checkout/CheckoutForm';
import Chat from './components/Websokets/Chat';
import ChatConnection from './components/Websokets/ChatConnection';
import ProductReviews from './components/ProductReviews/ProductReviews';
import ReviewPage from './components/ProductReviews/ReviewPage';
import DetailsAndreviews from './components/product/DetailsAndreviews';
import Dashboard from './components/AdminSide/Dashboard';
import AdminProducts from './components/AdminSide/AdminProducts';
import AllUsersList from './components/AdminSide/AllUsersList';
import EditUser from './components/AdminSide/EditUser';
import OrderHistories from './components/AdminSide/OrderHistories';
import PaymentHistories from './components/AdminSide/PaymentHistories';



function App() {

  return (
    <>

      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route element= {<ProtectedRoutes/>}>
          <Route path="/" element={<Home />} />
          <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
          <Route path="/cookie" element={<Cookie />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/products" element={<Products />} />
          <Route path="/detailsAndReviews/:id" element={<DetailsAndreviews />} />
          <Route path="/edit/:id" element={<EditProduct />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path='/customerList' element={<CustomersList/>}/>
          <Route path="*" element={<ErrorPage />} />
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />
          <Route path='/checkoutForm' element={<CheckoutForm />} />
          <Route path='/chatConnection' element={<ChatConnection />} />
          <Route path='/reviews' element={<ReviewPage />} />
          <Route path='/productReviews' element={<ProductReviews />} />
          <Route path='/admin-dashboard' element={<Dashboard />} />
          <Route path='/admin-products' element={<AdminProducts />} />
          <Route path='/admin/allUsers' element={<AllUsersList />} />
          <Route path='/admin/edit/:id' element={<EditUser />} />
          <Route path='/admin/:id/orderHistories' element={<OrderHistories />} />
          <Route path='/admin/:id/PaymentHistories' element={<PaymentHistories />} />
          </Route>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </BrowserRouter>

    </>
  );
}

export default App;
