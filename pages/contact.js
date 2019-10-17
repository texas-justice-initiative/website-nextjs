/* eslint-disable no-console, no-unused-expressions, react/destructuring-assignment, react/no-access-state-in-setstate, jsx-a11y/label-has-for, jsx-a11y/label-has-associated-control */

import React, { Component } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import Primary from '../components/Primary';
import Sidebar from '../components/Sidebar';

const pageTitle = 'Contact Texas Justice Initiative';

class Page extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      subject: '',
      message: '',
    };
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { name, email, subject, message } = this.state;
    return (
      <React.Fragment>
        <Head>
          <title>Texas Justice Initiative | {pageTitle}</title>
        </Head>
        <Primary>
          <h1>{pageTitle}</h1>
          <p>
            TJI would love to hear from you! Let us know what you think of our work or if you have any insight or talent
            to share. We are always open to exploring new ideas and finding new ways to present our data.
          </p>
          <h2>Share your feedback</h2>
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
                <label htmlFor="name">Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Full Name"
                  value={name}
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div className="contact-form__field contact-form__field--medium">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={this.handleChange}
                  required
                />
              </div>
            </div>
            <div className="contact-form__row">
              <div className="contact-form__field contact-form__field--medium">
                <label htmlFor="subject">Subject *</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  placeholder="How can we help you?"
                  value={subject}
                  onChange={this.handleChange}
                  required
                />
              </div>
            </div>
            <div className="contact-form__row">
              <div className="contact-form__field">
                <label htmlFor="message">Comment or Message *</label>
                <textarea
                  name="message"
                  value={message}
                  onChange={this.handleChange}
                  placeholder="What are you looking for?"
                />
              </div>
            </div>
            <div className="contact-form__row">
              <div className="contact-form__field">
                <input type="submit" className="btn btn--primary" value="submit" />
              </div>
            </div>
          </Form>
        </Primary>
        <Sidebar>
          <h3>Our Mission</h3>
          <p>
            Collect, vet and publicly release information on criminal justice and policing in Texas while pushing for
            improved transparency.
          </p>
          <h3>Our Vision</h3>
          <p>
            To give Texans the most dependable data and most complete picture of law enforcement in the state, enabling
            better understanding.
          </p>
          <h3>Our Values</h3>
          <p>We provide oversight of the data released by state and local governmental entities.</p>
          <p>
            We seek to improve understanding through presenting information in a rich context and combining a variety of
            data.
          </p>
          <p>
            We hope to encourage the continuation of Texas’ leadership in transparency in policing and accountability.
          </p>
          <p>
            We wish to give Texans of all creed more information on how law enforcement agencies and officers operate.
          </p>
        </Sidebar>
      </React.Fragment>
    );
  }
}

export default Page;

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
    font-size: ${props => props.theme.bodyFont__size};
    float: none;
    font-weight: 700;
    line-height: 1.3;
    padding: 0;
  }
  .contact-form__field input[type='text'],
  .contact-form__field input[type='email'] {
    display: block;
    font-size: ${props => props.theme.bodyFont__size};
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
    font-size: ${props => props.theme.bodyFont__size};
  }

  @media screen and (min-width: ${props => props.theme.medium}) {
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
