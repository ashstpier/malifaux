class window.WidgetContent
  constructor: (config={}) -> null

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
    API.assessmentPoints()

  styleOption: (type, key, label=key) ->
      """
        <p class="style-option">
          <label for="#{key}">#{label}</label>
          <input name="#{key}" class="style-option" name="#{key}" type="#{type}" value="#{@style[key]}" />
        </p>
      """

  styleString: (styles) ->
    ("#{name}: #{value};" for name, value of styles).join(" ")

