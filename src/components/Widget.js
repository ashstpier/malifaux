import React, { Component, PropTypes } from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { DragSource } from 'react-dnd';

const widgetSource = {
  beginDrag(props) {
    return {};
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}


class Widget extends Component {
  render() {
    const { type, position, data } = this.props
    const { connectDragSource, isDragging } = this.props
    const style = {
      left:   position.get('x'),
      top:    position.get('y'),
      width:  position.get('width'),
      height: position.get('height'),
      opacity: isDragging ? 0.5 : 1
    }
    return connectDragSource(
      <div className="widget" style={style}>
        {data.get('value')}
      </div>
    )
  }
}

Widget.propTypes = {
  type: PropTypes.string.isRequired,
  position: ImmutablePropTypes.map.isRequired,
  data: ImmutablePropTypes.map,
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired
}

export default DragSource('widget', widgetSource, collect)(Widget);
