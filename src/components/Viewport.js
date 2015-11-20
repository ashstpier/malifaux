import React, { Component, PropTypes } from 'react'
import Page from './Page'

class Viewport extends Component {
  render() {
    const { page } = this.props;
    return (
      <div id="viewport">
        <div id="pages">
          <Page orientation={page.orientation} />
        </div>
      </div>
    )
  }
}

Viewport.propTypes = {
  page: PropTypes.shape({
    orientation: PropTypes.string.isRequired
  }).isRequired
}

export default Viewport