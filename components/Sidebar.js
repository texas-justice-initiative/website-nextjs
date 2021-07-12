/* eslint-disable react/no-danger */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import MailchimpForm from './MailchimpForm';
import content from '../content/about-sidebar.md';

const { html } = content;

const Sidebar = props => {
  const { children } = props;
  const haveContent = children !== undefined;

  return (
    <StyledAside className="sidebar sidebar--subtle">
      {!haveContent && (
        <React.Fragment>
          <div dangerouslySetInnerHTML={{ __html: html }} />
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
  width: 100%;

  @media screen and (min-width: ${props => props.theme.breakpoints.medium}) {
    width: 342px;
  }
`;
