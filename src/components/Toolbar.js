import React, { Component, PropTypes } from 'react'
import ContentEditable from './ContentEditable'

class Toolbar extends Component {
  render() {
    return (
      <header id="toolbar">
        <div id="template-name">
          <h1 id="name">
            <ContentEditable html={this.props.title} onChange={e => this.titleChange(e)}/>
          </h1>
        </div>
        <button onClick={e => this.toggleOrientation()}>{this.props.orientation}</button>
      </header>
    )
  }

  titleChange(html) {
    this.props.onTitleChange(html)
  }

  toggleOrientation() {
    if(this.props.orientation == 'portrait') {
      this.props.onPageOrientationChange('landscape')
    } else {
      this.props.onPageOrientationChange('portrait')
    }
  }
}

Toolbar.propTypes = {
  title: PropTypes.string.isRequired,
  onTitleChange: PropTypes.func.isRequired
}

export default Toolbar