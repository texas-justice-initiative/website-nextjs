/* eslint-disable no-console, no-unused-expressions, react/destructuring-assignment, react/no-access-state-in-setstate, jsx-a11y/label-has-for, jsx-a11y/label-has-associated-control */

import React, { Component } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import axios from 'axios';
import Primary from '../components/Primary';
import Sidebar from '../components/Sidebar';

const pageTitle = 'Contact Texas Justice Initiative';

class Page extends Component {
  constructor(props) {
    super(props);
    this.nameRef = React.createRef();
    this.emailRef = React.createRef();
    this.subjectRef = React.createRef();
    this.messageRef = React.createRef();
  }

  state = {
    submitting: false,
    submitted: false,
  };

  submitForm = e => {
    e.preventDefault();
    this.setState({ submitting: true });
    const name = this.nameRef.current.value;
    const email = this.emailRef.current.value;
    const subject = this.subjectRef.current.value;
    const message = this.messageRef.current.value;
    console.log(name, email, message);

    axios({
      method: 'post',
      url: '/api/contact',
      data: {
        name,
        email,
        subject,
        message,
      },
    })
      .then(response => {
        // handle success
        console.log(response);
        response.status === 200 ? this.setState({ submitted: true, submitting: false }) : '';
      })
      .catch(function(response) {
        // handle error
        console.log(response);
      });
  };

  handleChange = e => {
    const formData = { ...this.state.formData };
    formData[e.target.name] = e.target.value;
    this.setState({ formData });
  };

  render() {
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
          <Form onSubmit={this.submitForm} className="contact-form">
            <div className="contact-form__row">
              <div className="contact-form__field contact-form__field--medium">
                <label htmlFor="name">Name *</label>
                <input ref={this.nameRef} type="text" id="name" name="name" placeholder="Full Name" required />
              </div>
              <div className="contact-form__field contact-form__field--medium">
                <label htmlFor="email">Email *</label>
                <input
                  ref={this.emailRef}
                  type="email"
                  id="email"
                  name="email"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <div className="contact-form__row">
              <div className="contact-form__field contact-form__field--medium">
                <label htmlFor="subject">Subject *</label>
                <input
                  ref={this.subjectRef}
                  type="text"
                  id="subject"
                  name="subject"
                  placeholder="How can we help you?"
                  required
                />
              </div>
            </div>

            <div className="contact-form__row">
              <div className="contact-form__field">
                <label htmlFor="message">Comment or Message *</label>
                <textarea ref={this.messageRef} name="message" placeholder="Message" required />
              </div>
            </div>

            <div className="contact-form__row">
              <div className="contact-form__field">
                {this.state.submitted ? (
                  <div className="success">Thanks! Your message has been sent.</div>
                ) : (
                  <input
                    type="submit"
                    className={this.state.submitting ? 'submitting btn btn--primary' : 'btn btn--primary'}
                    value={this.state.submitting ? 'submitting...' : 'submit'}
                    disabled={this.state.submitting}
                  />
                )}
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
