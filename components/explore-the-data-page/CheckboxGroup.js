import React from 'react';

class CheckboxGroup extends React.Component {
  render() {
    const { name, values, handler, isChecked, valueDecorator } = this.props;
    return (
      <div>
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
