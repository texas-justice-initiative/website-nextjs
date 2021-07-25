import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

function ChartNote(props) {
  const { note } = props;

  return <Note className="chart__plot-note">{note}</Note>;
}

export default ChartNote;

ChartNote.propTypes = {
  note: PropTypes.string,
};

const Note = styled.span`
  display: block;
  font-style: italic;
  font-size: ${props => props.theme.typography.sizes.body.small};
  padding-left: 10px;

  &:before {
    display: inline-block;
    content: '';
    height: 1.2rem;
    width: 1.2rem;
    margin-right: 0.5rem;
    background: ${props => props.theme.colors.gray};
  }
`;
