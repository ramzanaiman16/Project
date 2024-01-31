import React, { useState, useEffect } from 'react';
import { BsSearch, BsXLg } from 'react-icons/bs';
import axios from 'axios';
import { Card, CardActionArea, CardMedia, CardContent, Typography } from '@mui/material';
import '../Search/search.css';
import Spiner from "../../components/Spiner/Spiner";

function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchType, setSearchType] = useState('Photos');
  const [showspin, setShowSpin] = useState(false);  // Initialize showSpin as false

  const userToken = localStorage.getItem('userToken');
  const axiosInstance = axios.create({
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });

  const handleSearch = async () => {
    try {
      // Show the spinner before making the request
      setShowSpin(true);

      const response = await axiosInstance.get('https://sttockery.netlify.app/.netlify/functions/App/product/search', {
        params: {
          description: searchTerm,
        },
      });

      // Hide the spinner after receiving the response
      setShowSpin(false);

      setSearchResults(response.data);
    } catch (error) {
      console.error('Error during search:', error);
    }
  };

  const handleSearchTypeChange = (event) => {
    setSearchType(event.target.value);
  };

  const handleClearResults = () => {
    setSearchResults([]);
    setSearchTerm('');
  };

  useEffect(() => {
    // You can keep this useEffect for the initial spinner display
    setTimeout(() => {
      setShowSpin(false);
    }, 1200);
  }, []);

  return (
    <>
      <div className="search-home">
        <form>
          <div className="inner-form-home">
            <h1>Sell your vision, buy your inspiration</h1>
            <div className="inner-form-search-home">
              <input
                id="search"
                type="text"
                placeholder="Enter Keywords?"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <div className="clear-results" onClick={handleClearResults}>
                  <BsXLg style={{ cursor: 'pointer', marginLeft: '20px', marginRight: '20px' }} />
                </div>
              )}
              <button className="btn-search-sh-se" type="button" onClick={handleSearch}>
                <BsSearch />
              </button>
            </div>
          </div>
        </form>
        {showspin ? (
          <Spiner />
        ) : (
          /* Display search results */
          searchResults.length > 0 && (
            <div className="search-results">
              <h2>
                Search Results:
                {searchTerm && (
                  <div style={{ marginLeft: '20px' }}>
                    <BsXLg onClick={handleClearResults} style={{ cursor: 'pointer', marginRight: '20px' }} />
                  </div>
                )}
              </h2>

              <div className="cards-container">
                {searchResults.map((product) => (
                  <Card
                    key={product.id}
                    sx={{
                      maxWidth: 200,
                      margin: 4,
                      flexBasis: 'calc(33.33% - 16px)',
                    }}
                  >
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="140"
                        image={`https://sttockery.netlify.app/.netlify/functions/App/${product.image}`}
                        alt={product.name}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          ${product.price}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {product.description}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                ))}
              </div>
            </div>
          )
        )}
      </div>
    </>
  );
}

export default Search;
