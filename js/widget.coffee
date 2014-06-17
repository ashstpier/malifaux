class window.Widget
  constructor: (@guid) -> null

  bindEvents: ->
    grid = [20, 20]
    @el.resizable(grid: grid, containment: "#page")
    @el.draggable(grid: grid, containment: "#page")

  render: ->
    @el = $("""<div data-guid="#{@guid}" class="widget"></div>""")
    $('#page').append(@el)
    @bindEvents()