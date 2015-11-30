import React, { Component, PropTypes } from 'react'
import { DragSource } from 'react-dnd';
import classNames from 'classnames';

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
    const { type, position, data, selected } = this.props
    const { connectDragSource, isDragging } = this.props
    const style = {
      left:   position.x,
      top:    position.y,
      width:  position.width,
      height: position.height,
      opacity: isDragging ? 0.5 : 1
    }
    return connectDragSource(
      <div className={classNames('widget', {'widget-selected': selected})} style={style}>
        {data.value}
      </div>
    )
  }
}

Widget.propTypes = {
  type: PropTypes.string.isRequired,
  position: PropTypes.object.isRequired,
  data: PropTypes.object,
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
  selected: PropTypes.bool.isRequired
}

export default DragSource('widget', widgetSource, collect)(Widget);
