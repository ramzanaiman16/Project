import React, { useState, useEffect } from 'react'
import Sidebar from "../../components/Sidebar/Sidebar"
import Shop from '../Shop/Shop'
import Spiner from "../../components/Spiner/Spiner"


const Home = () => {
  const [showspin, setShowSpin] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowSpin(false);
    }, 1200);
  }, []);
  return (
    <>


      {showspin ? <Spiner /> : (
        <>
          <Sidebar />
          <Shop />
        </>

      )}
    </>
  )
}

export default Home
