import React, { Component } from 'react';
import MailchimpSubscribe from 'react-mailchimp-subscribe';

class MailChimpForm extends Component {
  render() {
    const url =
      'https://texasjusticeinitiative.us18.list-manage.com/subscribe/post?u=fd262cb4a5fc0bafb38da2e22&amp;id=2663621fac';
    return <MailchimpSubscribe url={url} />;
  }
}

export default MailChimpForm;
