import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

function Step1(props) {
  const { changeStep, cancelForm } = props;
  return (
    <React.Fragment>
      <h2 className="tji-modal__title">Thank you for visiting TJI!</h2>
      <p className="tji-modal__description">
        Can you answer a few quick questions to help us make TJI as useful as possible?
      </p>
      <div className="tji-modal__actions">
        <button type="button" onClick={() => cancelForm()} className="btn--simple">
          No Thanks
        </button>
        <button
          type="button"
          onClick={() => {
            changeStep();
          }}
          className="btn btn--primary"
        >
          Yes, of course!
        </button>
      </div>
    </React.Fragment>
  );
}

Step1.propTypes = {
  changeStep: PropTypes.func.isRequired,
  cancelForm: PropTypes.func.isRequired,
};

function Step2(props) {
  const { changeStep, updateForm } = props;
  return (
    <React.Fragment>
      <h2 className="tji-modal__title">I am a...</h2>
      <p className="tji-modal__description">
        To better understand how are data is used, it's helpful for us to know who you are. Please let us know what your
        background is by selecting a user type below.
      </p>
      <fieldset>
        <div className="tji-modal__fieldset-flex">
          <div className="tji-modal__form-col-2 tji-modal__form-radio-group">
            <label htmlFor="whoami-civilian">
              <input
                id="whoami-civilian"
                type="radio"
                name="whoami"
                value="civilian"
                onChange={event => updateForm(event, 'whoami')}
              />
              Civilian
            </label>
          </div>
          <div className="tji-modal__form-col-2 tji-modal__form-radio-group">
            <label htmlFor="whoami-lawyer">
              <input
                id="whoami-lawyer"
                type="radio"
                name="whoami"
                value="lawyer"
                onChange={event => updateForm(event, 'whoami')}
              />
              Lawyer
            </label>
          </div>
          <div className="tji-modal__form-col-2 tji-modal__form-radio-group">
            <label htmlFor="whoami-peaceofficer">
              <input
                id="whoami-peaceofficer"
                type="radio"
                name="whoami"
                value="peaceofficer"
                onChange={event => updateForm(event, 'whoami')}
              />
              Peace officer
            </label>
          </div>
          <div className="tji-modal__form-col-2 tji-modal__form-radio-group">
            <label htmlFor="whoami-policymaker">
              <input
                id="whoami-policymaker"
                type="radio"
                name="whoami"
                value="policymaker"
                onChange={event => updateForm(event, 'whoami')}
              />
              Policy Maker
            </label>
          </div>
          <div className="tji-modal__form-col-2 tji-modal__form-radio-group">
            <label htmlFor="whoami-researcher">
              <input
                id="whoami-researcher"
                type="radio"
                name="whoami"
                value="researcher"
                onChange={event => updateForm(event, 'whoami')}
              />
              Researcher
            </label>
          </div>
          <div className="tji-modal__form-col-2 tji-modal__form-radio-group">
            <label htmlFor="whoami-reporter">
              <input
                id="whoami-reporter"
                type="radio"
                name="whoami"
                value="reporter"
                onChange={event => updateForm(event, 'whoami')}
              />
              Reporter
            </label>
          </div>
          <div className="tji-modal__form-radio-group">
            <label htmlFor="whoami-nondiscloser">
              <input
                id="whoami-nondiscloser"
                type="radio"
                name="whoami"
                value="nondiscloser"
                onChange={event => updateForm(event, 'whoami')}
              />
              Prefer not to disclose
            </label>
          </div>
          <div className="tji-modal__form-radio-group tji-modal__form-radio-group--textinput">
            <input
              id="whoami-other"
              type="radio"
              name="whoami"
              value="other"
              onChange={event => updateForm(event, 'whoami')}
            />
            <label htmlFor="whoami-other">
              <input
                type="text"
                name="whoami_other"
                placeholder="Other"
                onChange={event => updateForm(event, 'whoami')}
              />
            </label>
          </div>
        </div>
      </fieldset>
      <div className="tji-modal__actions">
        <button
          type="button"
          onClick={() => {
            changeStep();
          }}
          className="btn btn--primary"
        >
          Continue
        </button>
      </div>
    </React.Fragment>
  );
}

Step2.propTypes = {
  changeStep: PropTypes.func.isRequired,
  updateForm: PropTypes.func.isRequired,
};

class SurveyModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formActive: true,
      currentStep: 1,
      stepComplete: true,
      whoami: '',
    };

    this.changeStep = this.changeStep.bind(this);
    this.cancelForm = this.cancelForm.bind(this);
    this.updateForm = this.updateForm.bind(this);
  }

  // Handles button clicks moving to next step of form
  changeStep() {
    this.setState(prevState => ({
      currentStep: prevState.currentStep + 1,
    }));
  }

  // Handles user declining to fill out form
  cancelForm() {
    this.setState({
      formActive: false,
    });
  }

  updateForm(event, step) {
    const { target } = event;
    const { value } = target;

    this.setState({
      [step]: value,
    });
  }

  render() {
    const { state } = this;
    const { currentStep, formActive, stepComplete, userType } = state;

    // Don't render the form if the user has selected "No thanks", or if they have already downloaded data and seen the form before
    if (!formActive) {
      return null;
    }

    return (
      <React.Fragment>
        <Container>
          <form id="data-download-survey" className="tji-modal__form">
            {currentStep === 1 && (
              <Step1 currentStep={currentStep} changeStep={this.changeStep} cancelForm={this.cancelForm} />
            )}
            {currentStep === 2 && (
              <Step2
                currentStep={currentStep}
                changeStep={this.changeStep}
                cancelForm={this.cancelForm}
                updateForm={this.updateForm}
              />
            )}
          </form>
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

  .tji-modal__form {
    background: ${props => props.theme.colors.white};
    border-radius: 5px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
    padding: 4rem;
    z-index: 99;
    width: 450px;
  }

  .tji-modal__title,
  .tji-modal__actions {
    text-align: center;
  }

  .tji-modal__actions {
    margin-top: 2rem;
  }

  .tji-modal__form fieldset {
    border: none;
  }

  .tji-modal__fieldset-flex {
    display: flex;
    flex-wrap: wrap;
  }

  .tji-modal__fieldset-flex .tji-modal__form-col-2 {
    width: 50%;
  }

  .tji-modal__form-text-group,
  .tji-modal__form-radio-group {
    align-items: baseline;
    display: flex;
    flex-shrink: 0;
    margin-bottom: 1rem;
  }

  .tji-modal__form-radio-group input {
    margin-right: 1rem;
  }

  .tji-modal__form-radio-group--textinput label {
    align-items: baseline;
    display: flex;
    flex: 0 1 100%;
  }
`;
