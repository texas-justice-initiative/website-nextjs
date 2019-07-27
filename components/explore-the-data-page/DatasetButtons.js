import React from 'react';
import styled from 'styled-components';

class DatasetButtons extends React.Component {
  render() {
    return (
      <div>
        <div>
          <strong>Select a Dataset:</strong>
        </div>
        <ButtonContainer>
          <button className="btn--primary">Deaths In Custody</button>
          <button className="btn--primary">Civilians Shot By Officers</button>
          <button className="btn--primary">Officers Shot By Civilians</button>
        </ButtonContainer>
      </div>
    );
  }
}

export default DatasetButtons;

const ButtonContainer = styled.div`
  margin: 2rem 0;
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;

  button {
    text-decoration: none;
    padding: 2rem;
    cursor: pointer;
    border-radius: 0.5rem;
  }
`;
