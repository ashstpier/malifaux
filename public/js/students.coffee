window.Students = {

  STUDENTS_URL: "/configuration.json"

  setStudents: (students) ->
    $.each students, (key, value) ->
      $('#students')
        .append($("<option></option>")
        .attr("value", key)
        .text(value)); 

  runReport: (studentId) ->
    window.location.href = "/report.html?studentid=#{studentId}"

  init: ->
    $.get @STUDENTS_URL, (feedData) => @setStudents(feedData["students"])

    $('#run').click => 
      studentId = $('#students option:selected').attr("value")
      @runReport(studentId)
}

$ -> Students.init()