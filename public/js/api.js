window.API = {
  _config: null,
  config: function(cb) {
    if (this._config) {
      cb(this._config);
    }
    return $.get(CONFIGURATION_ENDPOINTS[environment.name], (function(_this) {
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
    studentUrl = "" + STUDENT_ENDPOINTS[environment.name] + "/" + id + extensions[environment.name];
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
    return this._config.data;
  },
  subjects: function() {
    return this._config.subjects;
  },
  sortedSubjects: function() {
    var code, name;
    return ((function() {
      var _ref, _results;
      _ref = this.subjects();
      _results = [];
      for (code in _ref) {
        name = _ref[code];
        _results.push([code, name]);
      }
      return _results;
    }).call(this)).sort((function(_this) {
      return function(a, b) {
        if (a[1] >= b[1]) {
          return 1;
        } else {
          return -1;
        }
      };
    })(this));
  }
};
