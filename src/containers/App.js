import React, { Component, PropTypes } from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { connect } from 'react-redux'
import { setTitle, setPageOrientation } from '../actions'
import Toolbar from '../components/Toolbar'
import Viewport from '../components/Viewport'
import { createSelector } from 'reselect'

class App extends Component {
  render() {
    const { dispatch, title, currentPage } = this.props
    return (
      <div>
        <Toolbar
          title={title}
          onTitleChange={title => dispatch(setTitle(title))}
          orientation={currentPage.get('orientation')}
          onPageOrientationChange={orientation => dispatch(setPageOrientation(currentPage.get('index'), orientation))} />
        <Viewport
          page={currentPage} />
      </div>
    )
  }
}

App.propTypes = {
  title: PropTypes.string.isRequired,
  currentPage: ImmutablePropTypes.map.isRequired
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