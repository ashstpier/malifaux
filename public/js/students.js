window.Students = {
  STUDENTS_URL: "/configuration.json",
  setStudents: function(students) {
    return $.each(students, function(key, value) {
      return $('#students').append($("<option></option>").attr("value", key).text(value));
    });
  },
  setTemplates: function(templates) {
    return $.each(templates, function(key, value) {
      return $('#templates').append($("<option></option>").attr("value", key).text(value.name));
    });
  },
  runReport: function(studentId, templateKey) {
    return window.location.href = "/report.html?studentid=" + studentId + "&template=" + templateKey + "&debug=1";
  },
  init: function() {
    $.get(this.STUDENTS_URL, (function(_this) {
      return function(feedData) {
        return _this.setStudents(feedData["students"]);
      };
    })(this));
    Template.all((function(_this) {
      return function(templates) {
        return _this.setTemplates(templates);
      };
    })(this));
    return $('#run').click((function(_this) {
      return function() {
        var studentId, templateKey;
        studentId = $('#students option:selected').attr("value");
        templateKey = $('#templates option:selected').attr("value");
        return _this.runReport(studentId, templateKey);
      };
    })(this));
  }
};

$(function() {
  return Students.init();
});
