class window.Template

  @load: (templateName, cb) -> 
    TemplateStore.get templateName, (templateData) =>
      templateData.layout ||= []
      console.log templateData 

      template = new Template(templateData)
      template.key = templateName
      template.name = templateData.name 
      
      cb(template)

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
    data = @serialize()
    data.key = @key
    TemplateStore.save(@key, data)

  serialize: ->
    layout = (widget.serialize() for widget in @widgets)
    data = { 
      layout: layout,
      name: @name,
      orientation: @orientation
    }
    data
