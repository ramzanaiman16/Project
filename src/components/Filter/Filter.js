import React, { useState,useEffect } from 'react';
import '../Filter/filter.css';
import img1 from '../Filter/images/z1.jpg';
import img2 from '../Filter/images/z2.jpg';
import Spiner from "../../components/Spiner/Spiner"

const Filteritem = () => {
  const [priceRange, setPriceRange] = useState({ min: 0, max: 5000 });
  const [filter, setFilter] = useState('all');
  const [showspin, setShowSpin] = useState(true);
  

  const handleFilterClick = (filterType) => {
    setFilter(filterType);
  };

  const Filter = () => {
    const [dropdown, setDropdown] = useState(false);

    const handleDropdown = () => {
      setDropdown(!dropdown);
    };

    const products = [
      { id: 1, name: 'Product 1', category: 'women', image: img1 },
      { id: 2, name: 'Product 2', category: 'men', image: img2 },
      { id: 6, name: 'Product 6', category: 'men', image: img1 },
      { id: 3, name: 'Product 3', category: 'women', image: img2 },
      { id: 4, name: 'Product 4', category: 'men', image: img1 },
      { id: 5, name: 'Product 5', category: 'men', image: img2 },
    ];

    const handleRangeChange = (e) => {
      setPriceRange({ ...priceRange, [e.target.name]: e.target.value });
    };

    const filteredProducts = products.filter((product) => {
      if (filter === 'all') {
        return true;
      }
      return product.category === filter;
    });
    useEffect(() => {
      setTimeout(() => {
          setShowSpin(false);
      }, 1200);
  }, []);

    return (
      <>
        <div className="filter__container">
          <div className="filter__list">
            <div className="filter__item">
              <button className="filter__btn" onClick={handleDropdown}>
                Time
              </button>
              {dropdown && (
                <ul className="filter__dropdown">
                  <li><a href="">The Most Recent</a></li>
                  <li>The Oldest</li>
                  <li>A Week Now</li>
                  <li>A Month Ago</li>
                </ul>
              )}
            </div>
            <div className="filter__item">
              <button className="filter__btn" onClick={handleDropdown}>
                Tags
              </button>
              {dropdown && (
                <ul className="filter__dropdown">
                  <li> <input type="checkbox" /> Mountain</li>
                  <li><input type="checkbox" /> Women</li>
                  <li><input type="checkbox" /> Animal</li>
                  <li><input type="checkbox" /> Men</li>
                </ul>
              )}
            </div>
            <div className="filter__item">
              <button className="filter__btn" onClick={handleDropdown}>
                Most Popular
              </button>
              {dropdown && (
                <ul className="filter__dropdown">
                  <li> <input type="checkbox" /> Most Viewed</li>
                  <li><input type="checkbox" /> Most Appreciate</li>
                </ul>
              )}
            </div>
            <div className="col-lg-3">
              <ul className="filter__controls">
                <li className="sidebar__filter">
                  <div className="filter-range-wrap">
                    <div className="range-slider">
                    <input
                type="range"
                id="priceRangeMin"
                name="min"
                min="0"
                max="5000"
                value={priceRange.min}
                onChange={handleRangeChange} style={{width: '200px'}}
              /><br/>
         <bold><span> Price:${priceRange.min} - ${priceRange.max}</span></bold> 
                     
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div className="col-lg-2 col-offset-2 multitag ">
              <div className="round">
                <span>Search</span>
              </div>
            </div>
          </div>

        </div>
      </>
    );
  };

  return <Filter />;
};

export default Filteritem;
