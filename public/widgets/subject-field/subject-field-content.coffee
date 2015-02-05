class window.SubjectFieldContent extends FieldContent
  @className:   "SubjectFieldContent"
  @displayName: "Subject Dynamic Text"
  @description: "Pull a text field from a specific subject and style it for display."
  @icon:        "book"

  defaultWidth: -> 280
  defaultHeight: -> 80

  initWithConfig: (config) ->
    super(config)
    @_subject = @get(config.subject, 'PH')
    @_field = @get(config.field, @assessmentPoints()[0].code)
    @mappings = @get(config.mappings, {})

  render_layout: (data) ->
    $("""<div class="subject-field-widget" style="#{@textStyles()}">#{@fieldFrom(data)}</div>""")

  renderConfigOptions: ->
    options = {}
    options[point.code] = point.longName for point in @assessmentPoints()
    options = [
      @option('select', 'field', "Field", options: options, hint: "This is the CCR! field you would like to be merged, the data shown is only a sample of the final output.")
      @mappingSettings()
    ]
    if @widget.subject is null
      options.unshift(@option('text', 'subject', "Subject", hint: "The 2 or 3 letter CCR! subject code you would like to pull from."))
    options

  mappingSettings: ->
    node = $("""<div class="mapping-option"><a href="#" class="mapping">#{if $.isEmptyObject(@mappings) then 'Add word mappings...' else 'Edit word mappings...'}</a></div>""")
    self = this
    node.on "click", ".mapping", =>
      new MappingModal(@mappings, @changeMapping)
    node

  changeMapping: (newMappings) =>
    oldMappings = @mappings
    @updateMapping(newMappings)
    Designer.history.push(this, 'updateMapping', oldMappings, newMappings)

  updateMapping: (mappings) =>
    @mappings = mappings
    @redraw()

  fieldFrom: (data) ->
    subject = if @widget.subject then @widget.subject else @subject()
    defaultValue = if @widget.currentMode is 'display' then '' else "? No Value ?"
    value = data.subjects[subject]?.results[@field()] or defaultValue
    @mappings[value] or value

  subject: @property('_subject')

  serialize: ->
    {field: @field(), subject: @subject(), style: @style, mappings: @mappings}
