/* eslint-disable react/no-unused-state, react/destructuring-assignment, react/no-access-state-in-setstate, no-console */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

function DonationForm(props) {
  const { formSubmitted, formState, handler, submitForReview } = props;
  const donationAmounts = [500, 250, 100, 50, 25];
  return (
    <Form className="donation-form" onSubmit={submitForReview}>
      <div className="donation-form__row">
        <div className="donation-form__field donation-form__field--medium">
          <label htmlFor="firstName">
            First Name
            <input
              name="firstName"
              type="text"
              onChange={handler}
              value={formState.firstName.value}
              className={
                formSubmitted && !formState.firstName.valid
                  ? 'donation-form__field__input invalid'
                  : 'donation-form__field'
              }
            />
          </label>
        </div>
        <div className="donation-form__field donation-form__field--medium">
          <label htmlFor="lastName">
            Last Name
            <input
              name="lastName"
              type="text"
              onChange={handler}
              value={formState.lastName.value}
              className={
                formSubmitted && !formState.lastName.valid
                  ? 'donation-form__field__input invalid'
                  : 'donation-form__field__input'
              }
            />
          </label>
        </div>
        <div className="donation-form__field donation-form__field--medium">
          <label htmlFor="email">
            Email Address
            <input
              name="email"
              type="email"
              onChange={handler}
              value={formState.email.value}
              className={
                formSubmitted && !formState.email.valid
                  ? 'donation-form__field__input invalid'
                  : 'donation-form__field__input'
              }
            />
          </label>
        </div>
      </div>
      <div className="donation-form__row">
        <div>
          {donationAmounts.map((donationAmount) => {
            const selected = donationAmount === parseInt(formState.amount.value);
            return (
              <button
                key={donationAmount}
                type="button"
                name="amount"
                value={donationAmount}
                onClick={handler}
                className={selected ? 'selected' : ''}
              >
                ${donationAmount}
              </button>
            );
          })}
        </div>
        <div className="donation-form__other-amount">
          <div className="donation-form__other-amount__amount-sign">$</div>
          <input
            name="amount"
            type="text"
            pattern="\d+(\.\d{2})?"
            onChange={handler}
            value={donationAmounts.includes(parseInt(formState.amount.value)) ? '' : formState.amount.value}
          />
        </div>
        {formSubmitted && !formState.amount.valid && (
          <span className="donation-form__error">{formState.amount.errorMessage}</span>
        )}
      </div>
      <div className="donation-form__row">
        <div className="donation-form__field">
          <label htmlFor="includeProcessingFee">
            <input
              name="includeProcessingFee"
              id="includeProcessingFee"
              type="checkbox"
              onChange={handler}
              checked={formState.includeProcessingFee.value}
            />{' '}
            I would like to add 2.2% plus $0.30 to my donation to cover PayPal processing costs.
          </label>
        </div>
      </div>
      <div className="donation-form__row">
        <input type="submit" className="btn btn--primary" value="Confirm" />
      </div>
    </Form>
  );
}

export default DonationForm;

DonationForm.propTypes = {
  formSubmitted: PropTypes.bool.isRequired,
  formState: PropTypes.object.isRequired,
  handler: PropTypes.func.isRequired,
  submitForReview: PropTypes.func.isRequired,
};

const Form = styled.form`
  .donation-form__row {
    display: flex;
    flex-flow: row wrap;
    margin: 2rem 0;
  }
  .donation-form__field {
    width: 100%;
    margin: 1rem 0;
  }
  .donation-form__field__input {
    margin: 1rem 0;
  }
  .donation-form__field__input.invalid {
    outline: 2px solid ${(props) => props.theme.colors.primaryRed};
  }
  label {
    display: block;
    font-size: ${(props) => props.theme.typography.sizes.body.regular};
    float: none;
    font-weight: 700;
    line-height: 1.3;
    padding: 0;
  }
  .donation-form__field input[type='text'],
  .donation-form__field input[type='email'] {
    display: block;
    float: none;
    font-size: ${(props) => props.theme.typography.sizes.body.regular};
    border: 1px solid #ccc;
    padding: 6px 10px;
    height: 38px;
    width: 100%;
    line-height: 1.3;
  }
  .donation-form__other-amount {
    display: flex;
    align-items: flex-start;
    margin-left: 0.5rem;
  }
  .donation-form__other-amount__amount-sign {
    border-radius: 3px 0 0 3px;
    border: 1px solid #ccc;
    color: ${(props) => props.theme.colors.primaryBlue};
    font-weight: 700;
    padding: 0.4em 1em;
  }
  .donation-form__other-amount input[type='text'] {
    border: 1px solid #ccc;
    border-radius: 0 3px 3px 0;
    padding: 0.6em 1em 0.4em;
    width: 100%;
    line-height: 1.3;
  }
  button[name='amount'] {
    background: #fff;
    border: 1px solid ${(props) => props.theme.colors.primaryBlue};
    border-radius: 3px;
    color: ${(props) => props.theme.colors.primaryBlue};
    font-weight: 700;
    font-size: ${(props) => props.theme.typography.sizes.body.regular};
    margin: 0 0.25rem 1rem 0.25rem;
    padding: 0.6em 1em 0.4em;
    box-shadow: 1px 1px 3px #ccc;
    text-decoration: none;

    &.selected {
      background: ${(props) => props.theme.colors.primaryBlue};
      color: white;
    }
  }
  .donation-form__error {
    color: ${(props) => props.theme.colors.primaryRed};
    margin: 2rem 0;
  }
  @media screen and (min-width: ${(props) => props.theme.breakpoints.medium}) {
    .donation-form__field {
      padding-right: 2rem;
    }
    .donation-form__field--medium {
      width: 50%;
    }
    .donation-form__error {
      color: ${(props) => props.theme.colors.primaryRed};
      margin: 0;
      font-weight: 400;
      font-style: italic;
    }
  }
`;
