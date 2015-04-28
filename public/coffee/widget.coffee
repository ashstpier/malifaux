class window.Widget

  @PAGE_SELECTOR: '#page'
  @GRID_SIZE: [1,1]

  @WIDGETS: {
    'image':          'ImageContent'
    'text':           'TextContent'
    'datatable':      'DatatableContent'
    'field':          'FieldContent'
    'name':           'NameContent'
    'subject-field':  'SubjectFieldContent'
    'attendance':     'AttendanceContent'
    'dynamictable':   'DynamicTableContent'
    'shape':          'ShapeContent'
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

  isWidget: true

  constructor: (config={}, @data=null, @subject=null) ->
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
    @position = @origin


  displayName: -> @content.constructor.displayName

  originStyles: -> """position:absolute; top:#{@origin.y}px; left:#{@origin.x}px; width:#{@origin.width}px; height:#{@origin.height}px;"""

  bindEvents: ->
    Designer.bind 'selection:change', @updateSelectedState
    @el.click => Designer.select(this)
    @el.dblclick => Designer.editWidget(this) if this.content.editable()
    @el.find('.widget-delete').click  => Designer.removeWidget(this)
    @applyResizable()
    @el.draggable
      grid:         Widget.GRID_SIZE
      containment:  Widget.PAGE_SELECTOR
      drag:         => @trigger 'widget:move', this
      start:        => Designer.select(this)
      stop:         => @moved()

  applyResizable: (ratio=null) ->
    @el.resizable
      grid:         Widget.GRID_SIZE
      containment:  Widget.PAGE_SELECTOR
      handles:      'n, e, s, w, ne, se, sw, nw'
      resize:       => @trigger 'widget:move', this
      start:        => Designer.select(this)
      stop:         => @moved()
      aspectRatio:  ratio

  render: (mode) ->
    @el = $("""
      <div data-guid="#{@guid}" class="widget widget-#{@cssClass()}" style="#{@originStyles()}">
        <div class="widget-content"></div>
      </div>
    """)
    @contentContainer = @el.find('.widget-content')
    @renderContent(mode)
    unless mode is 'display'
      @el.append("""<button class="widget-button widget-delete">x</button>""")
      @bindEvents()
    @el

  cssClass: ->
    @content.className().toLowerCase().replace('content','')

  renderContent: (mode) ->
    @currentMode = mode
    @el.removeClass("widget-layout-mode")
    @el.removeClass("widget-edit-mode")
    @el.addClass("widget-#{mode}-mode")
    @contentContainer.html(@content.render(mode, @data))

  redraw: -> @renderContent(@currentMode)

  renderAppearanceOptions: -> @content.renderAppearanceOptions()
  renderConfigOptions: -> @content.renderConfigOptions()

  moved: ->
    oldPosition = @position
    @cachePosition()
    Designer.history.push(this, 'moveTo', oldPosition, @position)

  cachePosition: ->
    @position = {x: @x(), y: @y(), width: @width(), height: @height()}

  layoutMode: ->
    return if @currentMode is 'layout'
    @trigger 'widget:layout-switching', this
    @el.draggable('enable')
    @renderContent('layout')
    @trigger 'widget:layout-switched', this

  editMode: ->
    return if @currentMode is 'edit'
    @trigger 'widget:edit-switching', this
    @el.draggable('disable')
    @renderContent('edit')
    @trigger 'widget:edit-switched', this

  remove: ->
    @el.remove()

  serialize: ->
    {
      guid: @guid
      x: @x()
      y: @y()
      width: @width()
      height: @height()
      type: @content.className()
      content: @content.serialize()
    }

  moveTo: (coords) ->
    @x(coords.x) if coords.x?
    @y(coords.y) if coords.y?
    @width(coords.width) if coords.width?
    @height(coords.height) if coords.height?
    @trigger 'widget:move', this
    Designer.select(this)

  nudge: (x,y) ->
    oldPosition = @position
    @x(@x()+x) unless x is 0
    @y(@y()+y) unless y is 0
    @cachePosition()
    Designer.history.push(this, 'moveTo', oldPosition, @position)
    @trigger 'widget:move', this

  saveConfig: ->
    @content.saveConfig()

  setAspectRatio: (ratio) ->
    @el.resizable('destroy')
    @el.height(@el.width()/ratio)
    @applyResizable(ratio)

  width: (n) -> if n? then @el.width(Math.round(n)) else Math.round(@el.width())
  height: (n) -> if n? then @el.height(Math.round(n)) else Math.round(@el.height())
  x: (n) -> if n? then @el.css('left', "#{Math.round(n)}px") else Math.round(@el.position().left)
  y: (n) -> if n? then @el.css('top', "#{Math.round(n)}px") else Math.round(@el.position().top)

  updateSelectedState: (selection) =>
    if this is selection
      @el.addClass('selected')
    else
      @el.removeClass('selected')

MicroEvent.mixin(window.Widget)
