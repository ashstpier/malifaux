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
    @_field = @get(config.field, 'A_KS4_STA#A_Y11a_V3#Aut2_Comm')
    @mappings = @get(config.mappings, {})

  render_layout: (data) ->
    $("""<div class="subject-field-widget" style="#{@textStyles()}">#{@fieldFrom(data)}</div>""")

  renderConfigOptions: ->
    options = {}
    options[point.name] = point.longName for point in @assessmentPoints()
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
    value = data.subjects[subject]?.results[@field()] or "? No Value ?"
    @mappings[value] or value

  subject: @property('_subject')

  serialize: ->
    {field: @_field, subject: @_subject, style: @style, mappings: @mappings}
