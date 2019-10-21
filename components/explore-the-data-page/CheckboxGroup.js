/* eslint-disable react/prop-types, jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions, jsx-a11y/label-has-associated-control, jsx-a11y/label-has-for */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

class CheckboxGroup extends React.Component {
  render() {
    const { name, values, handler, isChecked, valueDecorator, updateAll } = this.props;
    console.log(name, valueDecorator, values);
    const selectAll = () => updateAll({ groupName: name, isChecked: true });
    const deselectAll = () => updateAll({ groupName: name, isChecked: false });
    return (
      <div>
        {values.length ? (
          <SelectDeselectAll>
            <a className="select-deselect-all" onClick={selectAll}>
              Select All
            </a>
            <span> / </span>
            <a className="select-deselect-all" onClick={deselectAll}>
              Deselect All
            </a>
          </SelectDeselectAll>
        ) : (
          ''
        )}

        {values.map(value => (
          <div key={value}>
            <label>
              <input onChange={handler} type="checkbox" name={name} checked={isChecked[name][value]} value={value} />
              {`${valueDecorator ? valueDecorator(value) : value}`}
            </label>
          </div>
        ))}
      </div>
    );
  }
}

export default CheckboxGroup;

CheckboxGroup.propTypes = {
  name: PropTypes.string.isRequired,
  values: PropTypes.array.isRequired,
  handler: PropTypes.func.isRequired,
  isChecked: PropTypes.object.isRequired,
  valueDecorator: PropTypes.func,
};

const SelectDeselectAll = styled.span`
  a.select-deselect-all {
    color: inherit;
    cursor: pointer;
  }
`;
