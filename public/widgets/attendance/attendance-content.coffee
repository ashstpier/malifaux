class window.AttendanceContent extends WidgetContent
  @className:   "AttendanceContent"
  @displayName: "Attendance Chart"
  @description: "Show a visual representation of student attendance."
  @icon:        "bell"

  defaultWidth: -> 400
  defaultHeight: -> 300

  @STYLE_DEFAULTS: {
    color1: '#77cc33'
    color2: '#cc0000'
    color3: '#e67e22'
    color4: '#9b59b6'
    labels: 'right'
    chartstyle: 'twoD'
    color: '#000000'
    font: 'Helvetica'
    size: 'Medium'
  }

  initWithConfig: (config) ->
    @style = $.extend({}, AttendanceContent.STYLE_DEFAULTS, @get(config.style, {}))
    @_label1 = @get(config.title, 'Present')
    @_label2 = @get(config.title, 'Late')
    @_label3 = @get(config.title, 'Authorised')
    @_label4 = @get(config.title, 'Unauthorised')

  render_layout: (data) ->

    @widget.bind 'widget:move', => @drawChart()
    @attendance = data.attendance
    google.load('visualization', '1.0', {'packages':['corechart'], callback: => @drawChart() })

    $("""<div class="attendance-widget"></div>""")

  renderConfigOptions: ->
    [
      @option('text', 'label1', "Present label")
      @option('text', 'label2', "Late label")
      @option('text', 'label3', "Authorised label")
      @option('text', 'label4', "Unauthorised label")
    ]

  renderAppearanceOptions: ->
    [
      @option('color', 'color1', "Present")
      @option('color', 'color2', "Late")
      @option('color', 'color3', "Authorised")
      @option('color', 'color4', "Unauthorised")
      @option('select', 'labels', "Labels", options: {right: 'show', none: 'hide'})
      @option('select', 'chartstyle', "Chart style", options: {twoD: '2D', threeD: '3D'})
      @option('font',  'font', "Font")
      @option('size',  'size', "Text Size")
      @option('color', 'color', "Text Color")
    ]

  drawChart: () ->
    data = new google.visualization.DataTable()
    data.addColumn('string', 'Attendance')
    data.addColumn('number', 'Percent')
    data.addRows([
      [@_label1, parseFloat(@attendance.present)],
      [@_label2, parseFloat(@attendance.late)],
      [@_label3, parseFloat(@attendance.authorised)],
      [@_label4, parseFloat(@attendance.nonAuthorised)]
    ])

    fontSize = parseInt(utils.sizeMap[@style.size])

    options = {
      width: @widget.width(),
      height: @widget.height(),
      colors: [@style.color1, @style.color2, @style.color3, @style.color4]
      is3D: @style.chartstyle == 'threeD',
      chartArea: {left: 0, top: 0, width: '100%', height: '100%'},
      pieSliceBorderColor: "transparent",
      enableInteractivity: false,
      fontSize: fontSize,
      fontName: utils.fontMap[@style.font],
      titleTextStyle: {color: @style.color, fontSize: fontSize + 4},
      legend: {textStyle: {color: @style.color}, position: @style.labels}
    }

    chart = new google.visualization.PieChart(@el[0])
    chart.draw(data, options)

  color1: @property('style', 'color1')
  color2: @property('style', 'color2')
  color3: @property('style', 'color3')
  color4: @property('style', 'color4')
  chartstyle: @property('style', 'chartstyle')
  labels: @property('style', 'labels')
  font: @property('style', 'font')
  size: @property('style', 'size')
  color: @property('style', 'color')
  label1: @property('_label1')
  label2: @property('_label2')
  label3: @property('_label3')
  label4: @property('_label4')
