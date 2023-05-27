'use client';
/* eslint-disable react/no-danger */

import React, { useState } from 'react';
import styled from 'styled-components';
import Primary from '@/components/Primary';
import Sidebar from '@/components/Sidebar';
import Layout from '@/components/Layout';
import Button from '@/components/Button';

function Contact(props) {
  const { content } = props;
  const {
    html,
    attributes: { title },
  } = content;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  function handleInput(event) {
    const {
      target: { name, value },
    } = event;

    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'subject':
        setSubject(value);
        break;
      case 'message':
        setMessage(value);
        break;
      default:
        break;
    }
  }

  return (
    <Layout>
      <Primary>
        <h1>{title}</h1>
        <div dangerouslySetInnerHTML={{ __html: html }} />
        <Form
          name="contact"
          method="post"
          action="/thanks/"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          className="contact-form"
        >
          <input type="hidden" name="bot-field" />
          <input type="hidden" name="form-name" value="contact" />
          <div className="contact-form__row">
            <div className="contact-form__field contact-form__field--medium">
              <label htmlFor="name">
                Name *
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Full Name"
                  value={name}
                  onChange={handleInput}
                  required
                />
              </label>
            </div>
            <div className="contact-form__field contact-form__field--medium">
              <label htmlFor="email">
                Email *
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={handleInput}
                  required
                />
              </label>
            </div>
          </div>
          <div className="contact-form__row">
            <div className="contact-form__field contact-form__field--medium">
              <label htmlFor="subject">
                Subject *
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  placeholder="How can we help you?"
                  value={subject}
                  onChange={handleInput}
                  required
                />
              </label>
            </div>
          </div>
          <div className="contact-form__row">
            <div className="contact-form__field">
              <label htmlFor="message">
                Comment or Message *
                <textarea
                  name="message"
                  id="message"
                  value={message}
                  onChange={handleInput}
                  placeholder="What are you looking for?"
                />
              </label>
            </div>
          </div>
          <div className="contact-form__row">
            <div className="contact-form__field">
              <Button type="submit">Submit</Button>
            </div>
          </div>
        </Form>
      </Primary>
      <Sidebar />
    </Layout>
  );
}

export default Contact;

const Form = styled.form`
  .contact-form__row {
    display: flex;
    flex-flow: row wrap;
    margin: 2rem 0;
  }
  .contact-form__field {
    width: 100%;
    margin: 0.5rem 0;
  }
  label {
    display: block;
    font-size: ${(props) => props.theme.typography.sizes.body.regular};
    float: none;
    font-weight: 700;
    line-height: 1.3;
    padding: 0;
  }
  .contact-form__field input[type='text'],
  .contact-form__field input[type='email'] {
    display: block;
    font-size: ${(props) => props.theme.typography.sizes.body.regular};
    border: 1px solid #ccc;
    padding: 6px 10px;
    height: 38px;
    width: 100%;
    line-height: 1.3;
  }
  textarea {
    width: 100%;
    height: 200px;
    padding: 6px 10px;
    font-size: ${(props) => props.theme.typography.sizes.body.regular};
  }

  @media screen and (min-width: ${(props) => props.theme.breakpoints.medium}) {
    .contact-form__field {
      padding-right: 2rem;
    }
    .contact-form__field--medium {
      width: 50%;
    }
  }

  div.success {
    background-color: green;
    color: white;
    padding: 0.6rem 1.6rem;
    font-size: 1.2rem;
    margin: 0;
    margin-left: auto;
    text-transform: uppercase;
  }
`;
