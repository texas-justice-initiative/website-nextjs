import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import DataDownloadButton from './DataDownloadButton';

export default function DatasetDetails(props) {
  const { datasetName, datasetDescription, totalIncidents, data, fileName } = props;
  return (
    <Details>
      <div className="col-left">
        <ul>
          <li>
            <h2>{datasetName}</h2>
          </li>
          {datasetDescription && <li>{datasetDescription}</li>}
          <li className="total-incidents">Total Incidents: {totalIncidents}</li>
        </ul>
      </div>
      <div className="col-left">
        <DataDownloadButton data={data} fileName={fileName} />
      </div>
    </Details>
  );
}

DatasetDetails.propTypes = {
  datasetName: PropTypes.string.isRequired,
  datasetDescription: PropTypes.string,
  totalIncidents: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
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
    max-width: 500px;
  }

  .col-right {
  }

  h2 {
    color: ${props => props.theme.colors.black};
    margin-bottom: 1rem;
  }

  .total-incidents {
    font-weight: 800;
    margin-top: 1rem;
  }
`;
