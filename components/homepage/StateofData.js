import React from 'react';
import styled from 'styled-components';
import MailChimpSimpleForm from '../MailChimpSimpleForm';

class Callout extends React.Component {
  render() {
    return (
      <FlexWrap>
        <Heading>State of the Data</Heading>
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

  @media screen and (min-width: ${props => props.theme.medium}) {
    align-items: center;
  }
`;

const Heading = styled.div`
  background: ${props => props.theme.colors.primaryBlue};
  font-family: ${props => props.theme.displayFont};
  font-size: ${props => props.theme.calloutFont__size};
  line-height: ${props => props.theme.calloutFont__height};
  color: ${props => props.theme.colors.white};
  text-transform: uppercase;
  padding: 2rem;

  @media screen and (min-width: ${props => props.theme.medium}) {
    width: 25%;
  }
`;

const SignupForm = styled.div`
  padding: 2rem;

  @media screen and (min-width: ${props => props.theme.medium}) {
    width: 75%;
    background: ${props => props.theme.colors.grayLightest};
  }
`;

const FormWrap = styled.div`
  width: 100%;
  max-width: 300px;
`;
