import React, { Component, PropTypes } from 'react'

class Page extends Component {
  render() {
    const { orientation } = this.props
    return (
      <div className="page" data-orientation={orientation}>
      </div>
    )
  }
}

Page.propTypes = {
  orientation: PropTypes.oneOf([
    'portrait',
    'landscape'
  ]).isRequired
}

export default Page