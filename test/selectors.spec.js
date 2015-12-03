import expect from 'unexpected'

import { appSelector } from '../src/selectors'

const WIDGET_1 = {
  id: 'widget_1',
  type: 'Text',
  position: { x: 100, y: 100, width: 100, height: 100 },
  data: { value: 'hello world' }
}

const WIDGET_2 = {
  id: 'widget_2',
  type: 'Text',
  position: { x: 50, y: 150, width: 200, height: 20 },
  data: { value: 'hello world' }
}

const WIDGET_3 = {
  id: 'widget_3',
  type: 'Text',
  position: { x: 100, y: 100, width: 100, height: 100 },
  data: { value: 'hello world' }
}

const EXAMPLE_STATE = {
  title: 'Test',
  pages: [
    { orientation: 'portrait', widgets: ['widget_1', 'widget_2', 'widget_3'] }
  ],
  widgets: {
    widget_1: WIDGET_1,
    widget_2: WIDGET_2,
    widget_3: WIDGET_3
  },
  currentPageIndex: 0,
  currentlySelectedWidgets: ['widget_1', 'widget_2']
}

describe('selectors', () => {
  describe('appSelector', () => {
    it('has a title', () => {
      const props = appSelector(EXAMPLE_STATE)
      expect(props, 'to satisfy', {
        title: EXAMPLE_STATE.title
      })
    })

    it('has a currentPage', () => {
      const props = appSelector(EXAMPLE_STATE)
      expect(props, 'to satisfy', {
        currentPage: EXAMPLE_STATE.pages[0]
      })
    })

    it('has a currentSelection with position info for the min position values', () => {
      const props = appSelector(EXAMPLE_STATE)
      expect(props, 'to satisfy', {
        currentSelection: {
          widgetIds: EXAMPLE_STATE.currentlySelectedWidgets,
          position: { x: 50, y: 100, width: 100, height: 20 }
        }
      })
    })

    it('has a list of widgetsOnCurrentPage', () => {
      const props = appSelector(EXAMPLE_STATE)
      expect(props, 'to satisfy', {
        widgetsOnCurrentPage: [WIDGET_1, WIDGET_2, WIDGET_3]
      })
    })
  })
})
