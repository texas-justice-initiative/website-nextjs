import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import styled from 'styled-components'

class Pagelinks extends React.Component {
  render() {
    let { page, perPage, news } = this.props
    const pageCount = Math.ceil(news.length / perPage)
    page = parseInt(page)
    if (Number.isNaN(page) || page < 1 || page > pageCount) {
      page = 1
    }
    const pageLinks = []
    for (let pageNumber = 1; pageNumber <= pageCount; pageNumber += 1) {
      if (pageNumber === page) {
        pageLinks.push(
          <PageNumber className="current" key={pageNumber}>
            {pageNumber}
          </PageNumber>
        )
      } else {
        const pagePath = `/news?page=${pageNumber}`

        pageLinks.push(
          <Link
            href={pagePath}
            key={pageNumber}
            style={{ textDecoration: 'none' }}
          >
            <PageNumber>{pageNumber}</PageNumber>
          </Link>
        )
      }
    }
    return <div style={{ textAlign: 'center' }}>{pageLinks}</div>
  }
}

export default Pagelinks
Pagelinks.propTypes = {
  page: PropTypes.number,
  perPage: PropTypes.number,
  news: PropTypes.array,
}

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
`
