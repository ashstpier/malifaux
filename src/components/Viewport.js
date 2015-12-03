import React, { Component, PropTypes } from 'react'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import Page from './Page'

class Viewport extends Component {
  render () {
    const { page, widgets } = this.props
    return (
    <div id='viewport'>
        <div id='pages'>
          <Page orientation={page.orientation}
                widgets={widgets}
                onMoveSelection={this.props.onMoveSelection}
                onSelectWidget={this.props.onSelectWidget} />
        </div>
      </div>
    )
  }
}

Viewport.propTypes = {
  page: PropTypes.shape({
    orientation: PropTypes.string.isRequired,
    widgets: PropTypes.array.isRequired
  }).isRequired,
  widgets: PropTypes.array.isRequired,
  onMoveSelection: PropTypes.func,
  onSelectWidget: PropTypes.func
}

export default DragDropContext(HTML5Backend)(Viewport)
