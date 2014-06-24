window.API = {
  _config: null,
  config: function(cb) {
    if (this._config) {
      cb(this._config);
    }
    return $.get("/configuration.json", (function(_this) {
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
    if (this._students[id]) {
      cb(this._students[id]);
    }
    return $.get("/" + id + ".json", (function(_this) {
      return function(data) {
        _this._students[id] = data;
        return cb(data);
      };
    })(this));
  },
  assessmentPoints: function() {
    return this._config.assessmentPoints;
  }
};
