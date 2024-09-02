import React, { useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import "./SearchBar.css";

const IconSearchBar = () => {
  const [isHovered, setIsHovered] = useState(false);

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
        />
      )}
    </div>
  );
};

export default IconSearchBar;
