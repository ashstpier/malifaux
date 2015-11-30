import React, { Component, PropTypes } from 'react'
import Widget from './Widget'
import { DropTarget } from 'react-dnd';

const pageTarget = {
  drop(props, monitor, component) {
    component.moveSelection(monitor.getDifferenceFromInitialOffset());
  }
}

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  }
}

class Page extends Component {
  render() {
    const { orientation, widgets, connectDropTarget } = this.props
    return connectDropTarget(
      <div className="page" data-orientation={orientation}>
        {widgets.map((widget, index) =>
          <Widget type={widget.type}
                  position={widget.position}
                  data={widget.data}
                  selected={widget.selected}
                  key={index} />
        )}
      </div>
    )
  }

  moveSelection(positionDiff) {
    this.props.onMoveSelection(positionDiff)
  }
}

Page.propTypes = {
  orientation: PropTypes.oneOf([
    'portrait',
    'landscape'
  ]).isRequired,
  widgets: PropTypes.array.isRequired,
  onMoveSelection: PropTypes.func.isRequired
}

export default DropTarget('widget', pageTarget, collect)(Page)