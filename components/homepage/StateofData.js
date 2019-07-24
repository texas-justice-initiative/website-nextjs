import React from 'react';
import styled from 'styled-components';
import MailChimpSimpleForm from '../MailChimpSimpleForm';

class Callout extends React.Component {
  render() {
    return (
      <FlexWrap>
        <Heading>
          <span className="calloutText">State of the Data</span>
        </Heading>
        <SignupForm>
          <h3>Keep Informed</h3>
          <p>
            <i>State of the Data</i> is our monthly newsletter where we provide updates on what we are working on and
            related news from all over Texas. Joining our newsletter ensures you continue to stay up to date on the
            latest news and legislative action related to officer involved shooting incidents in Texas.{' '}
          </p>
          <FormWrap>
            <MailChimpSimpleForm />
          </FormWrap>
        </SignupForm>
      </FlexWrap>
    );
  }
};

export default Callout;

const FlexWrap = styled.div`
  order: 3;
  display: flex;
  flex-flow: row wrap;
  width: 100%;
  margin-bottom: 4rem;

  @media screen and (min-width: ${props => props.theme.medium}) {
    align-items: stretch;
  }
`;

const Heading = styled.div`
  display: flex;
  align-items: center;
  background: ${props => props.theme.colors.primaryBlue};
  padding: 2rem;
  width: 100%;

  .calloutText {
    font-family: ${props => props.theme.displayFont};
    font-size: ${props => props.theme.calloutFont__size};
    line-height: ${props => props.theme.calloutFont__height};
    color: ${props => props.theme.colors.white};
    text-transform: uppercase;
    width: 100%;
    text-align: center;
  }

  @media screen and (min-width: ${props => props.theme.medium}) {
    width: 25%;
  }

  .calloutText {
    text-align: left;
  }
`;

const SignupForm = styled.div`
  padding: 2rem;
  background: ${props => props.theme.colors.grayLightest};

  @media screen and (min-width: ${props => props.theme.medium}) {
    width: 75%;
  }
`;

const FormWrap = styled.div`
  div {
    display: flex;
    flex-flow: row wrap;

    input[type="email"] {
      max-width: 250px;
      margin-right: 1em;
      margin-bottom: 1em;
    }

    button {
      margin-bottom: 1em;
    }
  }
`;
