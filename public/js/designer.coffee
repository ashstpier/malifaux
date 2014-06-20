window.Designer = {

  widgets: []
  currentEditWidget: null

  init: (templateKey) ->
    @templateKey = templateKey
    $ =>
      Widget.loadAll =>
        @page = $(@PAGE_SELECTOR)
        @renderControls()
        @bindEvents()
        @load()

  renderControls: ->
    for name, className of Widget.WIDGET_NAMES
      $("#toolbar").append("""<button id="add-#{name}" type="button">Add #{name}</button>""")

  bindEvents: ->
    $('#save').click => @save()
    $('#clear').click => @clear()
    @page.click => @clearEditWidget()
    for name, className of Widget.WIDGET_NAMES
      do (className) => $("#add-#{name}").click => @addWidget(type: className)

  addWidget: (widgetConfig={}) ->
    @template.addWidget(widgetConfig, '')

  clearEditWidget: ->
    if @currentEditWidget
      @currentEditWidget.layoutMode()
      @currentEditWidget = null

  editWidget: (widget) ->
    @clearEditWidget()
    @currentEditWidget = widget
    widget.editMode()

  removeWidget: (widget) ->
    widget.remove()
    @widgets = (w for w in @widgets when w.guid != widget.guid)

  load: ->
    @template = Template.load(@templateKey)
    @template.render()

  save: ->
    @template.save(@templateKey)

  clear: ->
    @removeWidget(widget) for widget in @widgets
    store.remove(@templateKey)
}


$ -> Designer.init('my-test-template')