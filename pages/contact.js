import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';

class Contact extends Component {
  constructor(props) {
    super(props);
    this.nameRef = React.createRef();
    this.emailRef = React.createRef();
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
    const message = this.messageRef.current.value;
    console.log(name, email, message);

    axios({
      method: 'post',
      url: '/api/contact',
      data: {
        name,
        email,
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
      <div>
        <h1>Contact Us</h1>

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
      </div>
    );
  }
}

export default Contact;

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
    background-color: black;
    color: white;
    cursor: pointer;
    padding: 0.6rem 1.6rem;
    font-size: 2rem;
    margin: 0;
    margin-left: auto;
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
