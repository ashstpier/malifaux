window.Students = {

  STUDENTS_URL: "/configuration.json"

  setStudents: (students) ->
    $.each students, (key, value) ->
      $('#students')
        .append($("<option></option>")
        .attr("value", key)
        .text(value))

  setTemplates: (templates) ->
    $.each templates, (key, value) ->
      $('#templates')
        .append($("<option></option>")
        .attr("value", key)
        .text(value.name))

  runReport: (studentId, templateKey) ->
    window.location.href = "/report.html?studentid=#{studentId}&template=#{templateKey}&debug=1"

  init: ->
    $.get @STUDENTS_URL, (feedData) => @setStudents(feedData["students"])
    Template.all (templates) => @setTemplates(templates)

    $('#run').click => 
      studentId = $('#students option:selected').attr("value")
      templateKey = $('#templates option:selected').attr("value")
      @runReport(studentId, templateKey)
}

$ -> Students.init()