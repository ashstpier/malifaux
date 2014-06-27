window.API = {
  _config: null,
  config: function(cb) {
    if (this._config) {
      cb(this._config);
    }
    return $.get(CONFIGURATION_ENDPOINTS[utils.environment], (function(_this) {
      return function(data) {
        _this._config = data;
        return cb(data);
      };
    })(this));
  },
  loadConfig: function(cb) {
    return this.config(function() {
      return cb();
    });
  },
  _students: {},
  student: function(id, cb) {
    var extensions, studentUrl;
    if (this._students[id]) {
      cb(this._students[id]);
    }
    extensions = {
      "production": "",
      "development": ".json"
    };
    studentUrl = "" + STUDENT_ENDPOINTS[utils.environment] + "/" + id + extensions[utils.environment];
    return $.get(studentUrl, (function(_this) {
      return function(data) {
        _this._students[id] = data;
        return cb(data);
      };
    })(this));
  },
  assessmentPoints: function() {
    return this._config.assessmentPoints;
  },
  metrics: function() {
    return ["name", "attendance.present", "attendance.late", "attendance.authorised", "attendance.nonAuthorised", "classGroup.classGroupCode", "classGroup.classGroupName", "classGroup.tutors", "year.yearCode", "year.yearName", "year.yearLongName"];
  }
};
