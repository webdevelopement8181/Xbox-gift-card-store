import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';  
import SearchIcon from '@mui/icons-material/Search';
import "./SearchBar.css";

const IconSearchBar = () => {
  const [query, setQuery] = useState('');  
  const [isHovered, setIsHovered] = useState(false); 
  const navigate = useNavigate();  

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {  // Check if the pressed key is Enter
      navigate(`/search?q=${query}`);  // Navigate to /search with the search query as a parameter
    }
  };

  return (
    <div
      className={`icon-search-bar ${isHovered ? "expanded" : ""}`}  
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <SearchIcon />
      {isHovered && (
        <input
          type="text"
          className="input-search"
          placeholder="Type to Search..."
          value={query}           
          onChange={handleInputChange} 
          onKeyDown={handleKeyDown}    
        />
      )}
    </div>
  );
};

export default IconSearchBar;
