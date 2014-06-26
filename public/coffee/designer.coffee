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

  setOrientation: (orientation) ->
    $('#page').attr('class', orientation)
    @template.orientation = orientation

  bindEvents: ->
    $('#save').click => @save()
    $('#clear').click => @clear()
    $('#delete').click => @delete()
    $('#page').click (e) => if e.target is $('#page')[0] then @clearEditWidget()
    $('#orientation input:radio').change (e) => @setOrientation($(e.currentTarget).val())
    $('#name').blur => @updateName()
    $('#name').keypress (e) => $('#name').blur() if e.which == 13
    $('#name').click (e) => $(e.currentTarget).selectText() 
      
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
    @currentEditWidget = null if @currentEditWidget is widget
    @template.removeWidget(widget)

  clear: ->
    @template.removeAllWidgets()

  load: ->
    $('#name').text(@template.name)
    $("#orientation input:radio[value='#{@template.orientation}']").attr('checked', true)
    $('#page').attr("class", @template.orientation)
    @template.render()

  save: ->
    @template.save()

  delete: ->
    Template.delete(@templateKey)
    window.location.href = './index.html'
}

$ -> Designer.init()