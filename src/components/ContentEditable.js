import React, { Component, PropTypes } from 'react'
import { findDOMNode } from 'react-dom'

export default class ContentEditable extends Component {
  constructor () {
    super()
    this.emitChange = this.emitChange.bind(this)
  }

  render () {
    return <div {...this.props}
      onInput={this.emitChange}
      onBlur={this.emitChange}
      contentEditable='true'
      dangerouslySetInnerHTML={{__html: this.props.html}} />
  }

  shouldComponentUpdate (nextProps) {
    return nextProps.html !== findDOMNode(this).innerHTML
  }

  componentDidUpdate () {
    if (this.props.html !== findDOMNode(this).innerHTML) {
      findDOMNode(this).innerHTML = this.props.html
    }
  }

  emitChange (evt) {
    var html = findDOMNode(this).innerHTML
    if (this.props.onChange && html !== this.lastHtml) {
      this.props.onChange(html)
    }
    this.lastHtml = html
  }
}

ContentEditable.propTypes = {
  html: PropTypes.string.isRequired,
  onChange: PropTypes.func
}
