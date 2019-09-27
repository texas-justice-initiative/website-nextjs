import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

class DataDownloadButton extends React.Component {
  constructor(props) {
    super(props);
    this.downloadCsv = this.downloadCsv.bind(this);
  }

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

  downloadCsv() {
    const { fileName } = this.props;
    const hiddenElement = document.createElement('a');
    hiddenElement.href = encodeURI(this.csvContent());
    hiddenElement.target = '_blank';
    hiddenElement.download = fileName;
    hiddenElement.click();
  }

  render() {
    const { children } = this.props;

    return (
      <Button className="btn btn--primary btn--chart-toggle" type="button" onClick={this.downloadCsv}>
        {children}
      </Button>
    );
  }
}

export default DataDownloadButton;

DataDownloadButton.propTypes = {
  data: PropTypes.object.isRequired,
  fileName: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
};

const Button = styled.button`
  margin: 0 0 4rem 0;
  text-transform: none !important;
`;
