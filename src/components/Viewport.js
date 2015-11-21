import React, { Component, PropTypes } from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'

import Page from './Page'

class Viewport extends Component {
  render() {
    const { page } = this.props;
    return (
      <div id="viewport">
        <div id="pages">
          <Page orientation={page.get('orientation')} />
        </div>
      </div>
    )
  }
}

Viewport.propTypes = {
  page: ImmutablePropTypes.contains({
    orientation: PropTypes.string.isRequired
  }).isRequired
}

export default Viewport