import React from 'react';
import PropTypes from 'prop-types';

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

CheckboxGroup.propTypes = {
  name: PropTypes.string.isRequired,
  values: PropTypes.array.isRequired,
  handler: PropTypes.func.isRequired,
  isChecked: PropTypes.bool.isRequired,
  valueDecorator: PropTypes.func.isRequired,
};
