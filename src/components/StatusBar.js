import React, { Component, PropTypes } from 'react'

class PositionInput extends Component {
  render () {
    const { name, value, onChange } = this.props
    const disabled = (value === undefined)
    return (
    <span>
      <label htmlFor='prop-value-{name}'>{name}:</label>
      <input type='number'
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

class StatusBar extends Component {
  render () {
    const { x, y, width, height } = this.props
    return (
    <div id='statusbar'>
        <div className='coordinates'>
          <PositionInput name='x' value={x} onChange={this.updatePosition('x')} />
          <PositionInput name='y' value={y} onChange={this.updatePosition('y')} />
          <PositionInput name='width' value={width} onChange={this.updatePosition('width')} />
          <PositionInput name='height' value={height} onChange={this.updatePosition('height')} />
        </div>
      </div>
    )
  }

  updatePosition (attr) {
    return (e) => this.props.onPostionChange({ [attr]: Number(e.target.value) })
  }
}

StatusBar.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  onPostionChange: PropTypes.func.isRequired
}

export default StatusBar
