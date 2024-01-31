// import React, { useState } from 'react';


// const ShopSidebar = () => {
//   const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });

//   // Function to handle price range change
//   const handleRangeChange = (e) => {
//     const { name, value } = e.target;
//     setPriceRange((prevRange) => ({
//       ...prevRange,
//       [name]: parseInt(value, 10),
//     }));
//   };

//   return (
//     <div className="c">
//       <div className="shop__sidebar">
//         <div className="sidebar__categories">
//           <div className="section-title">
//             <h3>Filters</h3>
//           </div>
//         </div>
//         <h4>Shop by price</h4>
//             <hr />
//         <div className="sidebar__filter">
//           <div className="filter-range-wrap">
//             <div className="price">
//               <p>Price:</p>
//               <input
//                 type="range"
//                 id="priceRangeMin"
//                 name="min"
//                 min="0"
//                 max="5000"
//                 value={priceRange.min}
//                 onChange={handleRangeChange} style={{width: '200px'}}
//               /><br/>
//               <span>${priceRange.min} - ${priceRange.max}</span>
//             </div>
//           </div>
//         </div>
//         <h4>Shop by Review</h4>
//             <hr />
//         <div className="sidebar__sizes">
//           <div className="size__list">
//             <label htmlFor="xxs">
//               <div className="review-stars mt-3">
//                 <input type="checkbox" id="xxs" />
//                 <span className="fa fa-star checked"></span>
//                 <span className="fa fa-star checked"></span>
//                 <span className="fa fa-star checked"></span>
//                 <span className="fa fa-star checked"></span>
//                 <span className="fa fa-star checked"></span>
//                 <span className="">(222)</span>
//               </div>
//               <div className="review-star mt-3">
//                 <input type="checkbox" id="xxs" />
//                 <span className="fa fa-star checked"></span>
//                 <span className="fa fa-star checked"></span>
//                 <span className="fa fa-star checked"></span>
//                 <span className="fa fa-star checked"></span>
//                 <span className="fa fa-star unchecked"></span>
//                 <span className="">(222)</span>
//               </div>
//               <div className="review-stars mt-3">
//                 <input type="checkbox" id="xxs" />
//                 <span className="fa fa-star checked"></span>
//                 <span className="fa fa-star checked"></span>
//                 <span className="fa fa-star checked"></span>
//                 <span className="fa fa-star unchecked"></span>
//                 <span className="fa fa-star unchecked"></span>
//                 <span className="">(222)</span>
//               </div>
//               <div className="review-stars mt-3">
//                 <input type="checkbox" id="xxs" />
//                 <span className="fa fa-star checked"></span>
//                 <span className="fa fa-star checked"></span>
//                 <span className="fa fa-star unchecked"></span>
//                 <span className="fa fa-star unchecked"></span>
//                 <span className="fa fa-star unchecked"></span>
//                 <span className="">(222)</span>
//               </div>
//             </label>
           
//           </div>
//         </div>
//         <div className="sidebar__color d-none">
//           <div className="section-title">
//             <h4>Shop by size</h4>
//           </div>
//           <div className="size__list color__list">
            
//             <label htmlFor="black">
//               Blacks
//               <input type="checkbox" id="black" />
//               <span className="checkmark"></span>
//             </label>
         
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ShopSidebar;
