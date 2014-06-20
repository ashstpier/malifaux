window.Template = (function() {
  Template.load = function(templateName) {
    var templateData;
    templateData = store.get(templateName);
    if (templateData === void 0) {
      templateData = {
        layout: []
      };
    }
    return new Template(templateData);
  };

  Template["delete"] = function(templateName) {
    return store.remove(templateName);
  };

  function Template(description) {
    this.page = $('#page');
    this.widgets = [];
    this.layout = description.layout;
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

  Template.prototype.save = function(templateName) {
    return store.set(templateName, this.serialize());
  };

  Template.prototype.serialize = function() {
    var layout, widget;
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
    return {
      layout: layout
    };
  };

  return Template;

})();
