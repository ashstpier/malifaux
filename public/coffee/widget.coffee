class window.Widget

  @PAGE_SELECTOR: '#page'
  @GRID_SIZE: [20, 20]

  @WIDGETS: {
    'image':      'ImageContent'
    'text':       'TextContent'
    'name':       'NameContent'
    'datatable':  'DatatableContent'
    'field':      'FieldContent'
    'attendance': 'AttendanceContent'
  }

  @loadAll: (cb) ->
    completed = 0
    widgetCount = Object.keys(Widget.WIDGETS).length
    for name, className of Widget.WIDGETS
      @load name, ->
        completed++
        cb() if completed is widgetCount

  @load: (name, cb) ->
    utils.loadCSS("widgets/#{name}/#{name}-content.css")
    utils.loadCoffeeScript("js/#{name}-content.js", cb)

  constructor: (config={}, @data=null) ->
    @currentMode = 'layout'
    @guid = config.guid || utils.guid()
    @content = if config.type? then new window[config.type](config.content) else new TextContent()
    width = if config.width? then config.width else @content.defaultWidth()
    height = if config.height? then config.height else @content.defaultHeight()
    @origin = {
      x: if config.x? then config.x else ((960/2) - (width/2))
      y: if config.y? then config.y else 300
      width: width
      height: height
    }

  originStyles: -> """position:absolute; top:#{@origin.y}px; left:#{@origin.x}px; width:#{@origin.width}px; height:#{@origin.height}px;"""

  bindEvents: ->
    @el.dblclick => Designer.editWidget(this)
    @el.find('.widget-delete').click  => Designer.removeWidget(this)
    @el.resizable(grid: Widget.GRID_SIZE, containment: Widget.PAGE_SELECTOR)
    @el.draggable(grid: Widget.GRID_SIZE, containment: Widget.PAGE_SELECTOR)

  render: (mode) ->
    @el = $("""
      <div data-guid="#{@guid}" class="widget" style="#{@originStyles()}">
        <div class="widget-content"></div>
      </div>
    """)
    @contentContainer = @el.find('.widget-content')
    @renderContent(mode)
    unless mode is 'display'
      @el.append("""<button class="widget-button widget-delete">x</button>""")
      @bindEvents()
    @el

  renderContent: (mode) ->
    @currentMode = mode
    @el.removeClass("widget-layout-mode")
    @el.removeClass("widget-edit-mode")
    @el.addClass("widget-#{mode}-mode")
    @contentContainer.html(@content.render(mode, @data))

  layoutMode: ->
    @el.draggable('enable')
    @renderContent('layout')

  editMode: ->
    @el.draggable('disable')
    @renderContent('edit')

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
      content: @content.serialize()
    }
