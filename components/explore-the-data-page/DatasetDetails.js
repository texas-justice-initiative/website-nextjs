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
          <li>{datasetName}</li>
          <li>{datasetDescription}</li>
          <li>Total Incidents: {totalIncidents}</li>
        </ul>
      </div>
      <div className="col-left">
        <DataDownloadButton data={data} fileName={fileName}>
          Download (CSV)
        </DataDownloadButton>
      </div>
    </Details>
  );
}

DatasetDetails.propTypes = {
  datasetName: PropTypes.string.isRequired,
  datasetDescription: PropTypes.string,
  totalIncidents: PropTypes.number,
  data: PropTypes.object.isRequired,
  fileName: PropTypes.string.isRequired,
};

const Details = styled.div``;
