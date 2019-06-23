import React from 'react';
import styled from 'styled-components';

const BlockQuote = props => (
    <StyledDiv>
        <p>
            {props.children}
        </p>
    </StyledDiv>
);

export default BlockQuote;

const StyledDiv = styled.div`
    font-size: 2rem;
    color: ${props => props.theme.colors.primaryBlue};
    letter-spacing: 2px;
    font-style: italic;
    margin: 4rem 1rem 4rem 0;
    text-align: right;
`;
