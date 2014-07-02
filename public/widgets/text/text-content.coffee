class window.TextContent extends WidgetContent

  @displayName: "Free Text"
  @description: "A block of static text with formatting options."
  @icon:        "font"

  defaultWidth: -> 360
  defaultHeight: -> 240

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

  @DEFAULT_CONTENT: "<p>Type text here&hellip;</p>"

  initWithConfig: (config) ->
    @html = @get(config.html, TextContent.DEFAULT_CONTENT)

  render_layout: (data) ->
    $("""<div class="text-widget">#{@html}</div>""")

  render_edit: (data) ->
    node = @render_layout(data)
    @editor = node.editable(TextContent.EDITOR_CONFIG)
    node

  bindEvents: (el) ->
    el.click -> false
    el.on 'input', => @html = @el.editable("getHTML")

  serialize: -> { html: @html }
