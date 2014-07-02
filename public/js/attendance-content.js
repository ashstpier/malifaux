var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

window.AttendanceContent = (function(_super) {
  __extends(AttendanceContent, _super);

  function AttendanceContent() {
    return AttendanceContent.__super__.constructor.apply(this, arguments);
  }

  AttendanceContent.displayName = "Attendance Chart";

  AttendanceContent.description = "Show a visual representation of student attendance.";

  AttendanceContent.icon = "bell";

  AttendanceContent.prototype.defaultWidth = function() {
    return 400;
  };

  AttendanceContent.prototype.defaultHeight = function() {
    return 200;
  };

  AttendanceContent.prototype.initWithConfig = function(config) {
    return {};
  };

  AttendanceContent.prototype.render_layout = function(data) {
    return $("<div class=\"attendance-widget\"><img src=\"" + (this.chartUrl(data)) + "\"/></div>");
  };

  AttendanceContent.prototype.chartUrl = function(data) {
    var a, params;
    a = data.attendance;
    params = ["cht=p", "chd=t:" + [a.present, a.late, a.authorised, a.nonAuthorised].join(','), "chs=400x200", "chdl=Present%20%28" + a.present + "%25%29|Late%20%28" + a.late + "%25%29|Authorised%20%28" + a.authorised + "%25%29|Unauthorised%20%28" + a.nonAuthorised + "%25%29", "chco=99D953,EBDC1E,EB9F1E,B63242"];
    return "https://chart.googleapis.com/chart?" + (params.join('&amp;'));
  };

  return AttendanceContent;

})(WidgetContent);
