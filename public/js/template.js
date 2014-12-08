window.Template = (function() {
  Template.clone = function(templateData, cb) {
    return this.deserialize(templateData, function(template) {
      template.key = utils.guid();
      return cb(template);
    });
  };

  Template.load = function(templateName, cb) {
    return TemplateStore.get(templateName, (function(_this) {
      return function(templateData) {
        return _this.deserialize(templateData, cb);
      };
    })(this));
  };

  Template["delete"] = function(templateKey) {
    return TemplateStore["delete"](templateKey);
  };

  Template.create = function() {
    var template;
    template = new Template({
      key: utils.guid(),
      name: "Untitled Template",
      layout: [],
      orientation: 'portrait',
      pagetype: 'student'
    });
    return template;
  };

  Template.all = function(cb) {
    return TemplateStore.all(cb);
  };

  function Template(description) {
    this.page = $('#page');
    this.widgets = [];
    this.key = description.key;
    this.name = description.name;
    this.layout = description.layout;
    this.orientation = description.orientation;
    this.pagetype = description.pagetype;
  }

  Template.prototype.render = function(mode, data, subject) {
    var widgetConfig, _i, _len, _ref;
    if (data == null) {
      data = null;
    }
    if (subject == null) {
      subject = null;
    }
    _ref = this.layout;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      widgetConfig = _ref[_i];
      this.addWidget(widgetConfig, mode, data, subject);
    }
    return this.layout = [];
  };

  Template.prototype.addWidget = function(widgetConfig, mode, data, subject) {
    var widget;
    if (data == null) {
      data = null;
    }
    if (subject == null) {
      subject = null;
    }
    data = data || utils.fakeStudentData();
    subject = subject || utils.subject(this.pagetype);
    widget = widgetConfig.isWidget ? widgetConfig : new Widget(widgetConfig, data, subject);
    this.widgets.push(widget);
    this.page.append(widget.render(mode));
    return widget;
  };

  Template.prototype.redraw = function() {
    var widget, _i, _len, _ref, _results;
    _ref = this.widgets;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      widget = _ref[_i];
      _results.push(widget.redraw());
    }
    return _results;
  };

  Template.prototype.removeWidget = function(widget) {
    var w;
    widget.remove();
    return this.widgets = (function() {
      var _i, _len, _ref, _results;
      _ref = this.widgets;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        w = _ref[_i];
        if (w.guid !== widget.guid) {
          _results.push(w);
        }
      }
      return _results;
    }).call(this);
  };

  Template.prototype.removeAllWidgets = function() {
    var widget, _i, _len, _ref, _results;
    _ref = this.widgets;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      widget = _ref[_i];
      _results.push(this.removeWidget(widget));
    }
    return _results;
  };

  Template.prototype.save = function(cb) {
    var data;
    data = this.serialize();
    data.key = this.key;
    return TemplateStore.save(this.key, data, cb);
  };

  Template.prototype.serialize = function() {
    var data, layout, widget;
    layout = this.layout.length ? this.layout : (function() {
      var _i, _len, _ref, _results;
      _ref = this.widgets;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        widget = _ref[_i];
        _results.push(widget.serialize());
      }
      return _results;
    }).call(this);
    data = {
      layout: layout,
      name: this.name,
      orientation: this.orientation,
      pagetype: this.pagetype,
      screenshot: this.screenshot
    };
    return data;
  };

  Template.deserialize = function(templateData, cb) {
    var template;
    template = new Template(templateData);
    return cb(template);
  };

  return Template;

})();
