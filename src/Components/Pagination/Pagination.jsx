import React from 'react';
import './Pagination.css'

const Pagination = ({ productsPerPage, totalProducts, paginate, currentPage }) => {
  const pageNumbers = [];

  // Calculate the number of pages
  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
       
      <ul className="pagination">
        {currentPage > 1 && (
          <li>
            <button onClick={() => paginate(currentPage - 1)}>Previous</button>
          </li>
        )}

        {/* Render page numbers */}
        {pageNumbers.map(number => (
          <li key={number} className={currentPage === number ? 'active' : ''}>
            <button onClick={() => paginate(number)}>
              {number}
            </button>
          </li>
        ))}

        {currentPage < pageNumbers.length && (
          <li>
            <button onClick={() => paginate(currentPage + 1)}>Next</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Pagination;
