class window.Template

  @load: (templateName) ->
    templateData = store.get(templateName)
    templateData.key = templateName
    templateData = { layout: [] } if templateData == undefined
    template = new Template(templateData)
    template.key = templateName
    template.name = templateData.name
    return template

  @delete: (templateName) ->
    store.remove(templateName)

  @create: ->
    console.log "create"
    template = new Template()
    template.key = utils.guid()
    template.name = "Untitled Template"
    template.save()
    return template

  @all: ->
    store.getAll()

  constructor: (description) ->
    description ||= { layout: {} }
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

  save: ->
    store.set(@key, @serialize())

  serialize: ->
    layout = (widget.serialize() for widget in @widgets)
    { 
      layout: layout,
      name: @name 
    }

  isNew: ->
    return true

