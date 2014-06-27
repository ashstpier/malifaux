class window.FieldContent extends WidgetContent

  @displayName: "Dynamic Text"
  @description: "Pull a text field from a student record and style it for display."
  @icon:        "nameplate"

  defaultWidth: -> 200
  defaultHeight: -> 50

  constructor: (config={}) ->
    @field = @get(config.field, @metrics()[0])

  render_layout: (data) ->
    $("""<div class="field-widget">#{@fieldFrom(data)}</div>""")

  render_edit: (data) ->
    options = for metric in @metrics()
      """<option #{if @field is metric then 'selected' else ''}>#{metric}</option>"""
    $ """
      <div class="field-edit">
        <select id="field-selector">#{options.join("\n")}</select>
        <button id="done">Done</button>
      </div>
    """

  bindEvents: (el) ->
    el.find('#done').click =>
      @saveConfig()
      @cancelEditing()


  fieldFrom: (data) ->
    data = data[key] for key in @field.split('.')
    data


  saveConfig: ->
    @field = @el.find('#field-selector').val()

  serialize: ->
    {field: @field}
