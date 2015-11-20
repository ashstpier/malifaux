import React from 'react'
import { render } from 'react-dom'
import { compose, createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import App from './containers/App'
import todoApp from './reducers'

let root = document.getElementById('app')

// TODO: Find a way to exclude these requires in production
import { devTools, persistState } from 'redux-devtools';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';

if(__DEV__) {
  const finalCreateStore = compose(
    // Enables your middleware:
    // applyMiddleware(m1, m2, m3), // any Redux middleware, e.g. redux-thunk
    // Provides support for DevTools:
    devTools()
    // Lets you write ?debug_session=<name> in address bar to persist debug sessions
    // persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
  )(createStore)

  const store = finalCreateStore(todoApp)

  render(
    <div>
      <Provider store={store}>
        <App />
      </Provider>
      <DebugPanel top right bottom>
        <DevTools store={store} monitor={LogMonitor} />
      </DebugPanel>
    </div>
  , root)
} else {
  const store = createStore(todoApp)

  render(
    <Provider store={store}>
      <App />
    </Provider>
  , root)
}
