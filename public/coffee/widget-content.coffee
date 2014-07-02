class window.WidgetContent

  @displayName: "A Widget"
  @description: "An element that can be added to the page."
  @icon:        "wrench"

  constructor: (@widget, config={}) ->
    @initWithConfig(config)

  render: (mode= 'layout', data=utils.fakeStudentData()) ->
    @el = @["render_#{mode}"].call(this, data)
    @bindEvents(@el) unless mode is 'display'
    @el

  render_layout: (data) ->
    @el = $("<div></div>")

  render_edit: (data) -> @render_layout(data)

  render_display: (data) -> @render_layout(data)

  bindEvents: (el) ->

  cancelEditing: ->
    Designer.clearEditWidget()

  serialize: -> {}

  get: (param, fallback) -> if param? then param else fallback

  defaultWidth: -> 160
  defaultHeight: -> 160

  assessmentPoints: ->
    points = ($.extend({}, obj, {code: key}) for key, obj of API.assessmentPoints())
    points.sort (a,b) -> if a.name <= b.name then -1 else 1


  metrics: ->
    API.metrics()

  styleOption: (type, key, label=key, options={}) ->
    new StyleOptionRenderer(type, key, label, options).render(@style)

  styleString: (styles) ->
    ("#{name}: #{value};" for name, value of styles).join(" ").replace(/"/gm, '&quot;')

  setAspectRatio: (ratio=true) -> @widget.setAspectRatio(ratio)



class window.StyleOptionRenderer
  constructor: (@type, @key, @label, @options={}) ->

  render: (styles) ->
    """
      <p class="style-option">
        <label for="#{@key}">#{@label}</label>
        #{@renderInput(styles)}
      </p>
    """

  renderInput: (styles) ->
    switch @type
      when 'font'   then @renderFontInput(styles)
      when 'size'   then @renderSizeInput(styles)
      when 'select' then @renderSelectInput(styles)
      else
        """<input name="#{@key}" class="style-option" name="#{@key}" type="#{@type}" value="#{styles[@key]}" />"""

  renderFontInput: (styles) ->
    options = for fontName, desc of utils.fontMap
      """<option #{if styles[@key] is fontName then 'selected' else ''}>#{fontName}</option>"""
    """
      <select name="#{@key}" class="style-option" name="#{@key}">
        #{options.join("\n")}
      </select>
    """

  renderSizeInput: (styles) ->
    options = for sizeName, size of utils.sizeMap
      """<option #{if styles[@key] is sizeName then 'selected' else ''}>#{sizeName}</option>"""
    """
      <select name="#{@key}" class="style-option" name="#{@key}">
        #{options.join("\n")}
      </select>
    """

  renderSelectInput: (styles) ->
    options = for value, name of @options
      """<option value="#{value}" #{if styles[@key] is value then 'selected' else ''}>#{name}</option>"""
    """
      <select name="#{@key}" class="style-option" name="#{@key}">
        #{options.join("\n")}
      </select>
    """

