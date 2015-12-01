import { createSelector } from 'reselect'
import { includes } from 'lodash'

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
  const x_list = selected.map(widget => widget.position.x)
  const y_list = selected.map(widget => widget.position.y)
  return {
    x: Math.min(...x_list),
    y: Math.min(...y_list),
    width: null,
    height: null
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
