import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';

function PaginationLink({ pageNumber, isCurrentPage, basePath }) {
  if (isCurrentPage) {
    return (
      <PageNumber className="current" key={pageNumber}>
        {pageNumber}
      </PageNumber>
    );
  }
  const pagePath = `${basePath}?page=${pageNumber}`;

  return (
    (<Link href={pagePath} key={pageNumber} style={{ textDecoration: 'none' }}>

      <PageNumber>{pageNumber}</PageNumber>

    </Link>)
  );
}

export default PaginationLink;

PaginationLink.propTypes = {
  pageNumber: PropTypes.number,
  isCurrentPage: PropTypes.bool,
  basePath: PropTypes.string,
};

const PageNumber = styled.span`
  padding: 0.5em 0.8em;
  border: 1px solid ${(props) => props.theme.colors.grayLight};
  margin-left: -1px;
  color: ${(props) => props.theme.colors.primaryBlue};
  background-color: ${(props) => props.theme.colors.white};
  transition: all 0.35s;

  &.current,
  &:hover {
    color: ${(props) => props.theme.colors.white};
    background-color: ${(props) => props.theme.colors.primaryBlue};
  }
`;
