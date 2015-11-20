import React, { Component, PropTypes } from 'react'
import ContentEditable from './ContentEditable'

export default class Header extends Component {
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

  titleChange(evt) {
    this.props.onTitleChange(evt.target.value);
  }
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  onTitleChange: PropTypes.func.isRequired
}