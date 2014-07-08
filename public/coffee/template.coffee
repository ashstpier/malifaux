class window.Template

  @clone: (templateData, cb) ->
    @deserialize templateData, (template) ->
      template.key = utils.guid()
      cb(template)

  @load: (templateName, cb) ->
    TemplateStore.get templateName, (templateData) =>
      @deserialize(templateData, cb)

  @delete: (templateKey) ->
    TemplateStore.delete(templateKey)

  @create: ->
    template = new Template({
      key: utils.guid(),
      name: "Untitled Template",
      layout: [],
      orientation: 'portrait'
    })
    template.save()
    return template

  @all: (cb) ->
    TemplateStore.all(cb)

  constructor: (description) ->
    @page = $('#page')
    @widgets = []
    @key = description.key
    @name = description.name
    @layout = description.layout
    @orientation = description.orientation

  render: (mode, data) ->
    for widgetConfig in @layout
      @addWidget(widgetConfig, mode, data)
    @layout = []

  addWidget: (widgetConfig, mode, data) ->
    widget = new Widget(widgetConfig, data)
    @widgets.push(widget)
    @page.append(widget.render(mode))

  removeWidget: (widget) ->
    widget.remove()
    @widgets = (w for w in @widgets when w.guid != widget.guid)

  removeAllWidgets: ->
    @removeWidget(widget) for widget in @widgets

  save: (cb) ->
    data = @serialize()
    data.key = @key
    TemplateStore.save(@key, data, cb)

  serialize: ->
    layout = if @layout.length then @layout else (widget.serialize() for widget in @widgets)
    data = {
      layout: layout,
      name: @name,
      orientation: @orientation,
      screenshot: @screenshot
    }
    data

  @deserialize: (templateData, cb) ->
    template = new Template(templateData)
    cb(template)
