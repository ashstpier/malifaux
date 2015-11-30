import { combineReducers } from 'redux'

import title                    from './reducers/title'
import currentPageIndex         from './reducers/currentPageIndex'
import pages                    from './reducers/pages'
import currentlySelectedWidgets from './reducers/currentlySelectedWidgets'
import widgets                  from './reducers/widgets'


const reportsApp = combineReducers({
  title,
  pages,
  widgets,
  currentPageIndex,
  currentlySelectedWidgets
})

export default reportsApp