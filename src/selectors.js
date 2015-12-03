import { createSelector } from 'reselect'
import { includes, min } from 'lodash'

const currentPageSelector = state => {
  const page = state.pages[state.currentPageIndex]
  return Object.assign({}, page, {index: state.currentPageIndex})
}

const titleSelector = state => state.title

const widgetsOnCurrentPageSelector = createSelector(
  currentPageSelector,
  state => state.widgets,
  (currentPage, widgets) => currentPage.widgets.map(id => widgets[id])
)

const minCoordinateSelector = (selected) => {
  if (selected.length === 0) {
    return {x: null, y: null, width: null, height: null}
  }
  const findMin = (attr) => min(selected, widget => widget.position[attr]).position[attr]
  return {
    x: findMin('x'),
    y: findMin('y'),
    width: findMin('width'),
    height: findMin('height')
  }
}

const selectedWidgetIdsSelector = (state) => state.currentlySelectedWidgets

const selectedWidgetsSelector = (state) => state.currentlySelectedWidgets.map(id => state.widgets[id])

const widgetsOnCurrentPageWithSelectedSelector = createSelector(
  selectedWidgetIdsSelector,
  widgetsOnCurrentPageSelector,
  (selectedWidgetIds, widgets) => {
    return widgets.map((widget) => Object.assign({}, widget, {selected: includes(selectedWidgetIds, widget.id)}))
  }
)

const currentSelectionSelector = createSelector(
  selectedWidgetIdsSelector,
  selectedWidgetsSelector,
  (selectedWidgetIds, selectedWidgets) => {
    return {
      widgetIds: selectedWidgetIds,
      position: minCoordinateSelector(selectedWidgets)
    }
  }
)

export const appSelector = createSelector(
  currentPageSelector,
  currentSelectionSelector,
  titleSelector,
  widgetsOnCurrentPageWithSelectedSelector,
  (currentPage, currentSelection, title, widgetsOnCurrentPage) => {
    return {
      currentPage,
      currentSelection,
      title,
      widgetsOnCurrentPage
    }
  }
)
