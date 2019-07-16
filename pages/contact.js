import React, { Component } from 'react';
import Head from 'next/head';
import Primary from '../components/Primary';
import Sidebar from '../components/Sidebar';
import styled from 'styled-components';
import axios from 'axios';

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
        response.status === 200
          ? this.setState({ submitted: true, submitting: false })
          : '';
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
            TJI would love to hear from you! Let us know what you think of our
            work or if you have any insight or talent to share. We are always open
            to exploring new ideas and finding new ways to present our data.
          </p>
          <h2>Share your feedback</h2>
          <Form onSubmit={this.submitForm}>
            <label htmlFor="name">Name</label>
            <input
              ref={this.nameRef}
              type="text"
              id="name"
              name="name"
              required
            />

            <label htmlFor="email">Email</label>
            <input
              ref={this.emailRef}
              type="email"
              id="email"
              name="email"
              required
            />

            <label htmlFor="subject">Subject</label>
            <input
              ref={this.subjectRef}
              type="text"
              id="subject"
              name="subject"
              required
            />
            <textarea
              ref={this.messageRef}
              name="message"
              placeholder="Message"
              required
            />
            {this.state.submitted ? (
              <div className="success">Thanks! Your message has been sent.</div>
            ) : (
              <input
                type="submit"
                className={this.state.submitting ? 'submitting' : ''}
                value={this.state.submitting ? 'submitting...' : 'submit'}
                disabled={this.state.submitting}
              />
            )}
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

          <p>We hope to encourage the continuation of Texas’ leadership in transparency in policing and accountability.</p>

          <p>We wish to give Texans of all creed more information on how law enforcement agencies and officers operate.</p>
        </Sidebar>
      </React.Fragment>
    );
  }
}

export default Page;

const Form = styled.form`
  max-width: 600px;
  margin: 2rem 0;
  display: flex;
  flex-direction: column;

  button,
  input,
  select,
  textarea {
    font-family: inherit;
    font-size: 100%;
    border: 1px solid #ccc;
    text-transform: uppercase;
  }

  textarea {
    font-size: 1rem;
    margin-top: 1rem;
    margin-bottom: 2rem;
    padding: 1rem;
    height: 200px;
    text-transform: none;
  }

  label {
    font-size: 2rem;
    text-transform: uppercase;
  }

  input {
    min-height: 2rem;
    padding: 0.2rem 1rem;
    text-transform: none;
  }

  input,
  label {
    margin-bottom: 1.4rem;
  }

  input[type='submit'] {
    background-color: ${props => props.theme.colors.primaryBlue};
    color: ${props => props.theme.colors.white};
    cursor: pointer;
    padding: 0.6rem 1.6rem;
    font-size: 2rem;
    margin: 0;
    max-width: 12rem;
    text-transform: uppercase;
    transition: all 0.4s;

    &:hover {
      background-color: #999;
    }

    &.submitting {
      opacity: 0.7;
      cursor: not-allowed;

      :hover {
        background-color: black;
      }
    }

    /* Override mobile styles */
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
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
