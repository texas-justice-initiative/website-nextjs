/* eslint-disable react/no-danger */

import React from 'react';
import Head from 'next/head';
import MarkdownIt from 'markdown-it';
import Layout from '../components/Layout';
import Primary from '../components/Primary';
import Sidebar from '../components/Sidebar';
import DonationForm from '../components/forms/DonationForm';
import ReviewForm from '../components/forms/ReviewForm';
import content from '../content/donate.md';

const {
  html,
  attributes: { title },
} = content;

const md = new MarkdownIt();

class Page extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formValid: false,
      formSubmitted: false,
      formStep: 1,
      firstName: {
        value: '',
        valid: false,
      },
      lastName: {
        value: '',
        valid: false,
      },
      email: {
        value: '',
        valid: false,
      },
      includeProcessingFee: {
        value: false,
      },
      amount: {
        value: 0,
        valid: false,
        errorMessage: 'Please select a donation amount.',
      },
      total: 0,
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
    const { includeProcessingFee, amount } = this.state;
    let fieldValid;

    // Compute the total donation
    const donation = parseFloat(amount.value);
    donation.toFixed(2);
    let total = includeProcessingFee.value === true ? donation + donation * 0.022 + 0.03 : donation;
    total = total.toFixed(2);
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

    this.setState({
      formSubmitted: true,
      formStep,
    });
  }

  returnToForm() {
    this.setState({
      formStep: 1,
    });
  }

  render() {
    const { formStep, formSubmitted, firstName, lastName, email, amount, includeProcessingFee, total } = this.state;
    const formState = {
      firstName,
      lastName,
      email,
      amount,
      includeProcessingFee,
    };

    return (
      <React.Fragment>
        <Head>
          <title>Texas Justice Initiative | {title}</title>
        </Head>
        <Layout>
          <Primary>
            <h1>{title}</h1>
            <div dangerouslySetInnerHTML={{ __html: html }} />
            {formStep === 1 && (
              <DonationForm
                handler={this.handleInputChange}
                formState={formState}
                submitForReview={this.submitForReview}
                formSubmitted={formSubmitted}
              />
            )}
            {formStep === 2 && <ReviewForm formState={formState} total={total} returnToForm={this.returnToForm} />}
          </Primary>
          <Sidebar />
        </Layout>
      </React.Fragment>
    );
  }
}

export default Page;
