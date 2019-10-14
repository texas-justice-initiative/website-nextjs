import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import DataDownloadButton from './DataDownloadButton';

export default function DatasetDetails(props) {
  const { datasetName, datasetDescription, totalIncidents, data, fileName } = props;
  return (
    <Details>
      <DataDownloadButton data={data} fileName={fileName}>
        Download (CSV)
      </DataDownloadButton>
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
