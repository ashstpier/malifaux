window.Template = (function() {
  Template.TEMPLATE_STORE = new RemoteTemplateStore();

  Template.load = function(templateName, cb) {
    return this.TEMPLATE_STORE.get(templateName, (function(_this) {
      return function(templateData) {
        var template;
        templateData.key = templateName;
        if (templateData === void 0) {
          templateData = {
            layout: []
          };
        }
        template = new Template(templateData);
        template.key = templateName;
        template.name = templateData.name;
        return cb(template);
      };
    })(this));
  };

  Template["delete"] = function(templateKey) {
    return this.TEMPLATE_STORE["delete"](templateKey);
  };

  Template.create = function() {
    var template;
    template = new Template();
    template.key = utils.guid();
    template.name = "Untitled Template";
    template.save();
    return template;
  };

  Template.all = function(cb) {
    return this.TEMPLATE_STORE.all(cb);
  };

  function Template(description) {
    description || (description = {
      layout: {}
    });
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

  Template.prototype.save = function() {
    var data;
    data = this.serialize();
    data.key = this.key;
    return Template.TEMPLATE_STORE.save(this.key, data);
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
      layout: layout,
      name: this.name
    };
  };

  Template.prototype.isNew = function() {
    return true;
  };

  return Template;

})();
