import React from 'react';
import styled from 'styled-components';

function DonationForm (props) {
  const { handler, submitForReview, selectedAmount, error } = props;
  const donationAmounts = [500, 250, 100, 50, 25];
  return (
    <Form className="donation-form" onSubmit={submitForReview}>
      <div className="donation-form__row">
        <div className="donation-form__field donation-form__field--medium">
          <label htmlFor="firstName">
            First Name
            <input name="firstName" type="text" onChange={handler} />
          </label>
        </div>
        <div className="donation-form__field donation-form__field--medium">
          <label htmlFor="lastName">
            Last Name
            <input name="lastName" type="text" onChange={handler} />
          </label>
        </div>
        <div className="donation-form__field donation-form__field--medium">
          <label htmlFor="email">
            Email Address
            <input name="email" type="email" onChange={handler} />
          </label>
        </div>
      </div>
      <div className="donation-form__row">
        <div>
          {donationAmounts.map(amount => {
            const selected = amount === parseInt(selectedAmount);
            return (
              <button
                key={amount}
                type="button"
                name="amount"
                value={amount}
                onClick={handler}
                className={selected ? 'selected' : ''}
              >
                ${amount}
              </button>
            );
          })}
        </div>
        <div className="donation-form__other-amount">
          <div className="donation-form__other-amount__amount-sign">$</div>
          <input name="amount" type="text" pattern="\d+(\.\d{2})?" onChange={handler} />
        </div>
      </div>
      <div className="donation-form__row">
        <div className="donation-form__field">
          <label htmlFor="includeTax">
            <input name="includeTax" type="checkbox" onClick={handler} /> I would like to add 2.2% plus
            $0.30 to my donation to cover PayPal processing costs.
          </label>
        </div>
      </div>
      <div className="donation-form__row">
        <input type="submit" className="btn btn--primary" value="Confirm" />
        <span className="donation-form__error">{error}</span>
      </div>
    </Form>
  );
}

export default DonationForm;

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
  label {
    display: block;
    font-size: ${props => props.theme.bodyFont__size};
    float: none;
    font-weight: 700;
    line-height: 1.3;
    padding: 0;
  }
  .donation-form__field input[type='text'],
  .donation-form__field input[type='email'] {
    display: block;
    float: none;
    font-size: ${props => props.theme.bodyFont__size};
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
    color: ${props => props.theme.colors.primaryBlue};
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
    border: 1px solid ${props => props.theme.colors.primaryBlue};
    border-radius: 3px;
    color: ${props => props.theme.colors.primaryBlue};
    font-weight: 700;
    font-size: ${props => props.theme.bodyFont__size};
    margin: 0 0.25rem 1rem 0.25rem;
    padding: 0.6em 1em 0.4em;
    box-shadow: 1px 1px 3px #ccc;
    text-decoration: none;

    &.selected {
      background: ${props => props.theme.colors.primaryBlue};
      color: white;
    }
  }
  .donation-form__error {
    color: ${props => props.theme.colors.primaryRed};
    margin: 2rem 0;
  }
  @media screen and (min-width: ${props => props.theme.medium}) {
    .donation-form__field {
      padding-right: 2rem;
    }
    .donation-form__field--medium {
      width: 50%;
    }
    .donation-form__error {
      color: ${props => props.theme.colors.primaryRed};
      margin: 0.5rem 0 0 2rem;
    }
  }
`;
