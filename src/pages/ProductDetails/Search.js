import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BsSearch, BsXLg } from 'react-icons/bs';
import { Card, CardActionArea, CardMedia, CardContent, Typography } from '@mui/material';
import '../ProductDetails/styleSearch.css';
import Spiner from '../../components/Spiner/Spiner';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchType, setSearchType] = useState('Photos');
  const [showSpinner, setShowSpinner] = useState(true);

  const userToken = localStorage.getItem('userToken');
  const axiosInstance = axios.create({
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });

  const handleSearch = async () => {
    try {
      const response = await axiosInstance.get('https://sttockery.netlify.app/.netlify/functions/App/product/search', {
        params: {
          description: searchTerm,
          type: searchType,
        },
      });

      setSearchResults(response.data);
    } catch (error) {
      console.error('Error during search:', error);
      // Handle error: You might want to show an error message to the user
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
    setTimeout(() => {
      setShowSpinner(false);
    }, 1200);
  }, []);

  return (
    <>
      <div className="s003-search">
        <form>
          <div className="inner-form-search">
            <input
              id="search"
              type="text"
              placeholder="Enter Keywords?"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <div style={{ marginLeft: '20px' }}>
                <BsXLg onClick={handleClearResults} style={{ cursor: 'pointer', marginRight: '20px' }} />
              </div>
            )}
            <button className="btn-search-sh" type="button" onClick={handleSearch}>
              <BsSearch />
            </button>
            <select className="select-option" value={searchType} onChange={handleSearchTypeChange}>
              <option>Photos</option>
              <option>Videos</option>
              <option>Music</option>
            </select>
          </div>
        </form>

        {showSpinner ? (
          <Spiner />
        ) : (
          <>
            {searchResults.length > 0 && (
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
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Search;
