class window.Widget
  constructor: (config={}) ->
    @guid = config.guid || utils.guid()
    @origin = {
      x: config.x || 20
      y: config.y || 20
      width: config.width || 160
      height: config.height || 160
    }

  originStyles: -> """top:#{@origin.y}px; left:#{@origin.x}px; width:#{@origin.width}px; height:#{@origin.height}px;"""

  bindEvents: ->
    @el.find('.widget-delete').click => App.removeWidget(this)
    @el.resizable(grid: App.GRID_SIZE, containment: App.PAGE_SELECTOR)
    @el.draggable(grid: App.GRID_SIZE, containment: App.PAGE_SELECTOR)

  render: ->
    @el = $("""
      <div data-guid="#{@guid}" class="widget" style="#{@originStyles()}">
        <button class="widget-delete">x</button>
      </div>
    """)
    $('#page').append(@el)
    @bindEvents()

  remove: ->
    @el.remove()

  serialize: ->
    position = @el.position()
    {
      guid: @guid
      x: position.left
      y: position.top
      width: @el.width()
      height: @el.height()
    }
