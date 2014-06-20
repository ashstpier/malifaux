class window.Template

  @load: (templateName) ->
    templateData = store.get(templateName)
    console.log templateData
    return new Template(templateData)

  constructor: (description) ->
    @page = $('#page')
    @widgets = []
    @layout = description.layout

  render: (mode, data) ->
    for widgetConfig in @layout
      @addWidget(widgetConfig, mode, data)

  addWidget: (widgetConfig, mode, data) ->
    widgetConfig.mode = mode
    widget = new Widget(widgetConfig, data)
    @widgets.push(widget)
    @page.append(widget.render())

  save: (templateName) ->
    store.set(templateName, @serialize())

  serialize: ->
    layout = (widget.serialize() for widget in @widgets)
    { layout: layout }