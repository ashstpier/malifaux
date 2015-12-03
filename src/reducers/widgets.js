import update from 'react-addons-update'
import { clone, transform, reduce } from 'lodash'
import { handleActions } from 'redux-actions'

import { UPDATE_WIDGET_POSITION, ADD_WIDGET } from '../actionTypes'

const NO_WIDGETS = {}
const INITIAL_POSITION = {
  x: 20,
  y: 20,
  width: 160,
  height: 160
}

export const buildWidget = (id, type, position = INITIAL_POSITION, data = {value: 'hello world'}) => {
  return {
    id,
    type,
    position,
    data: data
  }
}

const reducer = handleActions({
  [ADD_WIDGET]: (state, action) => {
    const payload = action.payload
    return update(state, {
      $merge: {
        [payload.id]: buildWidget(payload.id, payload.widgetType)
      }
    })
  },

  [UPDATE_WIDGET_POSITION]: (state, action) => {
    const payload = action.payload
    return reduce(payload.ids, (s, id) => {
      var newPosition = clone(payload.changes)
      if (payload.relative) {
        let oldPosition = s[id].position
        newPosition = transform(newPosition, (p, v, k) => p[k] = oldPosition[k] + v)
      }
      return update(s, {
        [id]: {
          position: {
            $merge: newPosition
          }
        }
      })
    }, state)
  }
}, NO_WIDGETS)

export default reducer
