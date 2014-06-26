window.Template = (function() {
  Template.load = function(templateName, cb) {
    return TemplateStore.get(templateName, (function(_this) {
      return function(templateData) {
        var template;
        templateData.layout || (templateData.layout = []);
        console.log(templateData);
        template = new Template(templateData);
        template.key = templateName;
        template.name = templateData.name;
        return cb(template);
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
      orientation: 'portrait'
    });
    template.save();
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
  }

  Template.prototype.render = function(mode, data) {
    var widgetConfig, _i, _len, _ref, _results;
    _ref = this.layout;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      widgetConfig = _ref[_i];
      _results.push(this.addWidget(widgetConfig, mode, data));
    }
    return _results;
  };

  Template.prototype.addWidget = function(widgetConfig, mode, data) {
    var widget;
    widget = new Widget(widgetConfig, data);
    this.widgets.push(widget);
    return this.page.append(widget.render(mode));
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

  Template.prototype.save = function() {
    var data;
    data = this.serialize();
    data.key = this.key;
    return TemplateStore.save(this.key, data);
  };

  Template.prototype.serialize = function() {
    var data, layout, widget;
    layout = (function() {
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
      orientation: this.orientation
    };
    return data;
  };

  return Template;

})();
