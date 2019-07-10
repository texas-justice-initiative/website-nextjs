import React from 'react';
import styled from 'styled-components';
import PaypalExpressBtn from 'react-paypal-express-checkout';

class DonationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      donation: 0,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleAmountChange = this.handleAmountChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const amount = target.value;
    this.setState({
      donation: amount,
    });
  }

  handleAmountChange(event) {
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
        <button type="button" value="500" onClick={this.handleAmountChange}>
          $500
        </button>
        <button type="button" value="250" onClick={this.handleAmountChange}>
          $250
        </button>
        <button type="button" value="100" onClick={this.handleAmountChange}>
          $100
        </button>
        <button type="button" value="50" onClick={this.handleAmountChange}>
          $50
        </button>
        <button type="button" value="25" onClick={this.handleAmountChange}>
          %25
        </button>
        <div>
          <div>$</div>
          <input name="otherAmount" type="text" pattern="\d+(\.\d{2})?" onChange={this.handleInputChange} />
        </div>
        <label htmlFor="includeTax">
          <input name="includeTax" type="checkbox" />I would like to add 2.2% plus $0.30 to my donation to cover PayPal
          processing costs.
        </label>
        <PaypalExpressBtn client={client} currency="USD" total={this.state.donation} />
      </form>
    );
  }
}

export default DonationForm;
