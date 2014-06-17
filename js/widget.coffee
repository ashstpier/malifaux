class window.Widget
  constructor: (@guid) -> null

  bindEvents: ->
    @el.resizable(grid: App.GRID_SIZE, containment: App.PAGE_SELECTOR)
    @el.draggable(grid: App.GRID_SIZE, containment: App.PAGE_SELECTOR)

  render: ->
    @el = $("""<div data-guid="#{@guid}" class="widget"></div>""")
    $('#page').append(@el)
    @bindEvents()