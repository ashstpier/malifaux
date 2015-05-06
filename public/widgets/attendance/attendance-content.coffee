class window.AttendanceContent extends WidgetContent
  @className:   "AttendanceContent"
  @displayName: "Attendance Chart"
  @description: "Show a visual representation of student attendance."
  @icon:        "bell"

  defaultWidth: -> 450
  defaultHeight: -> 300

  @STYLE_DEFAULTS: {
    color1: '#77cc33'
    color2: '#cc0000'
    color3: '#e67e22'
    color4: '#9b59b6'
    chartstyle: 'bar'
    color: '#000000'
    font: 'Helvetica'
    size: 'Medium'
  }

  initWithConfig: (config) ->
    @style = $.extend({}, AttendanceContent.STYLE_DEFAULTS, @get(config.style, {}))
    @options = @get(config.options, {})
    @labels = @get(config.labels, ['Present', 'Late', 'Authorised', 'Unauthorised'])
    @_label1 = @labels[0]
    @_label2 = @labels[1]
    @_label3 = @labels[2]
    @_label4 = @labels[3]

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
      @option('select', 'chartstyle', "Chart style", options: {bar: 'Bar', pie: 'Pie'})
      @option('font',  'font', "Font")
      @option('size',  'size', "Text Size")
      @option('color', 'color', "Text Color")
    ]

  drawChart: () ->

    fontSize = parseInt(utils.sizeMap[@style.size])

    if @style.chartstyle == 'pie'
      label_position = 'left'
      chart_area = {left: 0, top: 0, width: '100%', height: '100%'}
      data = google.visualization.arrayToDataTable([
        ['Attendance', 'Percent', { role: 'style' } ],
        [@_label1, parseFloat(@attendance.present), @style.color1],
        [@_label2, parseFloat(@attendance.late), @style.color2],
        [@_label3, parseFloat(@attendance.authorised), @style.color3],
        [@_label4, parseFloat(@attendance.nonAuthorised), @style.color4]
      ])
    else
      label_position = 'top'
      chart_area = {left: '25%', top: '20%', width: '70%', height: '60%'}
      data = google.visualization.arrayToDataTable([
        ['Attendance', @_label1, @_label2, @_label3, @_label4 ],
        ['Attendance %', parseFloat(@attendance.present), parseFloat(@attendance.late), parseFloat(@attendance.authorised), parseFloat(@attendance.nonAuthorised)]
      ])

    @options = {
      width: @widget.width(),
      height: @widget.height(),
      colors: [@style.color1, @style.color2, @style.color3, @style.color4]
      chartArea: chart_area,
      pieSliceBorderColor: 'transparent',
      enableInteractivity: false,
      fontSize: fontSize,
      fontName: utils.fontMap[@style.font],
      titleTextStyle: {color: @style.color, fontSize: fontSize},
      legend: {textStyle: {color: @style.color}, position: label_position, maxLines: 3},
      backgroundColor: { fill:'transparent' },
      isStacked: true
    }

    if @style.chartstyle == 'pie'
      chart = new google.visualization.PieChart(@el[0])
      chart.draw(data, @options)
    else
      chart = new google.visualization.BarChart(@el[0])
      chart.draw(data, @options)

  color1: @property('style', 'color1')
  color2: @property('style', 'color2')
  color3: @property('style', 'color3')
  color4: @property('style', 'color4')
  chartstyle: @property('style', 'chartstyle')
  font: @property('style', 'font')
  size: @property('style', 'size')
  color: @property('style', 'color')
  label1: @property('_label1')
  label2: @property('_label2')
  label3: @property('_label3')
  label4: @property('_label4')

  serialize: ->
    {columns: @columns, style: @style, options: @options, labels: [@_label1,@_label2,@_label3,@_label4]}
