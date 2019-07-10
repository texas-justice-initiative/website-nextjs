import React from 'react';

class AmountButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleAmountChange = this.handleAmountChange.bind(this);
  }

  handleAmountChange(event) {
    console.log('clicked');
  }

  render() {
    return (
      <button type="button" onClick={this.handleAmountChange}>
        ${this.props.amount}
      </button>
    );
  }
};

export default AmountButton;
