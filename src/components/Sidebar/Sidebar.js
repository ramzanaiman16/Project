// Sidebar.js

import React, { useState } from 'react';
import './sidebar.css';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6';
import Search from "../Search/Search";
import Filter from '../Filter/Filter';


const Sidebar = () => {
  const [visible, setVisible] = useState(false);

  const handleClick = () => {
    setVisible(!visible);
  };

  return (
    <>
    <div className="sidebar-container">
      <div className={`sidebar ${visible ? 'visible' : ''}`}>
        <button className="arrow" onClick={handleClick}>
          {visible ? <FaArrowRight /> : <FaArrowLeft />}
        </button>
        {visible && (
          <div className="sidebar-content">
            <ul style={{listStyle:"dot"}}>
              <li>All</li>
            <ul>
              <li>images</li>
              <ul>
              <li>png</li>
              <li>jpg</li>
              <li>svg</li>
            </ul>
            </ul>
            <ul>
              <li>illustration</li>
            </ul>
            <ul>
              <li>vedio</li>
              <ul>
              <li>mp4</li>
              <li>3gp</li>
              <li>vedio</li>
            </ul>
            </ul>
            <ul>
              <li>Icons</li>
            </ul>
            <ul>
              <li>Sounds</li>
            </ul>
            <ul>
              <li>Calender</li>
            </ul>
            </ul>
          
          </div>
        )}
      </div>
        <Search />
    </div>

    <Filter/>
    </>
  );
};

export default Sidebar;
