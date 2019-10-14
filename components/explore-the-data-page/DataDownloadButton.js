import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

class DataDownloadButton extends React.Component {
  csvRows() {
    const { data } = this.props;
    const { records } = data;
    const headers = Object.keys(records);
    const columns = Object.values(records);
    const bodyRows = columns[0].map((cell, rowIndex) => columns.map(column => `"${column[rowIndex]}"`));

    return [headers].concat(bodyRows);
  }

  csvContent() {
    const csvBody = this.csvRows()
      .map(row => row.join(','))
      .join('\n');

    return `data:text/csv;charset=utf-8,${csvBody}`;
  }

  render() {
    const { fileName } = this.props;

    return (
      <A
        className="btn btn--primary btn--chart-toggle"
        href={encodeURI(this.csvContent())}
        download={fileName}
        target="_blank"
        rel="noopener noreferrer"
      >
        Download (CSV)
      </A>
    );
  }
}

export default DataDownloadButton;

DataDownloadButton.propTypes = {
  data: PropTypes.object.isRequired,
  fileName: PropTypes.string.isRequired,
};

const A = styled.a`
  margin: 0 0 4rem 0;
  text-transform: none !important;
`;
