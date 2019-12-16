import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

function Step1(props) {
  const { validateStep, cancelForm } = props;
  return (
    <form className="tji-modal__form">
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
            validateStep();
          }}
          className="btn btn--primary"
        >
          Yes, of course!
        </button>
      </div>
    </form>
  );
}

Step1.propTypes = {
  validateStep: PropTypes.func.isRequired,
  cancelForm: PropTypes.func.isRequired,
};

function Step2(props) {
  const { validateStep, updateForm, stepError } = props;
  const requiredFields = ['whoami'];

  return (
    <form className="tji-modal__form">
      <p className="tji-modal__form__success">Thanks for helping us better know our users!</p>
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
            validateStep(requiredFields);
          }}
          className="btn btn--primary"
        >
          Continue
        </button>
      </div>
      {stepError !== '' && <p className="tji-modal__form__error">{stepError}</p>}
    </form>
  );
}

Step2.propTypes = {
  validateStep: PropTypes.func.isRequired,
  updateForm: PropTypes.func.isRequired,
  stepError: PropTypes.string,
};

function Step3(props) {
  const { validateStep, updateForm, stepError } = props;
  const requiredFields = ['dataSought', 'dataFound'];

  return (
    <form className="tji-modal__form">
      <h2 className="tji-modal__title">I'm looking for data on...</h2>
      <p className="tji-modal__description">
        To ensure we're collecting data that is useful to you, we need feedback on the type of data you're searching
        for. Use the input below to describe the type of data you're looking for.
      </p>
      <fieldset>
        <input
          type="text"
          name="data-sought"
          placeholder="ex: Officers shot"
          onChange={event => updateForm(event, 'dataSought')}
        />
      </fieldset>
      <fieldset>
        <p>I found the data I was looking for...</p>
        <div className="tji-modal__fieldset-flex">
          <div className="tji-modal__form-col-2 tji-modal__form-radio-group">
            <label htmlFor="datafound-yes">
              <input
                id="datafound-yes"
                type="radio"
                name="datafound"
                value="yes"
                onChange={event => updateForm(event, 'dataFound')}
              />
              Yes!
            </label>
          </div>
          <div className="tji-modal__form-col-2 tji-modal__form-radio-group">
            <label htmlFor="datafound-no">
              <input
                id="datafound-no"
                type="radio"
                name="datafound"
                value="no"
                onChange={event => updateForm(event, 'dataFound')}
              />
              No
            </label>
          </div>
        </div>
      </fieldset>
      <div className="tji-modal__actions">
        <button
          type="button"
          onClick={() => {
            validateStep(requiredFields);
          }}
          className="btn btn--primary"
        >
          Continue
        </button>
      </div>
      {stepError !== '' && <p className="tji-modal__form__error">{stepError}</p>}
    </form>
  );
}

Step3.propTypes = {
  validateStep: PropTypes.func.isRequired,
  updateForm: PropTypes.func.isRequired,
  stepError: PropTypes.string,
};

function Step4(props) {
  const { skipStep, validateStep, updateForm, stepError } = props;
  const requiredFields = ['firstName', 'email'];
  return (
    <form
      id="mailchimp-form"
      name="mailchimp-form"
      className="tji-modal__form"
      // action="https://texasjusticeinitiative.us18.list-manage.com/subscribe/post?u=fd262cb4a5fc0bafb38da2e22&amp;id=2663621fac"
      // method="post"
      // target="_blank"
    >
      <h2 className="tji-modal__title">I'm interested in TJI updates...</h2>
      <p className="tji-modal__description">
        Thank you for your interest in TJI! For regular updates on TJI’s data in use, our latest data offerings and the
        most recent revelations, sign up for our newsletter, a short read that hits inboxes monthly. We promise not to
        sell your email address.
      </p>
      <fieldset>
        <input
          style={{ marginBottom: '0.5em' }}
          type="text"
          placeholder="First name"
          name="FNAME"
          onChange={event => updateForm(event, 'firstName')}
        />
        <input
          style={{ marginBottom: '0.5em' }}
          type="email"
          placeholder="Email"
          name="EMAIL"
          onChange={event => updateForm(event, 'email')}
        />
      </fieldset>
      <div className="tji-modal__actions">
        <button type="button" onClick={() => skipStep()} className="btn--simple">
          No Thanks
        </button>
        <button type="button" className="btn btn--primary" onClick={() => validateStep(requiredFields, joinNewsletter)}>
          Continue
        </button>
      </div>
      {stepError !== '' && <p className="tji-modal__form__error">{stepError}</p>}
    </form>
  );
}

