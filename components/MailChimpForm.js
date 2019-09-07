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
        style={{
          borderRadius: 5,
          borderStyle: 'unset',
          fontSize: '2em',
          padding: 5,
          marginRight: 10,
          fontFamily: 'Museo, Arial, Helvetica, sans-serif',
        }}
        ref={node => (name = node)}
        type="text"
        placeholder="Name"
      />
      <input
        style={{
          borderRadius: 5,
          borderStyle: 'unset',
          fontSize: '2em',
          padding: 5,
          display: 'inline',
          fontFamily: 'Museo, Arial, Helvetica, sans-serif',
        }}
        ref={node => (email = node)}
        type="email"
        placeholder="Email"
      />
      <br />
      <button
        type="button"
        style={{
          marginBottom: '1em',
          fontFamily: 'Museo, Arial, Helvetica, sans-serif',
          height: '3.7rem',
          cursor: 'pointer',
          textTransform: 'uppercase',
          textDecoration: 'none',
          color: '#fff',
          fontSize: '1.3rem',
          padding: '1rem 2.6rem',
          border: 'none',
          borderRadius: '0.4rem',
          boxShadow: '1px 1px 3px rgba(64, 64, 64, 0.5)',
          transition: 'all 0.35s',
          textAlign: 'center',
          lineHeight: '1',
          backgroundColor: '#0b5d93',
          color: '#fff',
        }}
        onClick={submit}
      >
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
