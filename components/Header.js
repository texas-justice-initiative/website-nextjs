import React from "react";
import Link from "next/link";
import styled from "styled-components";

const Header = () => (
  <StyledHeader>
    <nav>
      {/* TODO: Get Logo as SVG */}
      <Link href="/">
        <a>Home</a>
      </Link>
      <Link href="/about">
        <a>About</a>
      </Link>
      <Link href="/contact">
        <a>Contact</a>
      </Link>
    </nav>
  </StyledHeader>
);

export default Header;

const StyledHeader = styled.header`
  padding: 2rem;

  a {
    display: inline-block;
    padding-right: 1rem;
  }
`;
