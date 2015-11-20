import React, { Component, PropTypes } from 'react'

class Sidebar extends Component {
  render() {
    return (
      <div id="properties">
      <button onClick={e => this.toggleOrientation()}>{this.props.orientation}</button>
      </div>
    )
  }

  toggleOrientation() {
    if(this.props.orientation == 'portrait') {
      this.props.onPageOrientationChange('landscape');
    } else {
      this.props.onPageOrientationChange('portrait');
    }
  }
}

Sidebar.propTypes = {
}

export default Sidebar