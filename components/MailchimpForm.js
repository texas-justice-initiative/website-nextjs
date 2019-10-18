/* eslint-disable react/no-danger, no-dupe-keys */

import React, { Component } from 'react';

class MailchimpForm extends Component {
  render() {
    return (
      <form
        action="https://texasjusticeinitiative.us18.list-manage.com/subscribe/post?u=fd262cb4a5fc0bafb38da2e22&amp;id=2663621fac"
        method="post"
        target="_blank"
      >
        <input
          className="contact-form__field contact-form__field--medium"
          style={{ 'margin-bottom': '0.5em' }}
          type="text"
          placeholder="Name"
          name="FNAME"
          required
        />
        <input
          className="contact-form__field contact-form__field--medium"
          style={{ 'margin-bottom': '0.5em' }}
          type="email"
          placeholder="Email"
          name="EMAIL"
          required
        />
        <br />
        <button type="submit" className="btn btn--primary" style={{ 'margin-top': '0.5em' }}>
          Subscribe
        </button>
      </form>
    );
  }
}

export default MailchimpForm;
