import update from 'react-addons-update'
import { clone, transform, reduce } from 'lodash'

import { UPDATE_WIDGET_POSITION, ADD_WIDGET } from '../actiontypes'

const INITIAL_POSITION = {
  x: 20,
  y: 20,
  width: 160,
  height: 160
}

export const buildWidget = (id, type, position=INITIAL_POSITION, data={value: 'hello world'}) => {
  return {
    id,
    type,
    position,
    data: data
  }
}


export default function widgets(state = {}, action) {
  switch (action.type) {

    case ADD_WIDGET:
      return update(state, {
        $merge: {
          [action.id]: buildWidget(action.id, action.widgetType)
        }
      })

    case UPDATE_WIDGET_POSITION:
      return reduce(action.ids, (s, id) => {
        var newPosition = clone(action.changes)
        if(action.relative) {
          let oldPosition = s[id].position
          newPosition = transform(newPosition, (p,v,k) => p[k] = oldPosition[k] + v)
        }
        return update(s, {
          [id]: {
            position: {
              $merge: newPosition
            }
          }
        })
        return s
      }, state)

    default:
      return state
  }
}