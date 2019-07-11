import React from 'react';
import styled from 'styled-components';
import PaypalExpressBtn from 'react-paypal-express-checkout';

class DonationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      donation: 0,
      addTax: false,
      nameValid: false,
      emailValid: false,
      amountValid: false,
      formValid: false,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const amount = target.value;
    this.setState({
      donation: amount,
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
        <label htmlFor="emailAddress">
          Email Address
          <input name="emailAddress" type="email" onChange={this.handleInputChange} />
        </label>
        <button type="button" name="amountButton" value="500" onClick={this.handleInputChange}>
          $500
        </button>
        <button type="button" name="amountButton" value="250" onClick={this.handleInputChange}>
          $250
        </button>
        <button type="button" name="amountButton" value="100" onClick={this.handleInputChange}>
          $100
        </button>
        <button type="button" name="amountButton" value="50" onClick={this.handleInputChange}>
          $50
        </button>
        <button type="button" name="amountButton" value="25" onClick={this.handleInputChange}>
          %25
        </button>
        <div>
          <div>$</div>
          <input name="otherAmount" type="text" pattern="\d+(\.\d{2})?" onChange={this.handleInputChange} />
        </div>
        <label htmlFor="includeTax">
          <input name="includeTax" type="checkbox" onClick={this.handleInputChange} />I would like to add 2.2% plus
          $0.30 to my donation to cover PayPal processing costs.
        </label>
        <PaypalExpressBtn client={client} currency="USD" total={this.state.donation} />
      </form>
    );
  }
}

export default DonationForm;
