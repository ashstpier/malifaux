class window.PageTemplate

  @create: ->
    template = new PageTemplate({
      key: utils.guid(),
      layout: [],
      orientation: 'portrait',
      pagetype: 'student'
    })
    return template

  constructor: (description) ->
    @page = $('#page')
    @widgets = []
    @key = description.key
    @layout = description.layout
    @orientation = description.orientation
    @pagetype = description.pagetype

  render: (mode, data=null, subject=null) ->
    for widgetConfig in @layout
      @addWidget(widgetConfig, mode, data, subject)
    @layout = []

  addWidget: (widgetConfig, mode, data=null, subject=null) ->
    console.log 'adding', widgetConfig
    data = data or utils.fakeStudentData()
    subject = subject or utils.subject(@pagetype)
    widget = if widgetConfig.isWidget then widgetConfig else new Widget(widgetConfig, data, subject)
    @widgets.push(widget)
    @page.append(widget.render(mode))
    widget

  redraw: -> widget.redraw() for widget in @widgets

  removeWidget: (widget) ->
    widget.remove()
    @widgets = (w for w in @widgets when w.guid != widget.guid)

  removeAllWidgets: ->
    @removeWidget(widget) for widget in @widgets

  getWidget: (guid) =>
    _.find(@widgets, (w) -> w.guid is guid)

  getWidgetOrder: ->
    sortedWidgets = _.sortBy(@widgets, (w) -> w.zIndex())
    _.map(sortedWidgets, (w) -> w.guid)

  setWidgetOrder: (newOrder) ->
    console.log 'setting order', newOrder
    newlyOrderedWidgets = _.map(newOrder, @getWidget)
    for widget, index in newlyOrderedWidgets
      widget.zIndex(index+1)

  serialize: ->
    layout = if @layout.length then @layout else (widget.serialize() for widget in @widgets)
    data = {
      layout: layout,
      orientation: @orientation,
      pagetype: @pagetype,
      screenshot: @screenshot
    }
    data

  @deserialize: (templateData, cb) ->
    template = new PageTemplate(templateData)
    cb(template)