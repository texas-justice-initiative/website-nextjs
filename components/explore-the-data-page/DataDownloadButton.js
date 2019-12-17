import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Papa from 'papaparse';
import SurveyModal from '../SurveyModal';

class DataDownloadButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataDownloaded: false,
      downloadStarted: false,
    };
  }

  componentDidMount() {
    const dataDownloaded = localStorage.getItem('dataDownloaded') === 'true';

    this.setState({
      dataDownloaded,
    });
  }

  startDownload() {
    const { state } = this;
    const { dataDownloaded } = state;

    this.setState({
      downloadStarted: true,
    });

    if (dataDownloaded) {
      this.csvContent();
    } else {
      localStorage.setItem('dataDownloaded', 'true');
      this.csvContent();
    }

    this.setState({
      dataDownloaded: true,
    });
  }

  csvContent() {
    // https://github.com/mholt/PapaParse/issues/175#issuecomment-75597039
    const { data } = this.props;
    const blob = new Blob([Papa.unparse(data)], { type: 'text/csv;charset=utf-8;' });
    return window.URL.createObjectURL(blob);
  }

  render() {
    const { fileName, data } = this.props;
    const { state } = this;
    const { downloadStarted, dataDownloaded } = state;

    if (!data) {
      return <A className="btn btn--primary btn--chart-toggle btn--disabled">Download (CSV)</A>;
    }

    return (
      <React.Fragment>
        <A
          className="btn btn--primary btn--chart-toggle"
          // href={this.csvContent()}
          download={fileName}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => this.startDownload()}
        >
          Download (CSV)
        </A>
        {downloadStarted && !dataDownloaded && <SurveyModal />}
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
