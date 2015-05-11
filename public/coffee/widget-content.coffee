class window.WidgetContent
  @className:   "WidgetContent"
  @displayName: "A Widget"
  @description: "An element that can be added to the page."
  @icon:        "wrench"
  @active:      true

  @property: (obj, key=null) ->
    (val) ->

      read = =>
        if key
          @[obj][key]
        else
          @[obj]

      write = (v) =>
        if key
          @[obj][key] = v
        else
          @[obj] = v

      if val?
        old = read()
        write(val)
        @redraw()
        Designer.history.push(this, 'runPropertyUndoSetter', {fn:write, v:old}, {fn:write, v:val})
      else
        read()

  className: -> @constructor.className

  runPropertyUndoSetter: (o) ->
    o.fn.call(this, o.v)
    Designer.select(@widget)
    @redraw()

  constructor: (@widget, config={}) ->
    @initWithConfig(config)

  render: (mode, data) ->
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
  editable: -> false

  assessmentPoints: ->
    points = ($.extend({}, obj, {code: key}) for key, obj of API.assessmentPoints())

  metrics: ->
    API.metrics()

  images: ->
    API.images()

  option: (type, key, label=key, config={}) ->
    new OptionRenderer(this, type, key, label, config).render(@style)

  styleString: (styles) ->
    ("#{name}: #{value};" for name, value of styles when value?).join(" ").replace(/"/gm, '&quot;')

  setAspectRatio: (ratio=true) -> @widget.setAspectRatio(ratio)

  renderAppearanceOptions: -> false
  renderConfigOptions: -> false

  placeholderWithLabel: (label, html=true) ->
    blank = if html then '&nbsp;' else ''
    return blank if @widget.currentMode is 'display'
    return blank if label is null or label is undefined or label.length is 0
    if html
      """<span class="no-value">#{label}</span>"""
    else
      "[?:#{label}]"


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
      when 'font'     then @renderFontInput(styles)
      when 'size'     then @renderSizeInput(styles)
      when 'select'   then @renderSelectInput(styles)
      when 'checkbox' then @renderCheckboxInput(styles)
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
    grouped = false
    if $.isArray(@config.options) # array format: [[val1, label1], [val2, label2], ...] or [v1,v2,v3]
      if $.isArray(@config.options[0])
        optionsArray = @config.options
      else
        optionsArray = _.map @config.options, (v) -> [v,v]
    else if $.isArray(@config.options[Object.keys(@config.options)[0]]) # optgroup format: {group1: [[val1, label1]], group2: [[val2, label2]], ...}
      grouped = true
    else # object format: {val1: label1, val2: label2, ...}
      optionsArray = ([key, value] for key, value of @config.options)

    isSelected = (v) =>
      if @config.multiple
        _.contains(@value, v)
      else
        @value is v

    renderOption = (item) -> """<option value="#{item[0]}" #{if isSelected(item[0]) then 'selected' else ''}>#{item[1]}</option>"""

    if grouped
      options = for group, items of @config.options
        items = (renderOption(item) for item in items).join("\n")
        """<optgroup label="#{group}">#{items}</optgroup>"""
    else
      options = (renderOption(item) for item in optionsArray)

    multiple = if @config.multiple then 'multiple' else ''

    """
      <select name="#{@key}" class="prop-input #{multiple}" data-fn="#{@key}" #{multiple}>
        #{options.join("\n")}
      </select>
    """

  renderCheckboxInput: (styles) ->
    """<input name="#{@key}" class="prop-input prop-input-checkbox" name="#{@key}" type="#{@type}" value="1" data-fn="#{@key}"
      #{if @value then 'checked="checked"' else ''} />"""
