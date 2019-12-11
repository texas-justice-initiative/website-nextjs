import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

function Step1(props) {
  const { currentStep, handleClick } = props;
  return (
    <React.Fragment>
      <h3>Step {currentStep}</h3>
      <button
        type="button"
        onClick={() => {
          handleClick(currentStep);
        }}
      >
        Next
      </button>
    </React.Fragment>
  );
}

Step1.propTypes = {
  currentStep: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired,
};

function Step2(props) {
  const { currentStep, handleClick } = props;
  return (
    <React.Fragment>
      <h3>Step {currentStep}</h3>
      <button
        type="button"
        onClick={() => {
          handleClick(currentStep);
        }}
      >
        Next
      </button>
    </React.Fragment>
  );
}

Step2.propTypes = {
  currentStep: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired,
};

class SurveyModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentStep: 1,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(step) {
    this.setState({
      currentStep: step + 1,
    });
  }

  render() {
    const { state } = this;
    const { currentStep } = state;
    return (
      <React.Fragment>
        <Container>
          <div className="survey-form">
            {currentStep === 1 && <Step1 currentStep={currentStep} handleClick={this.handleClick} />}
            {currentStep === 2 && <Step2 currentStep={currentStep} handleClick={this.handleClick} />}
          </div>
        </Container>
      </React.Fragment>
    );
  }
}
export default SurveyModal;

const Container = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 97;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: ${props => props.theme.colors.black};
    opacity: 0.25;
    z-index: 98;
  }

  .survey-form {
    background: ${props => props.theme.colors.white};
    border-radius: 5px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
    padding: 2rem;
    z-index: 99;
  }
`;
