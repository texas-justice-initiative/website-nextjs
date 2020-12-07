import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';

const DataTable = ({ datasets }) => (
  <Container>
    <div className="headers">
      <div className="first-col">Data set</div>
      <div className="second-col">Last updated</div>
    </div>
    <div className="datasets">
      {datasets.map((dataset, index) => (
        <div className="dataset" key={index}>
          <div className="first-col">
            <h4 className="dataset-title">{dataset.title}</h4>
            <div className="dataset-date">{dataset.date}</div>
            <p className="dataset-description">{dataset.description}</p>
          </div>
          <div className="second-col dataset-date-md">{dataset.date}</div>
          <Link href={dataset.link}>
            <a className="dataset-link">View</a>
          </Link>
        </div>
      ))}
    </div>
  </Container>
);
export default DataTable;

DataTable.propTypes = {
  datasets: PropTypes.array.isRequired,
};

const Container = styled.div`
  padding: 2rem 0;

  @media (min-width: ${props => props.theme.medium}) {
    .first-col {
      width: 65%;
      margin-right: 3rem;
    }

    .second-col {
      width: 20%;
      margin-right: 1.5rem;
    }
  }

  .headers {
    display: none;
    font-weight: ${props => props.theme.fontWeights.bold};
    text-transform: uppercase;

    @media (min-width: ${props => props.theme.medium}) {
      display: flex;
      margin: 1.25rem 0;
    }
  }

  .datasets {
    .dataset:first-child {
      border-top: 6px solid ${props => props.theme.colors.primaryBlue};
    }

    .dataset {
      border-top: 1px solid ${props => props.theme.colors.gray};
      padding: 3rem 0;

      @media (min-width: ${props => props.theme.medium}) {
        display: flex;
      }

      .dataset-title {
        color: ${props => props.theme.colors.black};
        font-weight: ${props => props.theme.fontWeights.bold};
        letter-spacing: ${props => props.theme.letterSpacings.medium};
      }

      .dataset-date {
        font-size: ${props => props.theme.fontSizes.sm};
        line-height: ${props => props.theme.lineHeights.sm};

        @media (min-width: ${props => props.theme.medium}) {
          display: none;
        }
      }

      .dataset-description {
        color: ${props => props.theme.colors.grayDark};
        font-size: ${props => props.theme.fontSizes.sm};
        line-height: ${props => props.theme.lineHeights.sm};

        @media (min-width: ${props => props.theme.medium}) {
          margin-bottom: 0;
          font-size: ${props => props.theme.fontSizes.md};
          line-height: ${props => props.theme.lineHeights.md};
        }
      }

      .dataset-date-md {
        display: none;

        @media (min-width: ${props => props.theme.medium}) {
          display: block;
        }
      }

      .dataset-link {
        font-weight: ${props => props.theme.fontWeights.bold};
        text-transform: uppercase;
      }
    }
  }
`;
