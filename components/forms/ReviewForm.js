/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import PaypalButton from './PaypalButton';

class ReviewForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      params: {
        env: '',
        client: {
          sandbox: '',
          production: '',
        },
      },
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    // Fetch auth information to proceed with PayPal sucessfully
    // We will need to manually update the url once the function exists in production
    const url = `${window.location.hostname.netlify}/functions/paypal_params`;
    const res = await fetch(url);
    const params = await res.json();
    this.setState({
      isLoaded: true,
      params,
    });
  }

  render() {
    const { formState, total, returnToForm } = this.props;
    const { state } = this;
    const { params, isLoaded } = state;
    const { env, client } = params;

    if (!isLoaded) {
      return (
        <DonationReview>
          <header>
            <h2>Review your Information</h2>
          </header>
          <p>Loading...</p>
        </DonationReview>
      );
    }

    const onSuccess = payment => {
      // Congratulation, it came here means everything's fine!
      console.log('The payment was succeeded!', payment);
      // You can bind the "payment" object's value to your state or props or whatever here, please see below for sample returned data
    };

    const onCancel = data => {
      // User pressed "cancel" or close Paypal's popup!
      console.log('The payment was cancelled!', data);
      // You can bind the "data" object's value to your state or props or whatever here, please see below for sample returned data
    };

    const onError = err => {
      // The main Paypal's script cannot be loaded or somethings block the loading of that script!
      console.log('Error!', err);
      // Because the Paypal's main script is loaded asynchronously from "https://www.paypalobjects.com/api/checkout.js"
      // => sometimes it may take about 0.5 second for everything to get set, or for the button to appear
    };

    return (
      <DonationReview>
        <header>
          <h2>Review your Information</h2>
          <button type="button" className="btn--simple" onClick={returnToForm}>
            Change Information
          </button>
        </header>
        <p>Please verify your information before proceeding to PayPal.</p>
        <ul>
          <li>
            <b>First Name:</b> {formState.firstName}
          </li>
          <li>
            <b>Last Name:</b> {formState.lastName}
          </li>
          <li>
            <b>Email:</b> {formState.email}
          </li>
          <li>
            <b>Donation Amount:</b> ${total}
          </li>
        </ul>
        <PaypalButton
          env={env}
          client={client}
          commit
          currency="USD"
          total={total}
          onSuccess={onSuccess}
          onError={onError}
          onCancel={onCancel}
        />
      </DonationReview>
    );
  }
}

export default ReviewForm;

ReviewForm.propTypes = {
  formState: PropTypes.object.isRequired,
  total: PropTypes.number.isRequired,
  returnToForm: PropTypes.func.isRequired,
};

const DonationReview = styled.div`
  background: ${props => props.theme.colors.grayLightest};
  padding: 2rem;

  h2 {
    display: inline-block;
  }

  .btn--simple {
    background: none;
    border: 0;
    text-decoration: none;
    float: right;
    cursor: pointer;
  }

  ul {
    margin: 2.4rem 0;

    li:last-of-type {
      margin-top: 2rem;
    }
  }
`;
