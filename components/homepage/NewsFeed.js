import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styled from 'styled-components';

class NewsFeed extends React.Component {
  render() {
    return (
      <Wrapper>
        <div className="column-left">
          <h3>About TJI</h3>
          <p>
            Texas Justice Initiative is a nonprofit organization that collects, analyzes, publishes and provides
            oversight for criminal justice data throughout Texas.
          </p>
          <Link href="/about">
            <a>Learn more</a>
          </Link>
        </div>
        <div className="column-right">
          <h2>What's Happening around Texas?</h2>
          <Subtitle>Relevant stories from TJI and other sources concerning the Texas Criminal Justice system.</Subtitle>
          <p>
            A section for Eva and others to post excerpts and links to stories that may be interesting to TJI readers.
          </p>
        </div>
      </Wrapper>
    )
  }
}

export default NewsFeed;

const Wrapper = styled.div`
  order: 1;
  width: 100%;
  margin: 4em 0;
  display: flex;
  flex-flow: row wrap;

  @media screen and (min-width: ${props => props.theme.medium}) {
    order: 2;
    padding: 1em;
  }

  .column-left {
    width: 100%;
    font-size: ${props => props.theme.sidebarFont__size};

    h3 {
      margin-top: 0;
    }

    @media screen and (min-width: ${props => props.theme.medium}) {
      width: 25%;
      padding-right: 2rem;
    }
  }

  .column-right {
    width: 100%;  

    h2 {
      color: ${props => props.theme.colors.black};
    }

    @media screen and (min-width: ${props => props.theme.medium}) {
      width: 75%;
      padding-left: 1rem;
    }
  }
`;

const Subtitle = styled.span`
  display: block;
  font-size: ${props => props.theme.sidebarFont__size};
`;
