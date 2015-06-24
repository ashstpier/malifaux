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
    @widgets = []
    @layout = description.layout
    @orientation = description.orientation
    @pagetype = description.pagetype
    @el = $("""<div class="page" data-orientation="#{@orientation}"" data-pagetype="#{@pagetype}"/>""")
    $('#viewport #pages').append(@el)

  render: (mode, data=null, subject=null) ->
    for widgetConfig in @layout
      @addWidget(widgetConfig, mode, data, subject)
    @layout = []
    @isRendered = true

  addWidget: (widgetConfig, mode, data=null, subject=null) ->
    data = data or utils.fakeStudentData()
    subject = subject or utils.subject(@pagetype)
    widget = if widgetConfig.isWidget then widgetConfig else new Widget(widgetConfig, data, subject)
    @widgets.push(widget)
    @el.append(widget.render(mode))
    widget

  activate: -> @el.addClass('page-active')
  deactivate: -> @el.removeClass('page-active')

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
    newlyOrderedWidgets = _.map(newOrder, @getWidget)
    for widget, index in newlyOrderedWidgets
      widget.zIndex(index+1)

  updateAttributes: ->
    @el.attr('data-orientation', @orientation)
    @el.attr('data-pagetype', @pagetype)

  serializeWidgets: ->
    @layout = (widget.serialize() for widget in @widgets)

  serialize: ->
    @serializeWidgets()
    data = {
      layout: @layout,
      orientation: @orientation,
      pagetype: @pagetype,
    }
    data

  @deserialize: (templateData, cb) ->
    template = new PageTemplate(templateData)
    cb(template)