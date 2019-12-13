import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Papa from 'papaparse';

class DataDownloadButton extends React.Component {
  csvContent() {
    // https://github.com/mholt/PapaParse/issues/175#issuecomment-75597039
    const { data } = this.props;
    const blob = new Blob([Papa.unparse(data)], { type: 'text/csv;charset=utf-8;' });
    return window.URL.createObjectURL(blob);
  }

  render() {
    const { fileName, data } = this.props;

    if (!data) {
      return <A className="btn btn--primary btn--chart-toggle btn--disabled">Download (CSV)</A>;
    }

    return (
      <A
        className="btn btn--primary btn--chart-toggle"
        href={this.csvContent()}
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
  data: PropTypes.array,
  fileName: PropTypes.string.isRequired,
};

const A = styled.a`
  text-transform: none !important;
`;
