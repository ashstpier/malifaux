class window.TextContent

  constructor: ->
    @html = "<p>Type text here&hellip;</p>"

  render: (mode) ->
    @el = $("""<div class="text-widget">#{@html}</div>""")
    @editor = new MediumEditor(@el) if mode is 'edit'
    @bindEvents()
    @el

  bindEvents: ->
    @el.on 'input', => @html = @el.html()

  serialize: -> { html: @html }
