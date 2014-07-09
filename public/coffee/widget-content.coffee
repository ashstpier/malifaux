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

  redraw: -> @widget.redraw()

  bindEvents: (el) ->

  cancelEditing: ->
    Designer.clearEditWidget()

  serialize: -> {}

  saveConfig: -> {}

  get: (param, fallback) -> if param? then param else fallback

  defaultWidth: -> 160
  defaultHeight: -> 160

  assessmentPoints: ->
    points = ($.extend({}, obj, {code: key}) for key, obj of API.assessmentPoints())
    points.sort (a,b) -> if a.name <= b.name then -1 else 1


  metrics: ->
    API.metrics()

  option: (type, key, label=key, config={}) ->
    new OptionRenderer(this, type, key, label, config).render(@style)

  styleString: (styles) ->
    ("#{name}: #{value};" for name, value of styles).join(" ").replace(/"/gm, '&quot;')

  setAspectRatio: (ratio=true) -> @widget.setAspectRatio(ratio)

  renderAppearanceOptions: -> false
  renderConfigOptions: -> false


class window.OptionRenderer
  constructor: (@receiver, @type, @key, @label, @config={}) ->

  render: (styles) ->
    """
      <div class="prop-option">
        <label class="prop-label" for="#{@key}">#{@label}</label>
        #{@renderInput(styles)}
        #{@renderHint()}
      </div>
    """

  renderHint: ->
    return '' unless @config.hint
    """<p class="prop-hint">#{@config.hint}</p>"""

  renderInput: (styles) ->
    @value = @receiver[@key].call(@receiver)
    switch @type
      when 'font'   then @renderFontInput(styles)
      when 'size'   then @renderSizeInput(styles)
      when 'select' then @renderSelectInput(styles)
      else
        """<input name="#{@key}" class="prop-input" name="#{@key}" type="#{@type}" value="#{@value}" data-fn="#{@key}" />"""

  renderFontInput: (styles) ->
    options = for fontName, desc of utils.fontMap
      """<option #{if @value is fontName then 'selected' else ''}>#{fontName}</option>"""
    """
      <select name="#{@key}" class="prop-input" data-fn="#{@key}">
        #{options.join("\n")}
      </select>
    """

  renderSizeInput: (styles) ->
    options = for sizeName, size of utils.sizeMap
      """<option #{if @value is sizeName then 'selected' else ''}>#{sizeName}</option>"""
    """
      <select name="#{@key}" class="prop-input" data-fn="#{@key}">
        #{options.join("\n")}
      </select>
    """

  renderSelectInput: (styles) ->
    options = for value, name of @config.options
      """<option value="#{value}" #{if @value is value then 'selected' else ''}>#{name}</option>"""
    """
      <select name="#{@key}" class="prop-input" data-fn="#{@key}">
        #{options.join("\n")}
      </select>
    """

