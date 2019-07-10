import React from 'react';

class AmountInput extends React.Component {
  render() {
    return (
      <div>
        <div>$</div>
        <input name="otherAmount" type="text" pattern="\d+(\.\d{2})?" />
      </div>
    )
  }
};

export default AmountInput;
