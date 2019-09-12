import React from 'react';
import PropTypes from 'prop-types';

class DataDownloadButton extends React.Component {
  constructor(props) {
    super(props);
    this.downloadCsv = this.downloadCsv.bind(this);
  }

  downloadCsv() {
    const { data } = this.props;
    const { records } = data;
    const headers = Object.keys(records);
    const columns = Object.values(records);
    const bodyRows = columns[0].map((cell, rowIndex) => columns.map(column => `"${column[rowIndex]}"`));
    const rows = [headers].concat(bodyRows);
    const csvContent = `data:text/csv;charset=utf-8,${rows.map(row => row.join(',')).join('\n')}`;
    window.open(encodeURI(csvContent));
  }

  render() {
    const { children } = this.props;

    return (
      <button className="btn btn--primary btn--chart-toggle" type="button" onClick={this.downloadCsv}>
        {children}
      </button>
    );
  }
}

export default DataDownloadButton;

DataDownloadButton.propTypes = {
  data: PropTypes.object.isRequired,
  children: PropTypes.string.isRequired,
};
