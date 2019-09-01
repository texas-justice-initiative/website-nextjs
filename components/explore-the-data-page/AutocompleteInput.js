import React from 'react';
import CheckboxGroup from './CheckboxGroup';

class AutocompleteInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { visibleOptions: [] };
    this.updateVisibleOptions = this.updateVisibleOptions.bind(this);
  }

  updateVisibleOptions(event) {
    const { options } = this.props;
    const { value } = event.target;
    const { visibleOptions } = this.state;

    if (options.includes(value) && !visibleOptions.includes(value)) {
      this.setState({ visibleOptions: [].concat(visibleOptions, value) });
    }
  }

  render() {
    const { name, options, handler, isChecked } = this.props;
    const { visibleOptions } = this.state;
    return (
      <div>
        <datalist id={`${name}-options`}>
          {options.map(option => (
            <option key={option} value={option} />
          ))}
        </datalist>
        <input type="text" list={`${name}-options`} name={name} onInput={this.updateVisibleOptions} />
        <CheckboxGroup name={name} values={visibleOptions} handler={handler} isChecked={isChecked} />
      </div>
    );
  }
}

export default AutocompleteInput;
