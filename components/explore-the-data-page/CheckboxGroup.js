import React from 'react';
import styled from 'styled-components';

class CheckboxGroup extends React.Component {
  render() {
    const { name, values, handler, isChecked, valueDecorator, updateAll } = this.props;
    const selectAll = () => updateAll({groupName: name, isChecked: true});
    const deselectAll = () => updateAll({groupName: name, isChecked: false});
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
      ) : ''}

        {values.map(value => (
          <div key={value}>
            <label>
              <input onChange={handler} type="checkbox" name={name} checked={isChecked[name][value]} value={value} />
              {valueDecorator ? valueDecorator(value) : value}
            </label>
          </div>
        ))}
      </div>
    );
  }
}

export default CheckboxGroup;

const SelectDeselectAll = styled.span`
  a.select-deselect-all {
    color: inherit;
    cursor: pointer;
  }
`;
