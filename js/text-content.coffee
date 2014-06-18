class window.TextContent

  constructor: ->
    @html = "<p>Hello, I'm a Text Widget!</p>"

  render: (mode) ->
    @el = $("""<div>#{@html}</div>""")
    @editor = new MediumEditor(@el) if mode is 'edit'
    @bindEvents()
    @el

  bindEvents: ->
    @el.on 'input', => @html = @el.html()

  serialize: -> { html: @html }
