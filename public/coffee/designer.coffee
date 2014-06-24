window.Designer = {

  currentEditWidget: null

  loadAll: (template) ->
    @template = template
    @templateKey = template.key
    $ =>
      API.loadConfig =>
        Widget.loadAll =>
          @renderControls()
          @bindEvents()
          @load()

  init: ->
    templateKey = utils.querystring("template")
    if not templateKey?
      @loadAll(Template.create())
    else
      Template.load templateKey, (template) => @loadAll(template)

  renderControls: ->
    for name, className of Widget.WIDGETS
      $("#gallery").append("""<button id="add-#{name}" type="button">Add #{name}</button>""")

  bindEvents: ->
    $('#save').click => @save()
    $('#clear').click => @clear()
    $('#delete').click => @delete()
    $('#page').click => @clearEditWidget()
    $('#name').blur => @updateName()
    for name, className of Widget.WIDGETS
      do (className) => $("#add-#{name}").click => @addWidget(type: className)

  updateName: ->
    name = $('#name').text()
    @template.name = name

  clearEditWidget: ->
    if @currentEditWidget
      @currentEditWidget.layoutMode()
      @currentEditWidget = null

  editWidget: (widget) ->
    @clearEditWidget()
    @currentEditWidget = widget
    widget.editMode()

  addWidget: (widgetConfig={}) ->
    @template.addWidget(widgetConfig, 'layout')

  removeWidget: (widget) ->
    @template.removeWidget(widget)

  clear: ->
    @template.removeAllWidgets()

  load: ->
    $('#name').text(@template.name)
    @template.render()

  save: ->
    @template.save()

  delete: ->
    Template.delete(@templateKey)
    window.location.href = '/'
}

$ -> Designer.init()