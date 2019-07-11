import React from 'react';
import styled from 'styled-components';
import PaypalExpressBtn from 'react-paypal-express-checkout';

class DonationForm extends React.Component {
  constructor(props) {
    super(props);
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
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const { target } = event;
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState(
      {
        [name]: value,
      },
      () => {
        this.validateField(name, value);
      }
    );
  }

  validateField(fieldName, value) {
    let { firstNameValid } = this.state;
    let { lastNameValid } = this.state;
    let { emailValid } = this.state;
    let { amountValid } = this.state;
    let { includeTax } = this.state;

    // Compute the total donation
    const amount = parseFloat(this.state.amount);
    amount.toFixed(2);
    const total = includeTax === true ? amount + (amount * 0.022) + 0.03 : amount;
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

    this.setState(
      {
        firstNameValid: firstNameValid,
        lastNameValid: lastNameValid,
        emailValid: emailValid,
        amountValid: amountValid,
        includeTax: includeTax,
        total: total,
      },
      () => {
        this.validateForm();
      }
    );
  }

  validateForm() {
    this.setState({
      formValid:
        this.state.firstNameValid && this.state.lastNameValid && this.state.emailValid && this.state.amountValid,
    });
  }

  render() {
    const client = {
      sandbox: 'AZ2LDJwEbuFjH45Izqk5pmxHtyzxtooUPBCrvrn7tjKXIbv-xGxXsflhCMGl6dy2tRBEliztwiPzCckc',
      production: 'YOUR-PRODUCTION-APP-ID',
    };
    return (
      <form>
        <label htmlFor="firstName">
          First Name
          <input name="firstName" type="text" onChange={this.handleInputChange} />
        </label>
        <label htmlFor="lastName">
          Last Name
          <input name="lastName" type="text" onChange={this.handleInputChange} />
        </label>
        <label htmlFor="email">
          Email Address
          <input name="email" type="email" onChange={this.handleInputChange} />
        </label>
        <button type="button" name="amount" value="500" onClick={this.handleInputChange}>
          $500
        </button>
        <button type="button" name="amount" value="250" onClick={this.handleInputChange}>
          $250
        </button>
        <button type="button" name="amount" value="100" onClick={this.handleInputChange}>
          $100
        </button>
        <button type="button" name="amount" value="50" onClick={this.handleInputChange}>
          $50
        </button>
        <button type="button" name="amount" value="25" onClick={this.handleInputChange}>
          $25
        </button>
        <div>
          <div>$</div>
          <input name="amount" type="text" pattern="\d+(\.\d{2})?" onChange={this.handleInputChange} />
        </div>
        <label htmlFor="includeTax">
          <input name="includeTax" type="checkbox" onClick={this.handleInputChange} />I would like to add 2.2% plus
          $0.30 to my donation to cover PayPal processing costs.
        </label>
        <PaypalExpressBtn client={client} currency="USD" total={this.state.total} />
      </form>
    );
  }
}

export default DonationForm;
