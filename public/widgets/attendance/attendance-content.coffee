class window.AttendanceContent extends WidgetContent
  @className:   "AttendanceContent"
  @displayName: "Attendance Chart"
  @description: "Show a visual representation of student attendance."
  @icon:        "bell"

  defaultWidth: -> 400
  defaultHeight: -> 200

  @STYLE_DEFAULTS: {
    color1: '#77cc33'
    color2: '#cc0000'
    color3: '#e67e22'
    color4: '#9b59b6'
    chartstyle: 'bar'
    # color: '#000000'
    # font: 'Helvetica'
    # size: 'Medium'
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

    @attendance = data.attendance
    root = $("""<div class="attendance-widget"></div>""")
    @drawChart(root[0])
    @widget.bind('widget:move', @resizeChart)
    root

  resizeChart: =>
    @chart.resize({
      height: @widget.height()
      width: @widget.width()
    })

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
      # @option('font',  'font', "Font")
      # @option('size',  'size', "Text Size")
      # @option('color', 'color', "Text Color")
    ]

  drawChart: (root) =>

    # fontSize = parseInt(utils.sizeMap[@style.size])
    # label_position = 'right'

    # if @style.chartstyle == 'pie'
    #   chart_area = {left: 0, top: 0, width: '100%', height: '100%'}
    #   data = google.visualization.arrayToDataTable([
    #     ['Attendance', 'Percent', { role: 'style' } ],
    #     ["#{@_label1} #{parseFloat(@attendance.present)}%", parseFloat(@attendance.present), @style.color1],
    #     ["#{@_label2} #{parseFloat(@attendance.late)}%", parseFloat(@attendance.late), @style.color2],
    #     ["#{@_label3} #{parseFloat(@attendance.authorised)}%", parseFloat(@attendance.authorised), @style.color3],
    #     ["#{@_label4} #{parseFloat(@attendance.nonAuthorised)}%", parseFloat(@attendance.nonAuthorised), @style.color4]
    #   ])
    # else
    #   chart_area = {left: '10%', top: '10%', width: '50%', height: '80%'}
    #   data = google.visualization.arrayToDataTable([
    #     [
    #       'Attendance',
    #       "#{@_label1} #{parseFloat(@attendance.present)}%",
    #       "#{@_label2} #{parseFloat(@attendance.late)}%",
    #       "#{@_label3} #{parseFloat(@attendance.authorised)}%",
    #       "#{@_label4} #{parseFloat(@attendance.nonAuthorised)}%"
    #     ],
    #     [
    #       '',
    #       parseFloat(@attendance.present),
    #       parseFloat(@attendance.late),
    #       parseFloat(@attendance.authorised),
    #       parseFloat(@attendance.nonAuthorised)
    #     ]
    #   ])

    # @options = {
    #   width: @widget.width(),
    #   height: @widget.height(),
    #   colors: [@style.color1, @style.color2, @style.color3, @style.color4]
    #   chartArea: chart_area,
    #   pieSliceBorderColor: 'transparent',
    #   enableInteractivity: false,
    #   fontSize: fontSize,
    #   fontName: utils.fontMap[@style.font],
    #   titleTextStyle: {color: @style.color, fontSize: fontSize},
    #   legend: {textStyle: {color: @style.color}, position: label_position, maxLines: 3},
    #   backgroundColor: { fill:'transparent' },
    #   isStacked: true,
    #   vAxis: { gridlines: { count: 11 } }
    # }

    # if @style.chartstyle == 'pie'
    #   chart = new google.visualization.PieChart(@el[0])
    #   chart.draw(data, @options)
    # else
    #   chart = new google.visualization.ColumnChart(@el[0])
    #   chart.draw(data, @options)

    colors = {}
    colors[@_label1] = @style.color1
    colors[@_label2] = @style.color2
    colors[@_label3] = @style.color3
    colors[@_label4] = @style.color4

    if @style.chartstyle == 'pie'
      chartType = 'pie'
    else
      chartType = 'bar'

    @chart = c3.generate(
      bindto: root,
      data:
        order: 'asc'
        columns: [
          [ @_label1, parseFloat(@attendance.present) / 100 ]
          [ @_label2, parseFloat(@attendance.late) / 100 ]
          [ @_label3, parseFloat(@attendance.authorised) / 100 ]
          [ @_label4, parseFloat(@attendance.unauthorised) / 100 ]
        ]
        type: chartType
        groups: [ [ @_label1, @_label2, @_label3, @_label4 ] ]
        colors: colors

      axis: {
        y: {
          max: .99
          default: [0, 100]
          tick: {
            format: d3.format(",%")
          }
        }
        x: {
          show: false
          tick: {
            count: 0
          }
        }
      }

      legend: {
        position: 'right'
      }

      grid:
        y:
          show: true

      interaction: {
        enabled: false
      }
      size: {
        width: @widget.width()
        height: @widget.height()
      }
    )

  color1: @property('style', 'color1')
  color2: @property('style', 'color2')
  color3: @property('style', 'color3')
  color4: @property('style', 'color4')
  chartstyle: @property('style', 'chartstyle')
  # font: @property('style', 'font')
  # size: @property('style', 'size')
  # color: @property('style', 'color')
  label1: @property('_label1')
  label2: @property('_label2')
  label3: @property('_label3')
  label4: @property('_label4')

  serialize: ->
    {columns: @columns, style: @style, options: @options, labels: [@_label1,@_label2,@_label3,@_label4]}
