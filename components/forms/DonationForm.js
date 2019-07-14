import React from 'react';
import styled from 'styled-components';
import PaypalButton from './PaypalButton';

class DonationForm extends React.Component {
  constructor(props) {
    super(props);

    // Setup initial state
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      amount: 0,
      includeTax: false,
      total: 0,
      firstNameValid: false,
      lastNameValid: false,
      emailValid: false,
      amountValid: false,
      formValid: false,
      donationAmounts: [500, 250, 100, 50, 25],
      selectedAmount: '0',
    };
  }

  // Handler for form inputs
  handleInputChange = (event) => {
    const { target } = event;
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    // Update our state and call field validation
    this.setState(
      {
        [name]: value,
        selectedAmount: value,
      },
      () => {
        this.validateField(name, value);
      }
    );
  }

  // Check that our current field is field and update state accordingly
  validateField(fieldName, value) {
    let { firstNameValid } = this.state;
    let { lastNameValid } = this.state;
    let { emailValid } = this.state;
    let { amountValid } = this.state;
    let { includeTax } = this.state;

    // Compute the total donation
    const amount = parseFloat(this.state.amount);
    amount.toFixed(2);
    const total = includeTax === true ? amount + amount * 0.022 + 0.03 : amount;
    total.toFixed(2);

    switch (fieldName) {
      case 'firstName':
        firstNameValid = value.length > 0;
        break;
      case 'lastName':
        lastNameValid = value.length > 0;
        break;
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        break;
      case 'amount':
        amountValid = value > 0;
        break;
      case 'includeTax':
        includeTax = value;
        break;
      default:
        break;
    }

    // Update our state and check if form is complete and valid
    this.setState(
      {
        firstNameValid,
        lastNameValid,
        emailValid,
        amountValid,
        includeTax,
        total,
      },
      () => {
        this.validateForm();
      }
    );
  }

  // Form validation function
  validateForm() {
    this.setState({
      formValid:
        this.state.firstNameValid && this.state.lastNameValid && this.state.emailValid && this.state.amountValid,
    });
  }

  render() {
    const { donationAmounts, selectedAmount } = this.state;

    const ENV = 'sandbox';
    const client = {
      sandbox: 'AZ2LDJwEbuFjH45Izqk5pmxHtyzxtooUPBCrvrn7tjKXIbv-xGxXsflhCMGl6dy2tRBEliztwiPzCckc',
      production: 'YOUR-PRODUCTION-APP-ID',
    };

    return (
      <Form className="donation-form">
        <div className="donation-form__row">
          <div className="donation-form__field donation-form__field--medium">
            <label htmlFor="firstName">
              First Name
              <input name="firstName" type="text" onChange={this.handleInputChange} />
            </label>
          </div>
          <div className="donation-form__field donation-form__field--medium">
            <label htmlFor="lastName">
              Last Name
              <input name="lastName" type="text" onChange={this.handleInputChange} />
            </label>
          </div>
          <div className="donation-form__field donation-form__field--medium">
            <label htmlFor="email">
              Email Address
              <input name="email" type="email" onChange={this.handleInputChange} />
            </label>
          </div>
        </div>
        <div className="donation-form__row">
          <div>
            {donationAmounts.map(amount => {
              const selected = amount === parseInt(selectedAmount);
              console.log('SELECTED: ', selected, amount);
              return (
                <button
                  key={amount}
                  type="button"
                  name="amount"
                  value={amount}
                  onClick={this.handleInputChange}
                  className={selected ? 'selected' : ''}
                >
                  ${amount}
                </button>
              );
            })}
          </div>
          <div className="donation-form__other-amount">
            <div className="donation-form__other-amount__amount-sign">$</div>
            <input name="amount" type="text" pattern="\d+(\.\d{2})?" onChange={this.handleInputChange} />
          </div>
        </div>
        <div className="donation-form__row">
          <div className="donation-form__field">
            <label htmlFor="includeTax">
              <input name="includeTax" type="checkbox" onClick={this.handleInputChange} /> I would like to add 2.2% plus
              $0.30 to my donation to cover PayPal processing costs.
            </label>
          </div>
        </div>

        <div className="donation-form__row">
          <PaypalButton
            env={ENV}
            client={client}
            commit={true}
            currency="USD"
            total={this.state.total}
            onSuccess={console.log('success')}
            onError={console.log('error')}
            onCancel={console.log('cancel')}
          />
        </div>
      </Form>
    );
  }
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
    align-items: stretch;
    margin-left: 0.5rem;
  }
  .donation-form__other-amount__amount-sign {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    border-radius: 3px 0 0 3px;
    border: 1px solid #ccc;
    color: ${props => props.theme.colors.primaryBlue};
    font-weight: 700;
    padding-top: 4px;
  }
  .donation-form__other-amount input[type='text'] {
    border: 1px solid #ccc;
    border-radius: 0 3px 3px 0;
    padding: 6px 10px;
    height: 38px;
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
    margin: 0 0.25rem;
    padding: 0.6em 1em 0.4em;
    box-shadow: 1px 1px 3px #ccc;
    text-decoration: none;

    &.selected {
      background: ${props => props.theme.colors.primaryBlue};
      color: white;
    }
  }

  @media screen and (min-width: ${props => props.theme.medium}) {
    .donation-form__field {
      padding-right: 2rem;
    }
    .donation-form__field--medium {
      width: 50%;
    }
  }
`;
