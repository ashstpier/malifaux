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
    chartstyle: 'bar'
    font: 'Helvetica'
    legend: 'right'
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
    $(root).append("""<div class="noclick"></div>""")

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
      @option('select', 'chartstyle', "Chart style", options: {bar: 'Bar', pie: 'Pie'})
      @option('select', 'legend', "Legend position", options: {right: 'Right', bottom: 'Bottom'})
      @option('font', 'font', "Font")
      @option('color', 'color1', "Present")
      @option('color', 'color2', "Late")
      @option('color', 'color3', "Authorised")
      @option('color', 'color4', "Unauthorised")
    ]

  drawChart: (root) =>

    colors = {}
    colors["#{@_label1} #{@attendance.present}%"] = @style.color1
    colors["#{@_label2} #{@attendance.late}%"] = @style.color2
    colors["#{@_label3} #{@attendance.authorised}%"] = @style.color3
    colors["#{@_label4} #{@attendance.unauthorised}%"] = @style.color4

    if @style.chartstyle == 'pie'
      chartType = 'pie'
    else
      chartType = 'bar'

    @chart = c3.generate(
      bindto: root,
      data:
        order: 'asc'
        columns: [
          [ "#{@_label1} #{@attendance.present || 0}%", parseFloat(@attendance.present) / 100 ]
          [ "#{@_label2} #{@attendance.late || 0}%", parseFloat(@attendance.late) / 100 ]
          [ "#{@_label3} #{@attendance.authorised || 0}%", parseFloat(@attendance.authorised) / 100 ]
          [ "#{@_label4} #{@attendance.unauthorised || 0}%", parseFloat(@attendance.unauthorised) / 100 ]
        ]
        type: chartType
        groups: [
          [
            "#{@_label1} #{@attendance.present || 0}%",
            "#{@_label2} #{@attendance.late || 0}%",
            "#{@_label3} #{@attendance.authorised || 0}%",
            "#{@_label4} #{@attendance.unauthorised || 0}%"
          ]]
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
        position: @style.legend
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

    $(root).find('.tick').css('font-family', @style.font)
    $(root).find('.c3-legend-item').css('font-family', @style.font)

  color1: @property('style', 'color1')
  color2: @property('style', 'color2')
  color3: @property('style', 'color3')
  color4: @property('style', 'color4')
  chartstyle: @property('style', 'chartstyle')
  legend: @property('style', 'legend')
  font: @property('style', 'font')
  label1: @property('_label1')
  label2: @property('_label2')
  label3: @property('_label3')
  label4: @property('_label4')

  serialize: ->
    {columns: @columns, style: @style, options: @options, labels: [@_label1,@_label2,@_label3,@_label4]}
