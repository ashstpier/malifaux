class window.SubjectFieldContent extends FieldContent

  @displayName: "Subject Dynamic Text"
  @description: "Pull a text field from a specific subject and style it for display."
  @icon:        "book"

  defaultWidth: -> 280
  defaultHeight: -> 80

  initWithConfig: (config) ->
    super(config)
    @_subject = @get(config.subject, 'PH')
    @_field = @get(config.field, 'A_KS4_STA#A_Y11a_V3#Aut2_Comm')

  render_layout: (data) ->
    $("""<div class="subject-field-widget" style="#{@textStyles()}">#{@fieldFrom(data)}</div>""")

  renderConfigOptions: ->
    [
      @option('text', 'subject', "Subject", hint: "The 2 or 3 letter CCR subject code you would like to pull from.")
      @option('text', 'field', "Field", hint: "The subject scoped CCR field you would like to be merged, the data shown is only a sample of the final output and the selected field may not have any data.")
    ]

  fieldFrom: (data) ->
    data.subjects[@subject()]?.results[@field()] or "? No Value ?"

  subject: @property('_subject')

  serialize: ->
    {field: @_field, subject: @_subject, style: @style}
