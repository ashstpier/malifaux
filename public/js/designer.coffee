window.Designer = {

  currentEditWidget: null

  init: (templateKey) ->
    @templateKey = templateKey
    $ =>
      Widget.loadAll =>
        @renderControls()
        @bindEvents()
        @load()

  renderControls: ->
    for name, className of Widget.WIDGET_NAMES
      $("#toolbar").append("""<button id="add-#{name}" type="button">Add #{name}</button>""")

  bindEvents: ->
    $('#save').click => @save()
    $('#clear').click => @clear()
    $('#delete').click => @delete()
    $('#page').click => @clearEditWidget()
    for name, className of Widget.WIDGET_NAMES
      do (className) => $("#add-#{name}").click => @addWidget(type: className)

  clearEditWidget: ->
    if @currentEditWidget
      @currentEditWidget.layoutMode()
      @currentEditWidget = null

  editWidget: (widget) ->
    @clearEditWidget()
    @currentEditWidget = widget
    widget.editMode()

  addWidget: (widgetConfig={}) ->
    @template.addWidget(widgetConfig, '')

  removeWidget: (widget) ->
    @template.removeWidget(widget)

  clear: ->
    @template.removeAllWidgets()

  load: ->
    @template = Template.load(@templateKey)
    @template.render()

  save: ->
    @template.save(@templateKey)

  delete: ->
    Template.delete(@templateKey)
    window.location.href = '/'
}


$ -> Designer.init('my-test-template')