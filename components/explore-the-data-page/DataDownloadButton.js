import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Papa from 'papaparse';
import download from 'downloadjs';
import Modal from '../Modal';
import SurveyModal from '../SurveyModal';

class DataDownloadButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataLicenseModalOpen: false,
      downloadStarted: false,
    };
  }

  startDownload(fileName) {
    const { data } = this.props;
    const blob = new Blob([Papa.unparse(data)], { type: 'text/csv;charset=utf-8;' });

    download(blob, fileName);

    this.setState({
      dataLicenseModalOpen: false,
      downloadStarted: true,
    });
  }

  render() {
    const { fileName, data } = this.props;
    const { state } = this;
    const { dataLicenseModalOpen, downloadStarted } = state;

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
          onClick={() => this.setState({ dataLicenseModalOpen: true })}
        >
          Download (CSV)
        </A>
        {dataLicenseModalOpen && (
          <Modal
            button={{ text: 'Accept & Download', clickFunction: () => this.startDownload(fileName) }}
            onClose={() => this.setState({ dataLicenseModalOpen: false })}
          >
            <div>
              If you use TJI’s data, you must give TJI credit and adhere to TJI’s{' '}
              <a
                href="https://github.com/texas-justice-initiative/data-processing"
                target="_blank"
                rel="noopener noreferrer"
              >
                Data Access License Terms
              </a>
              . Pursuant to the License, you must always link back to the original TJI data set. Further, if you use the
              data set, please tag us on social media when referring to data retrieved from this site.
            </div>
          </Modal>
        )}
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
