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
    $('#page').click (e) => if e.target is $('#page')[0] then @clearEditWidget()
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

  clearEditWidget: ->
    if @currentEditWidget
      @currentEditWidget.saveConfig()
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
    @template.render("layout")

  save: ->
    @template.save

  saveAndExit: ->
    @template.save =>
      window.location.href = './index.html'

  discard: ->
    window.location.href = './index.html'

  exit: ->
    $('#save-modal').modal()
    false
    
}

$ -> Designer.init()