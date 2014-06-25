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
    return new StyleOptionRenderer(type, key, label).render(this.style);
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
    })()).join(" ").replace(/"/gm, '&quot;');
  };

  return WidgetContent;

})();

window.StyleOptionRenderer = (function() {
  function StyleOptionRenderer(type, key, label) {
    this.type = type;
    this.key = key;
    this.label = label;
  }

  StyleOptionRenderer.prototype.render = function(styles) {
    return "<p class=\"style-option\">\n  <label for=\"" + this.key + "\">" + this.label + "</label>\n  " + (this.renderInput(styles)) + "\n</p>";
  };

  StyleOptionRenderer.prototype.renderInput = function(styles) {
    switch (this.type) {
      case 'font':
        return this.renderFontInput(styles);
      case 'size':
        return this.renderSizeInput(styles);
      default:
        return "<input name=\"" + this.key + "\" class=\"style-option\" name=\"" + this.key + "\" type=\"" + this.type + "\" value=\"" + styles[this.key] + "\" />";
    }
  };

  StyleOptionRenderer.prototype.renderFontInput = function(styles) {
    var desc, fontName, options;
    options = (function() {
      var _ref, _results;
      _ref = utils.fontMap;
      _results = [];
      for (fontName in _ref) {
        desc = _ref[fontName];
        _results.push("<option " + (styles[this.key] === fontName ? 'selected' : '') + ">" + fontName + "</option>");
      }
      return _results;
    }).call(this);
    return "<select name=\"" + this.key + "\" class=\"style-option\" name=\"" + this.key + "\">\n  " + (options.join("\n")) + "\n</select>";
  };

  StyleOptionRenderer.prototype.renderSizeInput = function(styles) {
    var options, size, sizeName;
    options = (function() {
      var _ref, _results;
      _ref = utils.sizeMap;
      _results = [];
      for (sizeName in _ref) {
        size = _ref[sizeName];
        _results.push("<option " + (styles[this.key] === sizeName ? 'selected' : '') + ">" + sizeName + "</option>");
      }
      return _results;
    }).call(this);
    return "<select name=\"" + this.key + "\" class=\"style-option\" name=\"" + this.key + "\">\n  " + (options.join("\n")) + "\n</select>";
  };

  return StyleOptionRenderer;

})();
