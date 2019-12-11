import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import MailchimpForm from './MailchimpForm';

const Sidebar = props => {
  const { children } = props;
  const haveContent = children !== undefined;

  return (
    <StyledAside className="sidebar sidebar--subtle">
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
      {children && children}
      <MailchimpForm buttonClassName="btn btn--secondary" />
    </StyledAside>
  );
};
export default Sidebar;

Sidebar.propTypes = {
  children: PropTypes.node,
};

const StyledAside = styled.aside`
  flex: 1 0 342px /* large breakpoint / 3 */;
  padding: 1em;
  width: 100%;

  @media screen and (min-width: ${props => props.theme.medium}) {
    width: 342px;
  }
`;
