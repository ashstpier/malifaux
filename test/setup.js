import { jsdom } from "jsdom"

global.document = jsdom('<!doctype html><html><body></body></html>')
global.window = document.defaultView
global.navigator = global.window.navigator


// import { List, Map, is } from 'immutable'
// import { addType } from 'unexpected'

// addType({
//   name: 'Immutable.List',
//   base: 'array',
//   identify: (value) => value instanceof List,
//   inspect: (value, depth, output, inspect) => output.text("List(").append(inspect(value.toJS())).text(')'),
//   equal: (a, b, equal) => is(a, b),
//   diff: function (actual, expected, output, diff, inspect) {
//     this.baseType.diff(actual.toJS(), expected.toJS(), output);
//   }
// })

// addType({
//   name: 'Immutable.Map',
//   base: 'object',
//   identify: (value) => value instanceof Map,
//   equal: (a, b, equal) => is(a, b),
//   diff: function (actual, expected, output, diff, inspect) {
//     this.baseType.diff(actual.toJS(), expected.toJS(), output);
//   }
// })
