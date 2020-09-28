import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Papa from 'papaparse';
import download from 'downloadjs';
import SurveyModal from '../SurveyModal';

class DataDownloadButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      downloadStarted: false,
    };
  }

  startDownload(fileName) {
    const { data } = this.props;
    const blob = new Blob([Papa.unparse(data)], { type: 'text/csv;charset=utf-8;' });

    download(blob, fileName);

    this.setState({
      downloadStarted: true,
    });
  }

  render() {
    const { fileName, data } = this.props;
    const { state } = this;
    const { downloadStarted } = state;

    if (!data) {
      return <A className="btn btn--primary btn--chart-toggle btn--disabled">Download (CSV)</A>;
    }

    return (
      <React.Fragment>
        <A
          className="btn btn--primary btn--chart-toggle"
          download={fileName}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => this.startDownload(fileName)}
        >
          Download (CSV)
        </A>
        {downloadStarted && <SurveyModal />}
      </React.Fragment>
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
