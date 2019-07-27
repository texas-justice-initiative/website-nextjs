import React from 'react';
import styled from 'styled-components';
import chartColors from '../../../data/chart_colors';

const Legend = props => {
  // Define our props
  const { chartFields } = props;

  // Build our legend items with series color and series title
  const legendItems = [];
  for (let i = 0; i < chartFields.length; i++) {
    legendItems[i] = {
      color: chartColors[i],
      text: chartFields[i],
    };
  }

  return (
    <ul className="chart-legend">
      {legendItems.map((value, index) => (
        <LegendItem key={index} backgroundColor={value.color}>
          <span className="legend-color" />
          {value.text.toLowerCase()}
        </LegendItem>
      ))}
    </ul>
  );
};

export default Legend;

const LegendItem = styled.li`
  .legend-color {
    display: inline-block;
    height: 1.2rem;
    margin-right: 0.5rem;
    width: 1.2rem;
    background: ${props => props.backgroundColor};
  }
`;
