window.WidgetContent = (function() {
  function WidgetContent(config) {
    if (config == null) {
      config = {};
    }
    null;
  }

  WidgetContent.prototype.render = function(mode, data) {
    if (mode == null) {
      mode = 'layout';
    }
    if (data == null) {
      data = utils.fakeStudentData();
    }
    this.el = this["render_" + mode].call(this, data);
    if (mode !== 'display') {
      this.bindEvents(this.el);
    }
    return this.el;
  };

  WidgetContent.prototype.render_layout = function(data) {
    return this.el = $("<div></div>");
  };

  WidgetContent.prototype.render_edit = function(data) {
    return this.render_layout(data);
  };

  WidgetContent.prototype.render_display = function(data) {
    return this.render_layout(data);
  };

  WidgetContent.prototype.bindEvents = function(el) {};

  WidgetContent.prototype.cancelEditing = function() {
    return Designer.clearEditWidget();
  };

  WidgetContent.prototype.serialize = function() {
    return {};
  };

  WidgetContent.prototype.get = function(param, fallback) {
    if (param != null) {
      return param;
    } else {
      return fallback;
    }
  };

  WidgetContent.prototype.defaultWidth = function() {
    return 160;
  };

  WidgetContent.prototype.defaultHeight = function() {
    return 160;
  };

  WidgetContent.prototype.assessmentPoints = function() {
    return API.assessmentPoints();
  };

  WidgetContent.prototype.styleOption = function(type, key, label) {
    if (label == null) {
      label = key;
    }
    return "<p>\n  <label>\n    " + label + ":\n    <input class=\"style-option\" name=\"" + key + "\" type=\"text\" value=\"" + this.style[key] + "\" />\n  </label>\n</p>";
  };

  WidgetContent.prototype.styleString = function(styles) {
    var name, value;
    return ((function() {
      var _results;
      _results = [];
      for (name in styles) {
        value = styles[name];
        _results.push("" + name + ": " + value + ";");
      }
      return _results;
    })()).join(" ");
  };

  return WidgetContent;

})();
