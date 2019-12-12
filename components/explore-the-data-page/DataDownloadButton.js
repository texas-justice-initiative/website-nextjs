import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Papa from 'papaparse';

class DataDownloadButton extends React.Component {
  csvContent() {
    // https://github.com/mholt/PapaParse/issues/175#issuecomment-75597039
    const { data } = this.props;
    const blob = new Blob([Papa.unparse(data)]);
    return window.URL.createObjectURL(blob, { type: 'text/plain' });
  }

  render() {
    const { fileName, data } = this.props;

    if (!data) {
      return (
        <Button type="button" className="btn btn--primary btn--chart-toggle" disabled>
          Download (CSV)
        </Button>
      );
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

const Button = styled.button`
  text-transform: none !important;
`;
