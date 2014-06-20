window.Students = {
  STUDENTS_URL: "/configuration.json",
  setStudents: function(students) {
    return $.each(students, function(key, value) {
      return $('#students').append($("<option></option>").attr("value", key).text(value));
    });
  },
  runReport: function(studentId) {
    return window.location.href = "/report.html?studentid=" + studentId + "&template=my-test-template&debug=1";
  },
  init: function() {
    $.get(this.STUDENTS_URL, (function(_this) {
      return function(feedData) {
        return _this.setStudents(feedData["students"]);
      };
    })(this));
    return $('#run').click((function(_this) {
      return function() {
        var studentId;
        studentId = $('#students option:selected').attr("value");
        return _this.runReport(studentId);
      };
    })(this));
  }
};

$(function() {
  return Students.init();
});
