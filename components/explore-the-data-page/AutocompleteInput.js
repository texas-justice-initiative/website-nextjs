/* eslint-disable react/prop-types */

import React from 'react'
import PropTypes from 'prop-types'
import CheckboxGroup from './CheckboxGroup'

class AutocompleteInput extends React.Component {
  constructor(props) {
    super(props)
    this.handleInput = this.handleInput.bind(this)
  }

  handleInput(event) {
    const { options, handleAutocompleteSelection } = this.props
    const { value } = event.target

    if (options.includes(value)) {
      handleAutocompleteSelection(event)
      event.target.value = ''
    }
  }

  render() {
    const { name, options, handler, isChecked, updateAll } = this.props

    const visibleOptions = Object.entries(isChecked[name])
      .filter((record) => record[1] === true)
      .map((record) => record[0])

    return (
      <div>
        <datalist id={`${name}-options`}>
          {options
            .filter((option) => !visibleOptions.includes(option))
            .map((option) => (
              // eslint-disable-next-line jsx-a11y/control-has-associated-label
              <option key={option} value={option} />
            ))}
        </datalist>
        <input
          type="text"
          list={`${name}-options`}
          name={name}
          onInput={this.handleInput}
          autoComplete="off"
        />
        <CheckboxGroup
          name={name}
          values={visibleOptions}
          handler={handler}
          isChecked={isChecked}
          updateAll={updateAll}
        />
      </div>
    )
  }
}

export default AutocompleteInput

AutocompleteInput.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  handler: PropTypes.func.isRequired,
  isChecked: PropTypes.object.isRequired,
  handleAutocompleteSelection: PropTypes.func.isRequired,
}
