import React, { Component, PropTypes } from 'react'

class PositionInput extends Component {
  render () {
    const { name, value, onChange } = this.props
    const disabled = (value === undefined)
    return (
    <span>
      <label htmlFor='prop-value-{name}'>{name}:</label>
      <input
        type='number'
        step='1'
        id='prop-value-{name}'
        className='prop-coord-input'
        value={value}
        onChange={onChange}
        disabled={disabled} />
      </span>
    )
  }
}

PositionInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.number,
  onChange: PropTypes.func
}

export default PositionInput
