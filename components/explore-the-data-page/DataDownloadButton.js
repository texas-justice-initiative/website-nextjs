import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Papa from 'papaparse';
import download from 'downloadjs';
import Modal from '../Modal';

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
        {downloadStarted && (
          <Modal>
            <h2 className="tji-modal__title">Before you go...</h2>
            <p className="tji-modal__description">
              TJI provides its data to all users for free. Please consider making a contribution so we can continue to
              be a free resource.
            </p>
            <div className="tji-modal__actions">
              <button type="button" className="btn btn--primary" onClick={() => window.open('/donate', '_blank')}>
                Donate!
              </button>
            </div>
          </Modal>
        )}
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
