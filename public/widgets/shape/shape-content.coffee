class window.ShapeContent extends WidgetContent

  @className:   "ShapeContent"
  @displayName: "Shape"
  @description: "A simple shape to be used for drawing."
  @icon:        "table"

  defaultWidth: -> 200
  defaultHeight: -> 200

  @STYLE_DEFAULTS: {
    fill_color: '#CCCCCC'
    stroke_color: '#888888'
  }

  fill_color: @property('style', 'fill_color')
  stroke_color: @property('style', 'stroke_color')

  initWithConfig: (config) ->
    @style = $.extend({}, ShapeContent.STYLE_DEFAULTS, @get(config.style, {}))

  renderAppearanceOptions: ->
    [
      @option('color',  'fill_color', "Fill colour")
      @option('color',  'stroke_color', "Border colour")
    ]

  render_layout: () ->
    $("<svg width='100%' height='100%'>
      <rect width='100%' height='100%' style='fill:#{@style.fill_color};stroke-width:3;stroke:#{@style.stroke_color}' />
    </svg>")

  serialize: -> {style: @style}