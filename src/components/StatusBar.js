import React, { Component, PropTypes } from 'react'

import PositionInput from './PostionInput'

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
