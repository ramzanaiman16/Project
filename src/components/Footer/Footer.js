import React from 'react';
import '../Footer/footer.css';
import Logo from '../Logo/Logo'
import { FaFacebook } from "react-icons/fa6";
import { FaTwitter ,FaLink  } from "react-icons/fa";
import { GrInstagram } from "react-icons/gr";



const Footer = () => {
  return (
    <>
    
    <footer class="footer">
  	 <div class="container">
  	 	<div class="row">
  	 		<div class="footer-col">
  	 			{<Logo/>}
  	 			<p>
           Explore a vast collection of high-quality images, photos, videos and sounds on our website dedicated to online sales.
          </p>
          <div class="social-links">
          <a href="#"><FaFacebook /></a>
  	 				<a href="#"><FaTwitter/></a>
  	 				<a href="#"><GrInstagram/></a>
  	 				<a href="#"><FaLink /></a>
  	 			</div>
  	 		</div>
  	 		<div class="footer-col">
  	 			<h4>Quick Links</h4>
  	 			<ul>
  	 				<li><a href="#">About</a></li>
  	 				<li><a href="#">Blogs</a></li>
  	 				<li><a href="#">Contact</a></li>
  	 				<li><a href="#">FAQ</a></li>
  	 				<li><a href="/privacyPolicy">PrivacyPolicy</a></li>
  	 				
  	 				<li><a href="/cookie">Cookie policy</a></li>
  	 			</ul>
  	 		</div>
  	 		<div class="footer-col">
  	 			<h4>Account</h4>
  	 			<ul>
  	 				<li><a href="#">My Account</a></li>
  	 				<li><a href="#">Orders Tracking</a></li>
  	 				<li><a href="#">Checkout</a></li>
  	 				<li><a href="#">Wishlist</a></li>
  	 			</ul>
  	 		</div>
  	 		<div class="footer-col">
  	 			<h4>social Media</h4>
  	 			<div class="social-links">
  	 				<a href="#"><FaFacebook /></a>
  	 				<a href="#"><FaTwitter/></a>
  	 				<a href="#"><GrInstagram/></a>
  	 				<a href="#"><FaLink /></a>
  	 				<a href="#"><FaLink /></a>
  	 			</div>
          <button className='btn'> Review</button>
  	 		</div>
  	 	</div>
  	 </div>
  </footer>
    
    </>
        );
};

        export default Footer;