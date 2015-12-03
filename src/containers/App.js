import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { setTitle, setPageOrientation, updateWidgetPosition, updateRelativeWidgetPosition, addWidget, addWidgetToPage, setSelection } from '../actions'
import uuid from 'node-uuid'

import { appSelector } from '../selectors'
import Toolbar from '../components/Toolbar'
import Viewport from '../components/Viewport'
import StatusBar from '../components/StatusBar'

class App extends Component {
  render () {
    const { dispatch, title, currentPage, currentSelection, widgetsOnCurrentPage } = this.props
    const currentSelectionPosition = currentSelection ? currentSelection.position : {}
    const currentPageIndex = currentPage.index
    return (
    <div>
        <Toolbar
          title={title}
          onTitleChange={title => dispatch(setTitle(title))}
          orientation={currentPage.orientation}
          onPageOrientationChange={orientation => dispatch(setPageOrientation(currentPageIndex, orientation))}
          onAddWidget={(type) => this.onAddWidget(type)} />
        <Viewport
          page={currentPage}
          widgets={widgetsOnCurrentPage}
          onMoveSelection={(positionDiff) => dispatch(updateRelativeWidgetPosition(currentSelection.widgetIds, positionDiff))}
          onSelectWidget={(id) => dispatch(setSelection([id]))} />
        <StatusBar
          x={currentSelectionPosition.x}
          y={currentSelectionPosition.y}
          width={currentSelectionPosition.width}
          height={currentSelectionPosition.height}
          onPostionChange={(changes) => dispatch(updateWidgetPosition(currentSelection.widgetIds, changes))} />
      </div>
    )
  }

  onAddWidget (type) {
    let id = uuid.v1()
    this.props.dispatch(addWidget(id, type))
    this.props.dispatch(addWidgetToPage(id, this.props.currentPage.index))
    this.props.dispatch(setSelection([id]))
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  currentPage: PropTypes.object.isRequired,
  currentSelection: PropTypes.shape({
    widgetIds: PropTypes.arrayOf(PropTypes.string),
    position: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
      width: PropTypes.number,
      height: PropTypes.number
    })
  }),
  widgetsOnCurrentPage: PropTypes.array.isRequired
}

// Wrap the component to inject dispatch and state into it
export default connect(appSelector)(App)
