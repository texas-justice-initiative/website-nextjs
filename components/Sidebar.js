/* eslint-disable react/destructuring-assignment */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import MailchimpForm from './MailchimpForm';

const Sidebar = props => {
  const haveContent = props.children !== undefined;

  return (
    <StyledAside>
      {!haveContent && (
        <React.Fragment>
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

          <h3 style={{ marginBottom: '1em' }}>Join Our Mailing List</h3>
        </React.Fragment>
      )}
      {props.children && props.children}
      <MailchimpForm buttonClassName="btn btn--secondary" />
    </StyledAside>
  );
};
export default Sidebar;

Sidebar.propTypes = {
  children: PropTypes.node,
};

const StyledAside = styled.aside`
  padding: 1em;
  width: 100%;
  background-color: ${props => props.theme.colors.primaryBlue};
  color: ${props => props.theme.colors.white};

  h3 {
    color: ${props => props.theme.colors.white};
    border-bottom: 1px solid ${props => props.theme.colors.white};
  }

  a {
    color: ${props => props.theme.colors.primaryYellow};
  }

  p {
    font-size: ${props => props.theme.sidebarFont__size};
    line-height: 1.25;
  }

  @media screen and (min-width: ${props => props.theme.medium}) {
    padding: 2em;
    width: 25%;
    box-shadow: -2px 0 3px rgba(65, 65, 65, 0.5);
    min-height: calc(100vh - 100px);
  }
`;
