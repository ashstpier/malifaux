class window.WidgetContent
  constructor: (config={}) -> null

  render: (mode= 'layout', data=utils.fakeStudentData()) ->
    console.log mode
    @el = @["render_#{mode}"].call(this, data)
    @bindEvents(@el)
    @el

  render_layout: (data) ->
    @el = $("<div></div>")

  render_edit: (data) -> render_layout()

  render_display: (data) -> render_layout()

  bindEvents: (el) ->

  serialize: -> {}

  get: (param, fallback) -> if param? then param else fallback