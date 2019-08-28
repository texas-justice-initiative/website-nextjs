import React from 'react';
import styled from 'styled-components';
import PaypalButton from './PaypalButton';

class ReviewForm extends React.Component {

  render() {
    const { total, returnToForm } = this.props;

    const ENV = 'sandbox';
    const client = {
      sandbox: 'AZ2LDJwEbuFjH45Izqk5pmxHtyzxtooUPBCrvrn7tjKXIbv-xGxXsflhCMGl6dy2tRBEliztwiPzCckc',
      production: 'YOUR-PRODUCTION-APP-ID',
    };

    const onSuccess = (payment) => {
      // Congratulation, it came here means everything's fine!
      console.log('The payment was succeeded!', payment);
      // You can bind the "payment" object's value to your state or props or whatever here, please see below for sample returned data
    }

    const onCancel = (data) => {
      // User pressed "cancel" or close Paypal's popup!
      console.log('The payment was cancelled!', data);
      // You can bind the "data" object's value to your state or props or whatever here, please see below for sample returned data
    }

    const onError = (err) => {
      // The main Paypal's script cannot be loaded or somethings block the loading of that script!
      console.log("Error!", err);
      // Because the Paypal's main script is loaded asynchronously from "https://www.paypalobjects.com/api/checkout.js"
      // => sometimes it may take about 0.5 second for everything to get set, or for the button to appear
    }
    return (
      <div className="donation-review">
        <header>
        <h2>Review your donation.</h2>
          <button type="button" className="btn btn--secondary" onClick={returnToForm}>
            Previous Step
          </button>
        </header>
        <PaypalButton
          env={ENV}
          client={client}
          commit={true}
          currency="USD"
          total={total}
          onSuccess={onSuccess}
          onError={onError}
          onCancel={onCancel}
        />
      </div>
    );
  }
}

export default ReviewForm;