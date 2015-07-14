class window.TextContent extends WidgetContent
  @className:   "TextContent"
  @displayName: "Free Text"
  @description: "A block of static text with formatting options."
  @icon:        "font"

  defaultWidth: -> 360
  defaultHeight: -> 240
  editable: -> @widget.currentMode is 'layout'

  @EDITOR_CONFIG: {
    imageUpload: false
    inlineMode: true
    mediaManager: false
    placeholder: "Type here..."
    plainPaste: true,
    spellcheck: true,
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

  @STYLE_DEFAULTS: {
    font: 'Helvetica'
  }

  initWithConfig: (config) ->
    @html = @get(config.html, TextContent.DEFAULT_CONTENT)
    @style = $.extend({}, TextContent.STYLE_DEFAULTS, @get(config.style, {}))

  render_layout: (data) ->
    styles = @styleString('font-family': utils.fontMap[@style.font])
    $("""<div class="text-widget" style="#{styles}">#{@html}</div>""")

  render_edit: (data) ->
    node = @render_layout(data)
    @editor = node.editable(TextContent.EDITOR_CONFIG)
    node

  renderAppearanceOptions: ->
    @option('font',  'font', "Font")

  bindEvents: (el) ->
    el.on 'editable.contentChanged', =>
      @html = @el.editable("getHTML")

  font: @property('style', 'font')

  serialize: -> { html: @html, style: @style }
