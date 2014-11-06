window.Report = {
  init: function() {
    return Widget.loadAll((function(_this) {
      return function() {
        return API.loadConfig(function() {
          _this.studentId = window.student_id || utils.querystring('studentid');
          _this.templateName = window.template || utils.querystring('template');
          _this.debug = utils.querystring('debug') === '1';
          return Template.load(_this.templateName, function(template) {
            _this.template = template;
            return API.student(_this.studentId, function(data) {
              return _this.render(data);
            });
          });
        });
      };
    })(this));
  },
  renderDebug: function(data) {
    if (this.debug) {
      return $('body').append("<div style=\"height:1344px;\" />\n<hr/>\n<h3>Student Data</h3>\n<pre>" + (JSON.stringify(data, null, 2)) + "</pre>\n<hr/>\n<h3>Template Data</h3>\n<pre><code>" + (utils.escape(JSON.stringify(this.template.description, null, 2))) + "</code></pre>");
    }
  },
  render: function(data) {
    this.template.render('display', data);
    if (this.debug) {
      return this.renderDebug(data);
    }
  }
};

$(function() {
  return Report.init();
});
