import React from 'react';

class CheckboxGroup extends React.Component {
  render() {
    const { name, values, handler, isChecked } = this.props;
    return (
      <div>
        {values.map(value => (
          <div key={value}>
            <label htmlFor={value}>
              <input
                onChange={handler}
                id={value}
                type="checkbox"
                name={name}
                checked={isChecked[name][value]}
                value={value}
              />
              {isNaN(value) ? value.toLowerCase() : value}
            </label>
          </div>
        ))}
      </div>
    );
  }
}

export default CheckboxGroup;