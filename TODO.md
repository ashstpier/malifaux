# Todo List

## Tests ##

- better test coverage for components


## Refactoring ##

- decide how to split out and name selectors
- consider using FSA (Flux Stand Actions) format for actions e.g. {type, payload, meta}
  (using https://github.com/acdlite/redux-actions looks like it might be work well)
- look into connecting something other than the top level App component to redux
- decide what to do about CSS beyond just a single big file


## Functionality ##

- selections
  - allow clocking on things to select them
  - allow shift clikcing to select multiple elements
- multiple widget types
- editable widget configuration UI
- read/write parent reports file format
- render with data
  - for preview
  - for print
- add a router for multiple pages
