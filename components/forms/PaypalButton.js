/* eslint-disable react/destructuring-assignment, no-undef, no-shadow, react/jsx-no-undef */

import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import scriptLoader from 'react-async-script-loader';

class PaypalButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showButton: false,
    };

    window.React = React;
    window.ReactDOM = ReactDOM;
  }

  componentDidMount() {
    const { isScriptLoaded, isScriptLoadSucceed } = this.props;

    if (isScriptLoaded && isScriptLoadSucceed) {
      this.setState({ showButton: true });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { isScriptLoaded, isScriptLoadSucceed } = nextProps;

    const isLoadedButWasntLoadedBefore = !this.state.showButton && !this.props.isScriptLoaded && isScriptLoaded;

    if (isLoadedButWasntLoadedBefore) {
      if (isScriptLoadSucceed) {
        this.setState({ showButton: true });
      }
    }
  }

  render() {
    const { total, currency, env, commit, client } = this.props;
    const { showButton } = this.state;

    const payment = () =>
      paypal.rest.payment.create(env, client, {
        transactions: [
          {
            amount: {
              total,
              currency,
            },
          },
        ],
      });

    const onAuthorize = (data, actions) =>
      actions.payment.execute().then(() => {
        const payment = {
          paid: true,
          cancelled: false,
          payerID: data.payerID,
          paymentID: data.paymentID,
          paymentToken: data.paymentToken,
          returnUrl: data.returnUrl,
        };

        onSuccess(payment);
      });

    return (
      <div>
        {showButton && (
          <paypal.Button.react env={env} client={client} commit={commit} payment={payment} onAuthorize={onAuthorize} />
        )}
      </div>
    );
  }
}

export default scriptLoader('https://www.paypalobjects.com/api/checkout.js')(PaypalButton);

PaypalButton.propTypes = {
  total: PropTypes.number,
  currency: PropTypes.string,
  env: PropTypes.string.isRequired,
  commit: PropTypes.bool,
  client: PropTypes.object,
  isScriptLoaded: PropTypes.bool,
  isScriptLoadSucceed: PropTypes.bool,
};
