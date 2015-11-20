import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { setTitle, setPageOrientation } from '../actions'
import Toolbar from '../components/Toolbar'
import Viewport from '../components/Viewport'
import Sidebar from '../components/Sidebar'

class App extends Component {
  render() {
    // Injected by connect() call:
    const { dispatch, title, page } = this.props
    return (
      <div>
        <Toolbar
          title={title}
          onTitleChange={title => dispatch(setTitle(title))} />
        <Viewport
          page={page} />
        <Sidebar
          orientation={page.orientation}
          onPageOrientationChange={orientation => dispatch(setPageOrientation(orientation))}/>
      </div>
    )
  }
}

App.propTypes = {
  title: PropTypes.string.isRequired
}

// Which props do we want to inject, given the global state?
// Note: use https://github.com/faassen/reselect for better performance.
function select(state) {
  return state;
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(App)