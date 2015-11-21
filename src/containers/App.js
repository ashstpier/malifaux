import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { setTitle, setPageOrientation } from '../actions'
import Toolbar from '../components/Toolbar'
import Viewport from '../components/Viewport'
import Sidebar from '../components/Sidebar'
import { createSelector } from 'reselect'

class App extends Component {
  render() {
    // Injected by connect() call:
    console.log(this.props)
    const { dispatch, title, currentPage } = this.props
    return (
      <div>
        <Toolbar
          title={title}
          onTitleChange={title => dispatch(setTitle(title))} />
        <Viewport
          page={currentPage} />
        <Sidebar
          orientation={currentPage.get('orientation')}
          onPageOrientationChange={orientation => dispatch(setPageOrientation(currentPage.get('index'), orientation))}/>
      </div>
    )
  }
}

App.propTypes = {
  title: PropTypes.string.isRequired
}

const currentPageSelector = state => state.pages.get(state.currentPageIndex).set('index', state.currentPageIndex)
const titleSelector = state => state.title

export const select = createSelector(
  currentPageSelector,
  titleSelector,
  (currentPage, title) => {
    return {
      currentPage,
      title
    }
  }
)

// Wrap the component to inject dispatch and state into it
export default connect(select)(App)