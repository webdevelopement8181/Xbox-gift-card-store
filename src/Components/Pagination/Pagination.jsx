import React from 'react';
import { Pagination as MUIPagination, PaginationItem, Button } from '@mui/material';

const Pagination = ({ productsPerPage, totalProducts, paginate, currentPage }) => {
  const pageNumbers = Math.ceil(totalProducts / productsPerPage);

  const handlePageChange = (event, value) => {
    paginate(value);
  };

  return (
    <nav style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
      <Button
        variant="contained"
        color="primary"
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1}
        style={{ marginRight: '10px' }}
      >
        Previous
      </Button>

      <MUIPagination
        count={pageNumbers}
        page={currentPage}
        onChange={handlePageChange}
        renderItem={(item) => (
          <PaginationItem {...item} />
        )}
        siblingCount={1}
        boundaryCount={1}
        color="primary"
        shape="rounded"
      />

      <Button
        variant="contained"
        color="primary"
        onClick={() => paginate(currentPage + 1)}
        disabled={currentPage === pageNumbers}
        style={{ marginLeft: '10px' }}
      >
        Next
      </Button>
    </nav>
  );
};

export default Pagination;
