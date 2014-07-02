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
    @field = @get(config.field, @metrics()[0])
    @style = $.extend({}, FieldContent.STYLE_DEFAULTS, @get(config.style, {}))

  render_layout: (data) ->
    $("""<div class="field-widget" style="#{@textStyles()}">#{@fieldFrom(data)}</div>""")

  render_edit: (data) ->
    options = for metric in @metrics()
      """<option #{if @field is metric then 'selected' else ''}>#{metric}</option>"""
    $ """
      <div class="field-edit">
        <select id="field-selector">#{options.join("\n")}</select>
        <button id="done">Done</button>

        <h4>Style</h4>
        #{@styleOption('font',  'font', "Font")}
        #{@styleOption('size',  'size', "Text Size")}
        #{@styleOption('color', 'color', "Text Color")}
      </div>
    """

  textStyles: ->
    @styleString('color': @style.color, 'font-family': @style.font, 'font-size': @style.size)

  bindEvents: (el) ->
    el.find('#done').click =>
      @saveConfig()
      @cancelEditing()


  fieldFrom: (data) ->
    data = data[key] for key in @field.split('.')
    data

  saveText: ->
    @field = @el.find('#field-selector').val()

  saveConfig: ->
    @saveText()
    @saveStyle()

  saveStyle: ->
    for el in @el.find('.style-option')
      name = $(el).attr('name')
      @style[name] = $(el).val()

  serialize: ->
    {field: @field, style: @style}
