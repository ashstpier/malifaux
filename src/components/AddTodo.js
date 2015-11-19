import React, { Component, PropTypes } from 'react'

export default class AddTodo extends Component {
  render() {
    return (
      <div>
        <input type='text' ref='input' onKeyUp={e => this.handleKeyUp(e)} />
        <button onClick={e => this.handleClick(e)}>
          Add
        </button>
      </div>
    )
  }

  addTodo() {
    const node = this.refs.input
    const text = node.value.trim()
    this.props.onAddTodo(text)
    node.value = ''
  }

  handleClick(e) {
    this.addTodo()
  }

  handleKeyUp(e) {
    if(e.keyCode === 13) {
      this.addTodo()
    }
  }
}

AddTodo.propTypes = {
  onAddTodo: PropTypes.func.isRequired
}