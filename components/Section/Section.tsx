import React from 'react';
import styled from 'styled-components';

function Section(props: { children: React.ReactNode }) {
  const { children } = props;
  return <StyledSection>{children}</StyledSection>;
}

export default Section;

const StyledSection = styled.section`
  margin-block: 64px;
`;
