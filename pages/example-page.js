import React from "react";
import Page from "../components/Page";
import styled from "styled-components";

const Example = () => {
  return (
    <Page>
      <p>Example Page</p>
    </Page>
  );
};

export default Example;

const P = styled.p`
  /* Write normal CSS here */
  font-weight: bold;

  /* The base font-size is set to 10 so 1.3rem == 13px */
  font-size: 1.3rem;

  /* Use the theme values we set in the Page component */
  color: ${props => props.theme.blue};
`;
