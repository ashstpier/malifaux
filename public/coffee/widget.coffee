class window.Widget

  @PAGE_SELECTOR: '#page'
  @GRID_SIZE: [1,1]

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
    @content = if config.type? then new window[config.type](this, config.content) else new TextContent()
    width = if config.width? then config.width else @content.defaultWidth()
    height = if config.height? then config.height else @content.defaultHeight()
    @origin = {
      x: if config.x? then config.x else ((960/2) - (width/2))
      y: if config.y? then config.y else 100
      width: width
      height: height
    }

  originStyles: -> """position:absolute; top:#{@origin.y}px; left:#{@origin.x}px; width:#{@origin.width}px; height:#{@origin.height}px;"""

  bindEvents: ->
    Designer.bind 'selection:change', @updateSelectedState
    @el.click => Designer.select(this)
    @el.dblclick => Designer.editWidget(this)
    @el.find('.widget-delete').click  => Designer.removeWidget(this)
    @el.resizable
      grid:         Widget.GRID_SIZE
      containment:  Widget.PAGE_SELECTOR
      handles:      'n, e, s, w, ne, se, sw, nw'
      resize:       => @trigger 'widget:move', this
      start:        => Designer.select(this)
    @el.draggable
      grid:         Widget.GRID_SIZE
      containment:  Widget.PAGE_SELECTOR
      drag:         => @trigger 'widget:move', this
      start:        => Designer.select(this)

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
    {
      guid: @guid
      x: @x()
      y: @y()
      width: @width()
      height: @height()
      type: @content.constructor.name
      content: @content.serialize()
    }

  saveConfig: ->
    @content.saveConfig()

  setAspectRatio: (ratio) ->
    @el.resizable('destroy')
    @el.height(@el.width()/ratio)
    @el.resizable(grid: Widget.GRID_SIZE, containment: Widget.PAGE_SELECTOR, aspectRatio: ratio)

  width: (n) -> if n? then @el.width(n) else @el.width()
  height: (n) -> if n? then @el.height(n) else @el.height()
  x: (n) ->
    console.log n
    if n? then @el.css('left', "#{n}px") else @el.position().left
  y: (n) -> if n? then @el.css('top', "#{n}px") else @el.position().top

  updateSelectedState: (selection) =>
    if this is selection
      @el.addClass('selected')
    else
      @el.removeClass('selected')

MicroEvent.mixin(window.Widget)