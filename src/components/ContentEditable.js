import React from 'react';
import { findDOMNode } from 'react-dom'

export default class ContentEditable extends React.Component {
  constructor() {
    super();
    this.emitChange = this.emitChange.bind(this);
  }

  render() {
    return <div
      {...this.props}
      onInput={this.emitChange}
      onBlur={this.emitChange}
      contentEditable="true"
      dangerouslySetInnerHTML={{__html: this.props.html}}></div>;
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.html !== findDOMNode(this).innerHTML;
  }

  componentDidUpdate() {
    if ( this.props.html !== findDOMNode(this).innerHTML ) {
     findDOMNode(this).innerHTML = this.props.html;
    }
  }

  emitChange(evt) {
    var html = findDOMNode(this).innerHTML;
    if (this.props.onChange && html !== this.lastHtml) {
      this.props.onChange(html);
    }
    this.lastHtml = html;
  }
}