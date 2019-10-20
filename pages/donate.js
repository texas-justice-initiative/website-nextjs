import React from 'react';
import Head from 'next/head';
import Primary from '../components/Primary';
import Sidebar from '../components/Sidebar';
import DonationForm from '../components/forms/DonationForm';
import ReviewForm from '../components/forms/ReviewForm';

const pageTitle = 'Support TJI';

class Page extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formSubmitted: false,
      formStep: 1,
      firstName: {
        value: '',
        valid: false,
        errorMessage: 'First name is required',
      },
      lastName: {
        value: '',
        valid: false,
        errorMessage: 'First name is required',
      },
      email: {
        value: '',
        valid: false,
        errorMessage: 'First name is required',
      },
      includeTax: false,
      total: 0,
      formValid: false,
      amount: {
        value: 0,
        valid: false,
        errorMessage: 'You must select an amount',
      },
      error: null,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.submitForReview = this.submitForReview.bind(this);
    this.returnToForm = this.returnToForm.bind(this);
  }

  // Handler for form inputs
  handleInputChange = event => {
    const { target } = event;
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    console.log(name, value);

    // Update our state and call field validation
    this.setState(
      prevState => ({
        [name]: {
          ...prevState[name],
          value,
        },
      }),
      () => {
        this.validateField(name, value);
      }
    );
  };

  // Check that our current field is valid and update state accordingly
  validateField(fieldName, value) {
    let { includeTax, amount } = this.state;
    let fieldValid;

    // Compute the total donation
    const donation = parseFloat(amount);
    donation.toFixed(2);
    const total = includeTax === true ? donation + donation * 0.022 + 0.03 : donation;
    total.toFixed(2);

    switch (fieldName) {
      case 'firstName':
        fieldValid = value.length > 0;
        break;
      case 'lastName':
        fieldValid = value.length > 0;
        break;
      case 'email':
        fieldValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        break;
      case 'amount':
        fieldValid = value > 0;
        break;
      case 'includeTax':
        includeTax = value;
        break;
      default:
        break;
    }

    // Update our state and check if form is complete and valid
    this.setState(
      prevState => ({
        [fieldName]: {
          ...prevState[fieldName],
          valid: fieldValid,
        },
        includeTax,
        total,
      }),
      () => {
        this.validateForm();
      }
    );
  }

  // Form validation function
  validateForm() {
    const { state } = this;
    const { firstName, lastName, email, amount } = state;
    this.setState({
      formValid: firstName.valid && lastName.valid && email.valid && amount.valid,
    });
  }

  submitForReview(event) {
    event.preventDefault();

    const { formValid } = this.state;

    const formStep = formValid ? 2 : 1;
    const error = formValid ? null : 'Please complete the necessary fields before continuing.';

    this.setState({
      formSubmitted: true,
      formStep,
      error,
    });
  }

  returnToForm() {
    this.setState({
      formStep: 1,
    });
  }

  render() {
    const { formStep, formSubmitted, firstName, lastName, email, amount, includeTax, total, error } = this.state;
    const formState = {
      firstName,
      lastName,
      email,
      amount,
      includeTax,
    };

    return (
      <React.Fragment>
        <Head>
          <title>Texas Justice Initiative | {pageTitle}</title>
        </Head>
        <Primary>
          <h1>{pageTitle}</h1>
          <p>
            Texas Justice Initiative is entirely supported through public donations. If you feel like this is a useful
            resource, please help us through a donation. Funding helps us continue to grow and improve the data we
            provide.
          </p>
          <p>
            You can also donate conveniently through our{' '}
            <a
              href="https://www.facebook.com/donate/605145886526139/10106361188494357/"
              target="_blank"
              rel="noreferrer noopener"
            >
              Facebook Page
            </a>
            .
          </p>
          {formStep === 1 && (
            <DonationForm
              handler={this.handleInputChange}
              formState={formState}
              error={error}
              submitForReview={this.submitForReview}
              formSubmitted={formSubmitted}
            />
          )}
          {formStep === 2 && <ReviewForm formState={formState} total={total} returnToForm={this.returnToForm} />}
        </Primary>
        <Sidebar>
          <h3>Our Mission</h3>
          <p>
            Collect, vet and publicly release information on criminal justice and policing in Texas while pushing for
            improved transparency.
          </p>

          <h3>Our Vision</h3>
          <p>
            To give Texans the most dependable data and most complete picture of law enforcement in the state, enabling
            better understanding.
          </p>

          <h3>Our Values</h3>

          <p>We provide oversight of the data released by state and local governmental entities.</p>

          <p>
            We seek to improve understanding through presenting information in a rich context and combining a variety of
            data.
          </p>

          <p>
            We hope to encourage the continuation of Texas’ leadership in transparency in policing and accountability.
          </p>

          <p>
            We wish to give Texans of all creed more information on how law enforcement agencies and officers operate.
          </p>
        </Sidebar>
      </React.Fragment>
    );
  }
}

export default Page;
