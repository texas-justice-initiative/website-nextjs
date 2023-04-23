import React from 'react';
import PropTypes from 'prop-types';
import PaginationLink from './PaginationLink';

function PaginationLinks({ basePath = '/', page = 1, totalPages = 1 }) {
  const pageLinks = [];

  for (let pageNumber = 1; pageNumber <= totalPages; pageNumber += 1) {
    pageLinks.push(
      <PaginationLink
        key={pageNumber}
        pageNumber={pageNumber}
        isCurrentPage={pageNumber === page}
        basePath={basePath}
      />
    );
  }

  if (totalPages === 1) {
    return null;
  }

  return <div style={{ textAlign: 'center' }}>{pageLinks}</div>;
}

export default PaginationLinks;

PaginationLinks.propTypes = {
  basePath: PropTypes.string,
  page: PropTypes.number,
  totalPages: PropTypes.number,
};
