class window.TextContent

  @EDITOR_CONFIG: {
    imageUpload: false
    inlineMode: true
    mediaManager: false
    placeholder: "Type here..."
    plainPaste: true
    buttons: [
      "bold", "italic",
      "underline",
      "fontSize", "color",
      "sep", "align",
      "insertOrderedList", "insertUnorderedList",
      "outdent", "indent"
    ]
  }

  constructor: (config={}) ->
    @html = if config.html? then config.html else "<p>Type text here&hellip;</p>"

  render: (mode) ->
    @el = $("""<div class="text-widget">#{@html}</div>""")
    @el.click -> false
    @editor = @el.editable(TextContent.EDITOR_CONFIG) if mode is 'edit'
    @bindEvents()
    @el

  bindEvents: ->
    @el.on 'input', => @html = @el.html()

  serialize: -> { html: @html }
