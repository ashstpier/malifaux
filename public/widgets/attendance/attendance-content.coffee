class window.AttendanceContent extends WidgetContent

  @displayName: "Attendance Chart"
  @description: "Show a visual representation of student attendance."
  @icon:        "bell"

  defaultWidth: -> 400
  defaultHeight: -> 200

  initWithConfig: (config) -> {}

  render_layout: (data) ->
    $("""<div class="attendance-widget"><img src="#{@chartUrl(data)}"/></div>""")

  chartUrl: (data)->
    a = data.attendance
    params = [
      "cht=p"
      "chd=t:" + [a.present, a.late, a.authorised, a.nonAuthorised].join(',')
      "chs=400x200"
      "chdl=Present%20%28#{a.present}%25%29|Late%20%28#{a.late}%25%29|Authorised%20%28#{a.authorised}%25%29|Unauthorised%20%28#{a.nonAuthorised}%25%29"
      "chco=99D953,EBDC1E,EB9F1E,B63242"
    ]
    "https://chart.googleapis.com/chart?#{params.join('&amp;')}"