class window.FieldContent extends WidgetContent

  @displayName: "Dynamic Text"
  @description: "Pull a text field from a student record and style it for display."
  @icon:        "nameplate"

  defaultWidth: -> 200
  defaultHeight: -> 50

  @STYLE_DEFAULTS: {
    color: '#000000'
    font: 'Helvetica'
    size: 'Medium'
  }

  initWithConfig: (config) ->
    @_field = @get(config.field, @metrics()[0])
    @style = $.extend({}, FieldContent.STYLE_DEFAULTS, @get(config.style, {}))

  render_layout: (data) ->
    $("""<div class="field-widget" style="#{@textStyles()}">#{@fieldFrom(data)}</div>""")

  renderAppearanceOptions: ->
    @option('font',  'font', "Font") +
    @option('size',  'size', "Text Size") +
    @option('color', 'color', "Text Color")

  renderConfigOptions: ->
    options = {}
    options[metric] = metric for metric in @metrics()
    @option('select', 'field', "Field", options: options, hint: "This is the CCR field you would like to be merged, the data shown is only a sample of the final output.")

  textStyles: ->
    @styleString('color': @style.color, 'font-family': @style.font, 'font-size': @style.size)

  fieldFrom: (data) ->
    data = data[key] for key in @_field.split('.')
    data

  font: (n) ->
    if n?
      @style.font = n
      @redraw()
    else
      @style.font

  size: (n) ->
    if n?
      @style.size = n
      @redraw()
    else
      @style.size

  color: (n) ->
    if n?
      @style.color = n
      @redraw()
    else
      @style.color

  field: (n) ->
    if n?
      @_field = n
      @redraw()
    else
      @_field

  serialize: ->
    {field: @_field, style: @style}
