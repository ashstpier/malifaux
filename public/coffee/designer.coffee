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
    @renderPagesList()

  renderPropertyPanel: ->
    @propertyPanel = new Properties(this)
    @propertyPanel.render()

  renderWidgetButtons: ->
    for name, className of Widget.WIDGETS
      type = window[className]
      if type.active
        $("#widget-gallery .assembly-modal-content").append """
          <div id="add-#{name}" class="add-widget">
            <i class="glyphicons #{type.icon}"></i>
            <h4>#{type.displayName}</h4>
            <p>#{type.description}</p>
          </div>
        """

  renderPagesList: ->
    $('#page-list').empty()
    $('#pages-nav-label').html("Page #{@template.currentPageNumber+1}")
    for page, n in @template.pages
      classes = ['page-button']
      classes.push('page-button-active') if n is @template.currentPageNumber
      classes.push('page-button-landscape') if page.orientation is 'landscape'
      classes.push('page-button-subject') if page.pagetype is 'subject'
      $('#page-list').append """
        <div class="#{classes.join(' ')}" data-number="#{n}">
          <div class="page-icon">
            #{if n is @template.currentPageNumber then '' else '<span class="page-delete-button" title="Remove page" data-number="#{n}">&times;</span>'}
          </div>
          Page #{n+1}
        </div>
      """

  setOrientation: (orientation) ->
    Designer.history.push(this, 'updateOrientation', @template.currentPage.orientation, orientation, @template.currentPageNumber)
    @updateOrientation(orientation)

  updateOrientation: (orientation) ->
    @template.currentPage.orientation = orientation
    $("#orientation input:radio").removeAttr('checked')
    $("#orientation input:radio[value='#{@template.currentPage.orientation}']").prop('checked', true)
    @updatePageAttributes()
    @renderPagesList()

  setPageType: (pagetype) ->
    Designer.history.push(this, 'updatePageType', @template.currentPage.pagetype, pagetype, @template.currentPageNumber)
    @updatePageType(pagetype)

  updatePageType: (pagetype) ->
    @template.currentPage.pagetype = pagetype
    $("#pagetype input:radio").removeAttr('checked')
    $("#pagetype input:radio[value='#{@template.currentPage.pagetype}']").prop('checked', true)
    @updatePageAttributes()
    @renderPagesList()
    @template.setSubject(utils.subject(@template.currentPage.pagetype))


  updatePageAttributes: ->
    @template.currentPage.updateAttributes()

  isSubjectPage: -> (@template.currentPage.pagetype is 'subject')

  isStudentPage: -> (@template.currentPage.pagetype is 'student')

  bindEvents: ->
    $('#save-exit').click => @saveAndExit()
    $('#discard').click => @discard()
    $('#save a').click =>
        @template.save =>
          @history.resetSaveChanges()
        false
    $('#exit a').click => @promptSave()
    $('#viewport').on 'mousedown', '.page', (e) => @maybeClearSelection(e.target)
    $('#orientation input:radio').change (e) => @setOrientation($(e.currentTarget).val())
    $('#pagetype input:radio').change (e) => @setPageType($(e.currentTarget).val())
    $('#name').blur => @updateName()
    $('#name').keypress (e) => $('#name').blur() if e.which == 13
    $('#name').click (e) => $(e.currentTarget).selectText()
    $('#undo').click => @history.undo()
    $('#redo').click => @history.redo()
    $('#page-list').on 'click', '.page-delete-button', (e) => @deletePage(Number($(e.currentTarget).attr('data-number')))
    $('#page-list').on 'click', '.page-button', (e) => @switchPage(Number($(e.currentTarget).attr('data-number')))
    $('#add-page').click => @addPage()
    @history.bind 'history:ensure-page', (page) => @switchPage(page)
    @history.bind 'history:change', => @updateHistoryButtonState()
    @history.bind 'history:change', => @updateSavedButtonState()
    @bindKeyboardEvents()

    $('#widget-gallery').assemblyModal()
    $('#properties-tabs').assemblyTabs()

    $('#widget-options').click => $('#widget-gallery').assemblyModal('show')

    window.addEventListener "beforeunload", (e) => @reminderToSave(e)

    for name, className of Widget.WIDGETS
      do (className) => $("#add-#{name}").click =>
        $('#widget-gallery').assemblyModal('hide')
        @addWidget(type: className, zIndex: @template.currentPage.widgets.length+1)
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

  addPage: ->
    @template.addPage()
    @template.setCurrentPage(@template.pages.length-1)
    @renderPagesList()
    false

  switchPage: (number) ->
    return if @template.currentPageNumber is number
    @clearSelection()
    @clearEditWidget()
    @template.setCurrentPage(number)
    @setPageFormFields()
    @renderPagesList()
    false

  deletePage: (number) ->
    @template.removePage(number)
    @renderPagesList()
    false

  copy: ->
    return unless @selection
    @clipboard = @selection.serialize()


  paste: ->
    return unless @clipboard
    widgetConfig = $.extend({}, @clipboard)
    content = if widgetConfig.type? then new window[widgetConfig.type](this, widgetConfig.content) else new TextContent()
    width = if widgetConfig.width? then widgetConfig.width else @content.defaultWidth()
    widgetConfig.x = ((960/2) - (width/2))
    widgetConfig.y = $('#viewport').scrollTop() + 100
    @addWidget(widgetConfig)

  duplicate: ->
    widgetConfig = @selection.serialize()
    widgetConfig.x = widgetConfig.x + Designer.NUDGE_SIZE*2
    widgetConfig.y = widgetConfig.y + Designer.NUDGE_SIZE*2
    @addWidget(widgetConfig)

  updateNameFromHistory: (name) ->
    @template.name = name
    $('#name').text(name)

  updateName: ->
    newName = $('#name').text()
    oldName = @template.name
    @template.name = newName
    Designer.history.push(this, 'updateNameFromHistory', oldName, newName);

  select: (widget) ->
    return true if @selection is widget
    @selection = widget
    @trigger('selection:change', @selection)

  clearSelection: -> @select(null)

  maybeClearSelection: (target) ->
    if $('.page').is(target)
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
      Designer.history.push(this, 'addRemoveWidget', {remove:widget}, {add:widget}, @template.currentPageNumber)

  removeWidget: (widget, withHistory=true) ->
    @currentEditWidget = null if @currentEditWidget is widget
    @clearSelection()
    @template.removeWidget(widget)
    if withHistory
      Designer.history.push(this, 'addRemoveWidget', {add:widget}, {remove:widget}, @template.currentPageNumber)

  addRemoveWidget: (action) ->
    @addWidget(action.add, false) if action.add?
    @removeWidget(action.remove, false) if action.remove?

  load: ->
    $('#name').text(@template.name)
    @setPageFormFields()
    subject = if @isSubjectPage() then utils.fakeSubject() else null
    @template.render("layout")

  setPageFormFields: ->
    $("#orientation input:radio[value='#{@template.currentPage.orientation}']").prop('checked', true)
    $("#pagetype input:radio[value='#{@template.currentPage.pagetype}']").prop('checked', true)

  discard: -> @exitDesigner()
  clear: -> @template.removeAllWidgets()

  promptSave: ->
    if @hasUnsavedChanges()
      $('#save-modal').assemblyModal()
      $('#save-modal').assemblyModal('show')
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

  setWidgetToBack: (guid) ->
    currentOrder = @template.getWidgetOrder()
    reorder = _.without(currentOrder, guid)
    reorder.unshift(guid)
    @template.setWidgetOrder(reorder)
    Designer.history.push(this, 'undoRedoOrderingWidget', {undo:currentOrder}, {redo:reorder}, @template.currentPageNumber)

  setWidgetBackOne: (guid) ->
    currentOrder = @template.getWidgetOrder()
    currentIndex = _.indexOf(currentOrder, guid)
    unless currentIndex is 0
      reorder = _.without(currentOrder, guid)
      reorder.splice(currentIndex - 1, 0, guid)
      @template.setWidgetOrder(reorder)
      Designer.history.push(this, 'undoRedoOrderingWidget', {undo:currentOrder}, {redo:reorder}, @template.currentPageNumber)

  setWidgetForwardOne: (guid) ->
    currentOrder = @template.getWidgetOrder()
    currentIndex = _.indexOf(currentOrder, guid)
    unless currentIndex is @template.currentPage.widgets.length - 1
      reorder = _.without(currentOrder, guid)
      reorder.splice(currentIndex + 1, 0, guid)
      @template.setWidgetOrder(reorder)
      Designer.history.push(this, 'undoRedoOrderingWidget', {undo:currentOrder}, {redo:reorder}, @template.currentPageNumber)

  setWidgetToFront: (guid) ->
    currentOrder = @template.getWidgetOrder()
    reorder = _.without(currentOrder, guid)
    reorder.push(guid)
    @template.setWidgetOrder(reorder)
    Designer.history.push(this, 'undoRedoOrderingWidget', {undo:currentOrder}, {redo:reorder}, @template.currentPageNumber)

  undoRedoOrderingWidget: (action) ->
    @template.setWidgetOrder(action.undo)
    @template.setWidgetOrder(action.redo)

  nextAvailableZIndex: -> @template.nextAvailableZIndex()
}

MicroEvent.mixin(Designer)

$ -> Designer.init()
