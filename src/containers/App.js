import React, { Component, PropTypes } from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { connect } from 'react-redux'
import { setTitle, setPageOrientation, updateWidgetPosition, updateRelativeWidgetPosition, addWidget, addWidgetToPage, setSelection } from '../actions'
import { createSelector } from 'reselect'
import uuid from 'node-uuid'

import Toolbar from '../components/Toolbar'
import Viewport from '../components/Viewport'
import StatusBar from '../components/StatusBar'

class App extends Component {
  render() {
    const { dispatch, title, currentPage, currentSelection, widgetsOnCurrentPage } = this.props
    const currentSelectionPosition = currentSelection ? currentSelection.get('position').toJS() : {}
    const currentPageIndex = currentPage.get('index')
    return (
      <div>
        <Toolbar
          title={title}
          onTitleChange={title => dispatch(setTitle(title))}
          orientation={currentPage.get('orientation')}
          onPageOrientationChange={orientation => dispatch(setPageOrientation(currentPageIndex, orientation))}
          onAddWidget={(type) => this.onAddWidget(type)} />
        <Viewport
          page={currentPage}
          widgets={widgetsOnCurrentPage}
          onMoveSelection={(positionDiff) => dispatch(updateRelativeWidgetPosition(currentSelection.get('id'), positionDiff))} />
        <StatusBar
          x={currentSelectionPosition.x}
          y={currentSelectionPosition.y}
          width={currentSelectionPosition.width}
          height={currentSelectionPosition.height}
          onPostionChange={(changes) => dispatch(updateWidgetPosition(currentSelection.get('id'), changes))} />
      </div>
    )
  }

  onAddWidget(type) {
    let id = uuid.v1()
    this.props.dispatch(addWidget(id, type))
    this.props.dispatch(addWidgetToPage(id, this.props.currentPage.get('index')))
    this.props.dispatch(setSelection([id]))
  }
}

App.propTypes = {
  title:                PropTypes.string.isRequired,
  currentPage:          ImmutablePropTypes.map.isRequired,
  currentSelection:     ImmutablePropTypes.map,
  widgetsOnCurrentPage: ImmutablePropTypes.list.isRequired,
}

const currentPageSelector = state => {
  const page = state.pages.get(state.currentPageIndex)
  return page.set('index', state.currentPageIndex)
}
const titleSelector = state => state.title

const currentSelectionSelector = state => state.widgets.get(state.currentlySelectedWidgets.first())

const widgetsOnCurrentPageSelector = state => {
  const ids = currentPageSelector(state).get('widgets')
  return ids.map(id => state.widgets.get(id)).toList()
}

export const select = createSelector(
  currentPageSelector,
  currentSelectionSelector,
  titleSelector,
  widgetsOnCurrentPageSelector,
  (currentPage, currentSelection, title, widgetsOnCurrentPage) => {
    return {
      currentPage,
      currentSelection,
      title,
      widgetsOnCurrentPage
    }
  }
)

// Wrap the component to inject dispatch and state into it
export default connect(select)(App)