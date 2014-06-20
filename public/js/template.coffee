class window.Template

  @load: (templateName) ->
    templateData = store.get(templateName)
    templateData = { layout: [] } if templateData == undefined
    return new Template(templateData)

  @delete: (templateName) ->
    store.remove(templateName)

  constructor: (description) ->
    @page = $('#page')
    @widgets = []
    @layout = description.layout

  render: (mode, data) ->
    for widgetConfig in @layout
      @addWidget(widgetConfig, mode, data)

  addWidget: (widgetConfig, mode, data) ->
    widget = new Widget(widgetConfig, data)
    @widgets.push(widget)
    @page.append(widget.render(mode))

  removeWidget: (widget) ->
    widget.remove()
    @widgets = (w for w in @widgets when w.guid != widget.guid)

  removeAllWidgets: ->
    @removeWidget(widget) for widget in @widgets

  save: (templateName) ->
    store.set(templateName, @serialize())

  serialize: ->
    layout = (widget.serialize() for widget in @widgets)
    { layout: layout }

