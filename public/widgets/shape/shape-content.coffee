class window.ShapeContent extends WidgetContent

  @className:   "ShapeContent"
  @displayName: "Shape"
  @description: "A simple shape to be used for drawing."
  @icon:        "vector_path_square"

  defaultWidth: -> 200
  defaultHeight: -> 200

  @border_widths = {"0": "none", "1": "1", "3": "3", "5": "5", "8": "8", "10": "10", "15": "15"}

  @STYLE_DEFAULTS: {
    fill_color: '#CCCCCC'
    stroke_color: '#888888'
    stroke_width: '3'
    shape: 'rectangle'
    border_radius: '5'
  }

  fill_color: @property('style', 'fill_color')
  stroke_color: @property('style', 'stroke_color')
  stroke_width: @property('style', 'stroke_width')
  shape: @property('style', 'shape')
  border_radius: @property('style', 'border_radius')
  maintainAspectRatio: @property('_maintainAspectRatio')

  initWithConfig: (config) ->
    @style = $.extend({}, ShapeContent.STYLE_DEFAULTS, @get(config.style, {}))

  renderAppearanceOptions: ->
    [
      @option('select', 'shape', "Shape", options: {rectangle: "Rectangle", ellipse: "Ellipse"})
      @option('color',  'fill_color', "Fill colour")
      @option('color',  'stroke_color', "Border colour")
      @option('select', 'stroke_width', "Border width", options: ShapeContent.border_widths)
      @option('select', 'border_radius', "Corner radius", options: ShapeContent.border_widths)
    ]

  renderConfigOptions: ->
    [
      @option('checkbox', 'maintainAspectRatio', "Maintain Aspect Ratio")
    ]

  render_layout: () ->
    if @maintainAspectRatio()
      @setAspectRatio(1)
    else
      setTimeout (=> @setAspectRatio(0)), 0

    if @style.shape is 'rectangle'
      $("<svg width='100%' height='100%'>
        <rect x='#{@style.stroke_width / 1.6}%' y='#{@style.stroke_width / 1.6}%' width='#{100 - @style.stroke_width / 0.8}%' height='#{100 - @style.stroke_width / 0.8}%' rx='#{@style.border_radius}' ry='#{@style.border_radius}' style='fill:#{@style.fill_color};stroke-width:#{@style.stroke_width};stroke:#{@style.stroke_color}' />
      </svg>")
    else
      $("<svg height='100%' width='100%'>
        <ellipse cx='50%' cy='50%' rx='#{45 - @style.stroke_width / 1.8}%' ry='#{45 - @style.stroke_width / 1.8}%' stroke='#{@style.stroke_color}' stroke-width='#{@style.stroke_width}' fill='#{@style.fill_color}' />
      </svg>")

  serialize: -> {style: @style, maintainAspectRatio: @maintainAspectRatio()}