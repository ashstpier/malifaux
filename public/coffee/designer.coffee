window.Designer = {

  selection: null
  currentEditWidget: null
  propertyPanel: null

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
    @renderWidgetButtons()
    @renderPropertyPanel()

  renderPropertyPanel: ->
    @propertyPanel = new Properties(this)
    @propertyPanel.render()

  renderWidgetButtons: ->
    for name, className of Widget.WIDGETS
      type = window[className]
      $("#gallery").append """
        <div id="add-#{name}" class="add-widget">
          <i class="glyphicons white #{type.icon}"></i>
          <h4>#{type.displayName}</h4>
          <p>#{type.description}</p>
        </div>
      """

  setOrientation: (orientation) ->
    $('#page').attr('class', orientation)
    @template.orientation = orientation

  bindEvents: ->
    $('#save').click => @saveAndExit()
    $('#discard').click => @discard()
    $('#exit a').click => @exit()
    $('#page').click (e) => @maybeClearSelection(e.target)
    $('#orientation input:radio').change (e) => @setOrientation($(e.currentTarget).val())
    $('#name').blur => @updateName()
    $('#name').keypress (e) => $('#name').blur() if e.which == 13
    $('#name').click (e) => $(e.currentTarget).selectText()

    for name, className of Widget.WIDGETS
      do (className) => $("#add-#{name}").click =>
        $('#gallery').addClass('hidden')
        setTimeout (-> $('#gallery').removeClass('hidden')), 500
        @addWidget(type: className)
        false

  updateName: ->
    name = $('#name').text()
    @template.name = name
    @save()

  select: (widget) ->
    @selection = widget
    @trigger('selection:change', @selection)

  clearSelection: -> @select(null)

  maybeClearSelection: (target) ->
    if target is $('#page')[0]
      @clearSelection()
      @clearEditWidget()


  clearEditWidget: ->
    if @currentEditWidget
      @currentEditWidget.saveConfig()
      @currentEditWidget.layoutMode()
      @currentEditWidget = null
      @trigger('selection:change', null)

  editWidget: (widget) ->
    @clearEditWidget()
    @currentEditWidget = widget
    widget.editMode()
    @trigger('selection:change', @currentEditWidget)

  addWidget: (widgetConfig={}) ->
    widget = @template.addWidget(widgetConfig, 'layout')
    @select(widget)

  removeWidget: (widget) ->
    @currentEditWidget = null if @currentEditWidget is widget
    @clearSelection()
    @template.removeWidget(widget)

  load: ->
    $('#name').text(@template.name)
    $("#orientation input:radio[value='#{@template.orientation}']").attr('checked', true)
    $('#page').attr("class", @template.orientation)
    @template.render("layout")

  save: -> @template.save
  discard: -> @exitDesigner()
  clear: -> @template.removeAllWidgets()

  exitDesigner: ->
    redirect = utils.querystring("return")
    window.location.href = if redirect then redirect else "./index.html"

  saveAndExit: ->
    @template.save => @exitDesigner()

  takeScreenShot: ->
    html2canvas document.getElementById('page'), {
      allowTaint: false,
      taintTest: false,
      useCORS: true,
      onrendered: (canvas) => @template.screenshot = canvas.toDataURL()
    }

  exit: ->
    @takeScreenShot() if !utils.is_production
    $('#save-modal').modal()
    false

}

MicroEvent.mixin(Designer)

$ -> Designer.init()
