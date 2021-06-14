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

  @media (min-width: ${props => props.theme.breakpoints.medium}) {
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
    font-weight: ${props => props.theme.typography.weights.bold};
    text-transform: uppercase;

    @media (min-width: ${props => props.theme.breakpoints.medium}) {
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

      @media (min-width: ${props => props.theme.breakpoints.medium}) {
        display: flex;
      }

      .dataset-title {
        color: ${props => props.theme.colors.black};
        font-weight: ${props => props.theme.typography.weights.bold};
        letter-spacing: ${props => props.theme.typography.letter_spacings.headings.medium};
      }

      .dataset-date {
        font-size: ${props => props.theme.typography.sizes.body.small};
        line-height: ${props => props.theme.typography.line_heights.body.small};

        @media (min-width: ${props => props.theme.breakpoints.medium}) {
          display: none;
        }
      }

      .dataset-description {
        color: ${props => props.theme.colors.grayDark};
        font-size: ${props => props.theme.typography.sizes.body.small};
        line-height: ${props => props.theme.typography.line_heights.body.small};

        @media (min-width: ${props => props.theme.breakpoints.medium}) {
          margin-bottom: 0;
          font-size: ${props => props.theme.typography.sizes.body.regular};
          line-height: ${props => props.theme.typography.line_heights.body.medium};
        }
      }

      .dataset-date-md {
        display: none;

        @media (min-width: ${props => props.theme.breakpoints.medium}) {
          display: block;
        }
      }

      .dataset-link {
        font-weight: ${props => props.theme.typography.weights.bold};
        text-transform: uppercase;
      }
    }
  }
`;