Step4.propTypes = {
  skipStep: PropTypes.func.isRequired,
  validateStep: PropTypes.func.isRequired,
  updateForm: PropTypes.func.isRequired,
  stepError: PropTypes.string,
};

function Step5(props) {
  return (
    <form className="tji-modal__form">
      <h2 className="tji-modal__title">I'm interested in TJI updates...</h2>
      <p className="tji-modal__description">
        Thank you for your interest in TJI! For regular updates on TJI’s data in use, our latest data offerings and the
        most recent revelations, sign up for our newsletter, a short read that hits inboxes monthly. We promise not to
        sell your email address.
      </p>
    </form>
  );
}

// Callback function for user to complete mailchimp signup
function joinNewsletter() {
  const mailchimpForm = document.getElementById('mailchimp-form');
  mailchimpForm.action =
    'https://texasjusticeinitiative.us18.list-manage.com/subscribe/post?u=fd262cb4a5fc0bafb38da2e22&amp;id=2663621fac';
  mailchimpForm.method = 'post';
  mailchimpForm.target = '_blank';
  mailchimpForm.submit();
}

class SurveyModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formActive: true,
      currentStep: 1,
      stepError: '',
      surveyData: {
        whoami: '',
        dataSought: '',
        dataFound: '',
        firstName: '',
        email: '',
      },
    };

    this.validateStep = this.validateStep.bind(this);
    this.cancelForm = this.cancelForm.bind(this);
    this.skipStep = this.skipStep.bind(this);
    this.updateForm = this.updateForm.bind(this);
  }

  // Validate required fields and either move to the next step or add an error message
  validateStep(requiredFields = [], callback = () => {}) {
    const { state } = this;
    const { surveyData } = state;

    const totalFields = requiredFields.length;
    let validFields = 0;

    requiredFields.forEach(field => {
      if (surveyData[field] !== '') {
        validFields += 1;
      }
    });

    if (validFields === totalFields) {
      this.setState(prevState => ({
        stepError: '',
        currentStep: prevState.currentStep + 1,
      }));

      // Execute callback function if form is validated
      callback();
    } else {
      this.setState({
        stepError: 'Please fill out all fields before continuing.',
      });
    }
  }

  // Handles user declining to fill out form
  cancelForm() {
    this.setState({
      formActive: false,
    });
  }

  // Simple method to skip validation and move to the next step
  skipStep() {
    this.setState(prevState => ({
      stepError: '',
      currentStep: prevState.currentStep + 1,
    }));
  }

  updateForm(event, field) {
    const { target } = event;
    const { value } = target;

    this.setState(state => ({
      stepError: '',
      surveyData: {
        ...state.surveyData,
        [field]: value,
      },
    }));
  }

  render() {
    const { state } = this;
    const { currentStep, formActive, stepError } = state;

    // Don't render the form if the user has selected "No thanks", or if they have already downloaded data and seen the form before
    if (!formActive) {
      return null;
    }

    return (
      <React.Fragment>
        <Container>
          {currentStep === 1 && <Step1 validateStep={this.validateStep} cancelForm={this.cancelForm} />}
          {currentStep === 2 && (
            <Step2 validateStep={this.validateStep} updateForm={this.updateForm} stepError={stepError} />
          )}
          {currentStep === 3 && (
            <Step3 validateStep={this.validateStep} updateForm={this.updateForm} stepError={stepError} />
          )}
          {currentStep === 4 && (
            <Step4
              validateStep={this.validateStep}
              updateForm={this.updateForm}
              skipStep={this.skipStep}
              stepError={stepError}
            />
          )}
          {currentStep === 5 && <Step5 />}
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

  .tji-modal__form p {
    margin: 2.4rem 0;
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

  p.tji-modal__form__success {
    background-color: ${props => props.theme.colors.tertiaryBlue};
    border: 1px solid ${props => props.theme.colors.secondaryBlue};
    color: ${props => props.theme.colors.primaryBlue};
    margin: 0 0 3rem;
    padding: 2rem 1rem;
  }

  p.tji-modal__form__error {
    margin: 3rem 0 0;
    text-align: center;
    color: ${props => props.theme.colors.primaryRed};
  }
`;
