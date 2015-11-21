import React, { Component, PropTypes } from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import Widget from './Widget'


class Page extends Component {
  render() {
    const { orientation, widgets } = this.props
    return (
      <div className="page" data-orientation={orientation}>
        {widgets.map((widget, index) =>
          <Widget type={widget.get('type')}
                  data={widget.get('data')}
                  key={index} />
        )}
      </div>
    )
  }
}

Page.propTypes = {
  orientation: PropTypes.oneOf([
    'portrait',
    'landscape'
  ]).isRequired,
  widgets: ImmutablePropTypes.list.isRequired
}

export default Page