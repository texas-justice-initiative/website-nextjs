import React from 'react';
import Button, { ButtonVariant } from '@/components/Button';

export interface MailchimpFormProps {
  style?: object; // todo: can be better typed
  buttonVariant?: ButtonVariant;
}

function MailchimpForm(props: MailchimpFormProps) {
  const { style, buttonVariant = 'primary' } = props;

  return (
    <>
      <h3 style={{ marginBottom: '1em' }}>Join Our Mailing List</h3>
      <form
        action="https://texasjusticeinitiative.us18.list-manage.com/subscribe/post?u=fd262cb4a5fc0bafb38da2e22&amp;id=2663621fac"
        method="post"
        target="_blank"
        style={style}
      >
        <input
          style={{ marginBottom: '0.5em' }}
          type="text"
          placeholder="First name"
          name="FNAME"
          required
        />
        <input
          style={{ marginBottom: '0.5em' }}
          type="email"
          placeholder="Email"
          name="EMAIL"
          required
        />
        <br />
        <Button type="submit" variant={buttonVariant}>
          Subscribe
        </Button>
      </form>
    </>
  );
}

export default MailchimpForm;
