import React, { Component, PropTypes } from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'


class Widget extends Component {
  render() {
    const { type, position, data } = this.props
    const style = {
      left:   position.get('x'),
      top:    position.get('y'),
      width:  position.get('width'),
      height: position.get('height')
    }
    return (
      <div className="widget" style={style}>
        {data.get('value')}
      </div>
    )
  }
}

Widget.propTypes = {
  type: PropTypes.string.isRequired,
  position: ImmutablePropTypes.map.isRequired,
  data: ImmutablePropTypes.map
}

export default Widget