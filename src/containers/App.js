import React, { Component, PropTypes } from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { connect } from 'react-redux'
import { setTitle, setPageOrientation, updateWidgetPosition, updateRelativeWidgetPosition } from '../actions'
import { createSelector } from 'reselect'

import Toolbar from '../components/Toolbar'
import Viewport from '../components/Viewport'
import StatusBar from '../components/StatusBar'

class App extends Component {
  render() {
    const { dispatch, title, currentPage, currentSelection, widgetsOnCurrentPage } = this.props
    const currentSelectionPosition = currentSelection.get('position')
    const currentPageIndex = currentPage.get('index')
    return (
      <div>
        <Toolbar
          title={title}
          onTitleChange={title => dispatch(setTitle(title))}
          orientation={currentPage.get('orientation')}
          onPageOrientationChange={orientation => dispatch(setPageOrientation(currentPageIndex, orientation))} />
        <Viewport
          page={currentPage}
          widgets={widgetsOnCurrentPage}
          onMoveSelection={(positionDiff) => dispatch(updateRelativeWidgetPosition(currentSelection.get('id'), positionDiff))} />
        <StatusBar
          x={currentSelectionPosition.get('x')}
          y={currentSelectionPosition.get('y')}
          width={currentSelectionPosition.get('width')}
          height={currentSelectionPosition.get('height')}
          onPostionChange={(changes) => dispatch(updateWidgetPosition(currentSelection.get('id'), changes))} />
      </div>
    )
  }
}

App.propTypes = {
  title:                PropTypes.string.isRequired,
  currentPage:          ImmutablePropTypes.map.isRequired,
  currentSelection:     ImmutablePropTypes.map.isRequired,
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