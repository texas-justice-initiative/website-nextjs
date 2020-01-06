import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import styled from 'styled-components';
import DataDownloadButton from './DataDownloadButton';

export default function DatasetDetails(props) {
  const { datasetName, datasetDescription, lastUpdated, totalIncidents, data, fileName } = props;
  return (
    <Details>
      <div className="col-left">
        <ul>
          <li>
            <h2>{datasetName}</h2>
            {lastUpdated && <span className="last-updated">Last updated: {lastUpdated}</span>}
          </li>
          {datasetDescription && <li>{datasetDescription}</li>}
          <li className="total-incidents">Total Incidents: {totalIncidents}</li>
        </ul>
      </div>
      <div className="col-right">
        <DataDownloadButton data={data} fileName={fileName} />
        <Link href="/map">
          <a>View Map</a>
        </Link>
      </div>
    </Details>
  );
}

DatasetDetails.propTypes = {
  datasetName: PropTypes.string.isRequired,
  datasetDescription: PropTypes.string,
  lastUpdated: PropTypes.string,
  totalIncidents: PropTypes.string.isRequired,
  data: PropTypes.array,
  fileName: PropTypes.string.isRequired,
};

const Details = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  background: ${props => props.theme.colors.grayLightest};
  border: 1px solid ${props => props.theme.colors.grayLight};
  padding: 2rem;
  margin: 2rem 0;

  .col-left {
    max-width: 415px;
    margin-bottom: 2rem;
  }

  .col-right {
    text-align: left;

    > a:not(.btn) {
      text-decoration: none;
    }

    > .btn {
      display: block;
      margin-bottom: 2rem;
    }
  }

  ul {
    li:nth-child(2) {
      margin: 2rem 0;
    }
  }

  h2 {
    color: ${props => props.theme.colors.black};
  }

  .last-updated {
    color: ${props => props.theme.colors.gray};
    font-size: ${props => props.theme.sidebarFont__size};
    margin-bottom: 1rem;
  }

  .total-incidents {
    font-weight: 800;
    margin-top: 1rem;
  }

  @media screen and (min-width: ${props => props.theme.large}) {
    .col-left {
      max-width: 500px;
      margin-bottom: 0;
    }

    .col-right {
      text-align: right;

      > a:not(.btn) {
        margin-right: 1rem;
      }
    }
  }
`;
