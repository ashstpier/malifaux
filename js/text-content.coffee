class window.TextContent

  constructor: (config={}) ->
    @html = if config.html? then config.html else "<p>Type text here&hellip;</p>"

  render: (mode) ->
    @el = $("""<div class="text-widget">#{@html}</div>""")
    @el.click -> false
    @editor = new MediumEditor(@el) if mode is 'edit'
    @bindEvents()
    @el

  bindEvents: ->
    @el.on 'input', => @html = @el.html()

  serialize: -> { html: @html }
