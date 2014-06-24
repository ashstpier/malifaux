window.Students = {
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
    API.config((function(_this) {
      return function(config) {
        return _this.setStudents(config["students"]);
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
