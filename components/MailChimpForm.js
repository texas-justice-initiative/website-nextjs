/* eslint-disable react/no-danger, no-dupe-keys */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MailchimpSubscribe from 'react-mailchimp-subscribe';

// a basic form
const CustomForm = ({ status, message, onValidated }) => {
  let email;
  let name;
  const submit = () =>
    email &&
    name &&
    email.value.indexOf('@') > -1 &&
    onValidated({
      EMAIL: email.value,
      NAME: name.value,
    });

  return (
    <div>
      {status === 'sending' && <div style={{ color: 'blue' }}>sending...</div>}
      {status === 'error' && <div style={{ color: 'red' }} dangerouslySetInnerHTML={{ __html: message }} />}
      {status === 'success' && <div style={{ color: 'green' }} dangerouslySetInnerHTML={{ __html: message }} />}
      <input
        className="contact-form__field contact-form__field--medium"
        style={{ 'margin-bottom': '0.5em' }}
        ref={node => (name = node)}
        type="text"
        placeholder="Name"
        required
      />
      <input
        className="contact-form__field contact-form__field--medium"
        style={{ 'margin-bottom': '0.5em' }}
        ref={node => (email = node)}
        type="email"
        placeholder="Email"
        required
      />
      <br />
      <button type="button" className="btn btn--primary" style={{ 'margin-top': '0.5em' }} onClick={submit}>
        Subscribe
      </button>
    </div>
  );
};

CustomForm.propTypes = {
  status: PropTypes.string,
  message: PropTypes.string,
  onValidated: PropTypes.func.isRequired,
};

class MailChimpForm extends Component {
  render() {
    const url =
      'https://texasjusticeinitiative.us18.list-manage.com/subscribe/post?u=fd262cb4a5fc0bafb38da2e22&amp;id=2663621fac';
    return (
      <MailchimpSubscribe
        url={url}
        render={({ subscribe, status, message }) => (
          <CustomForm status={status} message={message} onValidated={formData => subscribe(formData)} />
        )}
      />
    );
  }
}

export default MailChimpForm;
