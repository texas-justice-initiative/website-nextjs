import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MailchimpForm extends Component {
  render() {
    const { style } = this.props;

    return (
      <form
        action="https://texasjusticeinitiative.us18.list-manage.com/subscribe/post?u=fd262cb4a5fc0bafb38da2e22&amp;id=2663621fac"
        method="post"
        target="_blank"
        style={style}
      >
        <input style={{ marginBottom: '0.5em' }} type="text" placeholder="First name" name="FNAME" required />
        <input style={{ marginBottom: '0.5em' }} type="email" placeholder="Email" name="EMAIL" required />
        <br />
        <button type="submit" className="btn btn--primary" style={{ marginTop: '0.5em' }}>
          Subscribe
        </button>
      </form>
    );
  }
}

MailchimpForm.propTypes = {
  style: PropTypes.object,
};

export default MailchimpForm;
