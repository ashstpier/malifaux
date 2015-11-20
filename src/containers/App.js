import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { setTitle } from '../actions'
import Header from '../components/Header'

class App extends Component {
  render() {
    // Injected by connect() call:
    const { dispatch, title } = this.props
    return (
      <div>
        <Header title={title} onTitleChange={title => dispatch(setTitle(title))} />
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