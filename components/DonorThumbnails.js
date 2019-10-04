import React from 'react';
import styled from 'styled-components';

const DonorThumbnails = () => (
  <Wrapper>
    <div>
      <img src="/static/donors/Awesome-ATX-300x300.png" alt="Awesome Foundation Austin" />
    </div>
    <div>
      <img src="/static/donors/CKI-Logo-RGB-300x300.png" alt="Charles Kock Institute" />
    </div>
    <div>
      <img src="/static/donors/credcon_logo_small.jpg" alt="Credcon" />
    </div>
    <div>
      <img src="/static/donors/Newmanlogo-thumb-360x200.png" alt="John & Florence Newman Foundation" />
    </div>
  </Wrapper>
);

export default DonorThumbnails;

const Wrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;
  align-items: center;
  padding: 2rem;
  width: 100%;

  div {
    width: 50%;
    padding: 2rem;

    @media screen and (min-width: ${props => props.theme.medium}) {
      width: 25%;
      padding: 0 2rem;
    }

    img {
      width: 100%;
      height: auto;
    }
  }
`;
