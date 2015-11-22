import React, { Component, PropTypes } from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'

import Page from './Page'

class Viewport extends Component {
  render() {
    const { page, widgets } = this.props;
    return (
      <div id="viewport">
        <div id="pages">
          <Page
            orientation={page.get('orientation')}
            widgets={widgets} />
        </div>
      </div>
    )
  }
}

Viewport.propTypes = {
  page: ImmutablePropTypes.contains({
    orientation: PropTypes.string.isRequired,
    widgets: ImmutablePropTypes.list.isRequired
  }).isRequired
}

export default Viewport