window.Designer = {

  selection: null
  currentEditWidget: null
  propertyPanel: null
  history: new UndoHistory()
  clipboard: null

  NUDGE_SIZE: 10
  UNSAVED_CHANGES_WARNING: """
    You have made changes to the template without saving them.

    Please use the 'Save' button to save your changes.
  """

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
      if type.active
        $("#gallery").append """
          <div id="add-#{name}" class="add-widget">
            <i class="glyphicons white #{type.icon}"></i>
            <h4>#{type.displayName}</h4>
            <p>#{type.description}</p>
          </div>
        """

  setOrientation: (orientation) ->
    Designer.history.push(this, 'updateOrientation', @template.orientation, orientation)
    @updateOrientation(orientation)

  updateOrientation: (orientation) ->
    @template.orientation = orientation
    $("#orientation input:radio").removeAttr('checked')
    $("#orientation input:radio[value='#{@template.orientation}']").prop('checked', true)
    @addPageClass()

  setPageType: (pagetype) ->
    Designer.history.push(this, 'updatePageType', @template.pagetype, pagetype)
    @updatePageType(pagetype)

  updatePageType: (pagetype) ->
    @template.pagetype = pagetype
    $("#pagetype input:radio").removeAttr('checked')
    $("#pagetype input:radio[value='#{@template.pagetype}']").prop('checked', true)
    @addPageClass()
    @reloadTemplate()

  reloadTemplate: ->
    config = @template.serialize()
    @template.removeAllWidgets()
    @template = new Template(config)
    @template.render('layout')


  addPageClass: ->
    $('#page').attr('class', '')
    $('#page').addClass("#{@template.orientation} #{@template.pagetype}")

  isSubjectPage: -> (@template.pagetype is 'subject')

  isStudentPage: -> (@template.pagetype is 'student')

  bindEvents: ->
    $('#save-exit').click => @saveAndExit()
    $('#discard').click => @discard()
    $('#save a').click =>
        @template.save =>
          @history.resetSaveChanges()
        false
    $('#exit a').click => @promptSave()
    $('#page').on 'mousedown', (e) => @maybeClearSelection(e.target)
    $('#orientation input:radio').change (e) => @setOrientation($(e.currentTarget).val())
    $('#pagetype input:radio').change (e) => @setPageType($(e.currentTarget).val())
    $('#name').blur => @updateName()
    $('#name').keypress (e) => $('#name').blur() if e.which == 13
    $('#name').click (e) => $(e.currentTarget).selectText()
    $('#undo').click => @history.undo()
    $('#redo').click => @history.redo()
    @history.bind 'history:change', => @updateHistoryButtonState()
    @history.bind 'history:change', => @updateSavedButtonState()
    @bindKeyboardEvents()

    window.addEventListener "beforeunload", (e) => @reminderToSave(e)

    for name, className of Widget.WIDGETS
      do (className) => $("#add-#{name}").click =>
        $('#gallery').addClass('hidden')
        setTimeout (-> $('#gallery').removeClass('hidden')), 500
        @addWidget(type: className)
        false

  bindKeyboardEvents: ->
    Mousetrap.bind ['command+z', 'ctrl+z'], =>
      @history.undo()
      false
    Mousetrap.bind ['command+shift+z', 'ctrl+shift+z'], =>
      @history.redo()
      false
    Mousetrap.bind ['backspace', 'del'], =>
      @removeWidget(@selection) if @selection
      false
    Mousetrap.bind 'left', =>
      @selection.nudge(-1, 0) if @selection
      false
    Mousetrap.bind ['command+left','ctrl+left'], =>
      @selection.nudge(-@NUDGE_SIZE, 0) if @selection
      false
    Mousetrap.bind 'right', =>
      @selection.nudge(1, 0) if @selection
      false
    Mousetrap.bind ['command+right','ctrl+right'], =>
      @selection.nudge(@NUDGE_SIZE, 0) if @selection
      false
    Mousetrap.bind 'up', =>
      @selection.nudge(0, -1) if @selection
      false
    Mousetrap.bind ['command+up','ctrl+up'], =>
      @selection.nudge(0, -@NUDGE_SIZE) if @selection
      false
    Mousetrap.bind 'down', =>
      @selection.nudge(0, 1) if @selection
      false
    Mousetrap.bind ['command+down','ctrl+down'], =>
      @selection.nudge(0, @NUDGE_SIZE) if @selection
      false
    Mousetrap.bind ['command+c', 'ctrl+c'], =>
      return true if @currentEditWidget
      @copy()
      false
    Mousetrap.bind ['command+v', 'ctrl+v'], =>
      return true if @currentEditWidget
      @paste()
      false
    Mousetrap.bind ['command+d', 'ctrl+d'], =>
      return true if @currentEditWidget
      @duplicate()
      false

  copy: ->
    return unless @selection
    @clipboard = @selection.serialize()


  paste: ->
    return unless @clipboard
    widgetConfig = $.extend({}, @clipboard)
    widgetConfig.x = Designer.NUDGE_SIZE
    widgetConfig.y = Designer.NUDGE_SIZE
    @addWidget(widgetConfig)

  duplicate: ->
    widgetConfig = @selection.serialize()
    widgetConfig.x = widgetConfig.x + Designer.NUDGE_SIZE*2
    widgetConfig.y = widgetConfig.y + Designer.NUDGE_SIZE*2
    @addWidget(widgetConfig)

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

  addWidget: (widgetConfig={}, withHistory=true) ->
    widget = @template.addWidget(widgetConfig, 'layout')
    @select(widget)
    if withHistory
      Designer.history.push(this, 'addRemoveWidget', {remove:widget}, {add:widget})

  removeWidget: (widget, withHistory=true) ->
    @currentEditWidget = null if @currentEditWidget is widget
    @clearSelection()
    @template.removeWidget(widget)
    if withHistory
      Designer.history.push(this, 'addRemoveWidget', {add:widget}, {remove:widget})

  addRemoveWidget: (action) ->
    @addWidget(action.add, false) if action.add?
    @removeWidget(action.remove, false) if action.remove?

  load: ->
    $('#name').text(@template.name)
    $("#orientation input:radio[value='#{@template.orientation}']").attr('checked', true)
    $("#pagetype input:radio[value='#{@template.pagetype}']").attr('checked', true)
    $('#page').addClass("#{@template.orientation} #{@template.pagetype}")
    subject = if @isSubjectPage() then utils.fakeSubject() else null
    @template.render("layout")

  discard: -> @exitDesigner()
  clear: -> @template.removeAllWidgets()

  promptSave: ->
    if @hasUnsavedChanges()
      @takeScreenShot() if !utils.is_ccr
      $('#save-modal').modal()
    else
      @exitDesigner()
    false

  hasUnsavedChanges: ->
    @history.hasChangesSinceLastSave() and @safeToExit isnt true

  reminderToSave: (e) ->
    if @hasUnsavedChanges()
      (e or window.event).returnValue = Designer.UNSAVED_CHANGES_WARNING
      return Designer.UNSAVED_CHANGES_WARNING
    else
      null

  exitDesigner: ->
    @safeToExit = true
    redirect = if environment.is_ccr then "/ccr2/parentReports/" else "./index.html"
    window.location.href = redirect

  saveAndExit: ->
    @template.save => @exitDesigner()

  takeScreenShot: ->
    $('#viewport').addClass('screenshot')
    utils.screenshot 'page', (data_url) =>
      @template.screenshot = data_url
      $('#viewport').removeClass('screenshot')

  updateHistoryButtonState: ->
    if @history.canUndo()
      $('#undo').addClass('enabled')
      $('#undo').removeClass('disabled')
    else
      $('#undo').removeClass('enabled')
      $('#undo').addClass('disabled')
    if @history.canRedo()
      $('#redo').addClass('enabled')
      $('#redo').removeClass('disabled')
    else
      $('#redo').removeClass('enabled')
      $('#redo').addClass('disabled')

  updateSavedButtonState: ->
    if @history.hasChangesSinceLastSave()
      $('#saved-icon').addClass('hidden')
      $('#save-msg').fadeIn(200)
    else
      $('#saved-icon').removeClass('hidden')
      $('#save-msg').fadeOut(200)
}

MicroEvent.mixin(Designer)

$ -> Designer.init()
