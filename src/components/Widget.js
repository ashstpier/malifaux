import React, { Component, PropTypes } from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'


class Widget extends Component {
  render() {
    const { type, data } = this.props
    return (
      <div className="widget">
        {data.get('value')}
      </div>
    )
  }
}

Widget.propTypes = {
  type: PropTypes.string.isRequired,
  data: ImmutablePropTypes.map
}

export default Widget