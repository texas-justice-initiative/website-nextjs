/* eslint-disable react/destructuring-assignment, no-undef, no-shadow, react/jsx-no-undef */

import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

export default class PaypalButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showButton: false,
    };

    // Check if window is defined for client-side rendering
    if (typeof window !== 'undefined') {
      window.React = React;
      window.ReactDOM = ReactDOM;
    }
  }

  componentDidMount() {
    const { isScriptLoaded, isScriptLoadSucceed } = this.props;

    if (isScriptLoaded && isScriptLoadSucceed) {
      this.setState({ showButton: true });
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { isScriptLoaded, isScriptLoadSucceed } = nextProps;

    const isLoadedButWasntLoadedBefore = !this.state.showButton && !this.props.isScriptLoaded && isScriptLoaded;

    if (isLoadedButWasntLoadedBefore) {
      if (isScriptLoadSucceed) {
        this.setState({ showButton: true });
      }
    }
  }

  render() {
    const { total, currency, env, commit, client, onSuccess } = this.props;
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

PaypalButton.propTypes = {
  total: PropTypes.string,
  currency: PropTypes.string,
  env: PropTypes.string.isRequired,
  commit: PropTypes.bool,
  client: PropTypes.object,
  isScriptLoaded: PropTypes.bool,
  isScriptLoadSucceed: PropTypes.bool,
  onSuccess: PropTypes.func.isRequired,
};
