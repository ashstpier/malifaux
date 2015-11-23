import React, { Component, PropTypes } from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { DropTarget, DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';


import Page from './Page'

class Viewport extends Component {
  render() {
    const { page, widgets } = this.props;
    return (
      <div id="viewport">
        <div id="pages">
          <Page
            orientation={page.get('orientation')}
            widgets={widgets}
            onMoveSelection={this.props.onMoveSelection}/>
        </div>
      </div>
    )
  }
}

Viewport.propTypes = {
  page: ImmutablePropTypes.contains({
    orientation: PropTypes.string.isRequired,
    widgets: ImmutablePropTypes.list.isRequired,
  }).isRequired,
  onMoveSelection: PropTypes.func.isRequired
}

export default DragDropContext(HTML5Backend)(Viewport)