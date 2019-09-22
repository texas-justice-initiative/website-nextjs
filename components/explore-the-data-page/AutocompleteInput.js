import React from 'react';
import PropTypes from 'prop-types';
import CheckboxGroup from './CheckboxGroup';

class AutocompleteInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { visibleOptions: [] };
    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(event) {
    const { options, handleAutocompleteSelection } = this.props;
    const { value } = event.target;
    const { visibleOptions } = this.state;

    if (options.includes(value) && !visibleOptions.includes(value)) {
      this.setState({ visibleOptions: [].concat(visibleOptions, value) });
      handleAutocompleteSelection(event);
      event.target.value = '';
    }
  }

  render() {
    const { name, options, handler, isChecked, updateAll } = this.props;
    const { visibleOptions } = this.state;
    return (
      <div>
        <datalist id={`${name}-options`}>
          {options
            .filter(option => !visibleOptions.includes(option))
            .map(option => (
              <option key={option} value={option} />
            ))}
        </datalist>
        <input type="text" list={`${name}-options`} name={name} onInput={this.handleInput} autoComplete="off" />
        <CheckboxGroup
          name={name}
          values={visibleOptions}
          handler={handler}
          isChecked={isChecked}
          updateAll={updateAll}
        />
      </div>
    );
  }
}

export default AutocompleteInput;

AutocompleteInput.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  handler: PropTypes.func.isRequired,
  isChecked: PropTypes.object.isRequired,
  handleAutocompleteSelection: PropTypes.func.isRequired,
};
