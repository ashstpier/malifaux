class window.Widget
  constructor: (config={}) ->
    @guid = config.guid || utils.guid()
    @origin = {
      x: if config.x? then config.x else 20
      y: if config.y? then config.y else 20
      width: if config.width? then config.width else 160
      height: if config.height? then config.height else 160
    }
    @content = if config.type? then new window[config.type]() else new TextContent()

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
    @el.append(@content.render())
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
      type: @content.constructor.name
    }
