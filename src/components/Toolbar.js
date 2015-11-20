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
      </header>
    )
  }

  titleChange(html) {
    this.props.onTitleChange(html);
  }
}

Toolbar.propTypes = {
  title: PropTypes.string.isRequired,
  onTitleChange: PropTypes.func.isRequired
}

export default Toolbar