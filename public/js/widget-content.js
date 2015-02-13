window.WidgetContent = (function() {
  WidgetContent.className = "WidgetContent";

  WidgetContent.displayName = "A Widget";

  WidgetContent.description = "An element that can be added to the page.";

  WidgetContent.icon = "wrench";

  WidgetContent.active = true;

  WidgetContent.property = function(obj, key) {
    if (key == null) {
      key = null;
    }
    return function(val) {
      var old, read, write;
      read = (function(_this) {
        return function() {
          if (key) {
            return _this[obj][key];
          } else {
            return _this[obj];
          }
        };
      })(this);
      write = (function(_this) {
        return function(v) {
          if (key) {
            return _this[obj][key] = v;
          } else {
            return _this[obj] = v;
          }
        };
      })(this);
      if (val != null) {
        old = read();
        write(val);
        this.redraw();
        return Designer.history.push(this, 'runPropertyUndoSetter', {
          fn: write,
          v: old
        }, {
          fn: write,
          v: val
        });
      } else {
        return read();
      }
    };
  };

  WidgetContent.prototype.className = function() {
    return this.constructor.className;
  };

  WidgetContent.prototype.runPropertyUndoSetter = function(o) {
    o.fn.call(this, o.v);
    Designer.select(this.widget);
    return this.redraw();
  };

  function WidgetContent(widget, config) {
    this.widget = widget;
    if (config == null) {
      config = {};
    }
    this.initWithConfig(config);
  }

  WidgetContent.prototype.render = function(mode, data) {
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

  WidgetContent.prototype.redraw = function() {
    return this.widget.redraw();
  };

  WidgetContent.prototype.bindEvents = function(el) {};

  WidgetContent.prototype.cancelEditing = function() {
    return Designer.clearEditWidget();
  };

  WidgetContent.prototype.serialize = function() {
    return {};
  };

  WidgetContent.prototype.saveConfig = function() {
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

  WidgetContent.prototype.editable = function() {
    return false;
  };

  WidgetContent.prototype.assessmentPoints = function() {
    var key, obj, points;
    return points = (function() {
      var _ref, _results;
      _ref = API.assessmentPoints();
      _results = [];
      for (key in _ref) {
        obj = _ref[key];
        _results.push($.extend({}, obj, {
          code: key
        }));
      }
      return _results;
    })();
  };

  WidgetContent.prototype.metrics = function() {
    return API.metrics();
  };

  WidgetContent.prototype.option = function(type, key, label, config) {
    if (label == null) {
      label = key;
    }
    if (config == null) {
      config = {};
    }
    return new OptionRenderer(this, type, key, label, config).render(this.style);
  };

  WidgetContent.prototype.styleString = function(styles) {
    var name, value;
    return ((function() {
      var _results;
      _results = [];
      for (name in styles) {
        value = styles[name];
        if (value != null) {
          _results.push("" + name + ": " + value + ";");
        }
      }
      return _results;
    })()).join(" ").replace(/"/gm, '&quot;');
  };

  WidgetContent.prototype.setAspectRatio = function(ratio) {
    if (ratio == null) {
      ratio = true;
    }
    return this.widget.setAspectRatio(ratio);
  };

  WidgetContent.prototype.renderAppearanceOptions = function() {
    return false;
  };

  WidgetContent.prototype.renderConfigOptions = function() {
    return false;
  };

  WidgetContent.prototype.placeholderWithLabel = function(label, html) {
    var blank;
    if (html == null) {
      html = true;
    }
    blank = html ? '&nbsp;' : '';
    if (this.widget.currentMode === 'display') {
      return blank;
    }
    if (label === null || label === void 0 || label.length === 0) {
      return blank;
    }
    if (html) {
      return "<span class=\"no-value\">" + label + "</span>";
    } else {
      return "[?:" + label + "]";
    }
  };

  return WidgetContent;

})();

window.OptionRenderer = (function() {
  function OptionRenderer(receiver, type, key, label, config) {
    this.receiver = receiver;
    this.type = type;
    this.key = key;
    this.label = label;
    this.config = config != null ? config : {};
  }

  OptionRenderer.prototype.render = function(styles) {
    return "<div class=\"prop-option\">\n  <label class=\"prop-label\" for=\"" + this.key + "\">" + this.label + "</label>\n  " + (this.renderInput(styles)) + "\n  " + (this.renderHint()) + "\n</div>";
  };

  OptionRenderer.prototype.renderHint = function() {
    if (!this.config.hint) {
      return '';
    }
    return "<p class=\"prop-hint\">" + this.config.hint + "</p>";
  };

  OptionRenderer.prototype.renderInput = function(styles) {
    this.value = this.receiver[this.key].call(this.receiver);
    switch (this.type) {
      case 'font':
        return this.renderFontInput(styles);
      case 'size':
        return this.renderSizeInput(styles);
      case 'select':
        return this.renderSelectInput(styles);
      case 'checkbox':
        return this.renderCheckboxInput(styles);
      default:
        return "<input name=\"" + this.key + "\" class=\"prop-input\" name=\"" + this.key + "\" type=\"" + this.type + "\" value=\"" + this.value + "\" data-fn=\"" + this.key + "\" />";
    }
  };

  OptionRenderer.prototype.renderFontInput = function(styles) {
    var desc, fontName, options;
    options = (function() {
      var _ref, _results;
      _ref = utils.fontMap;
      _results = [];
      for (fontName in _ref) {
        desc = _ref[fontName];
        _results.push("<option " + (this.value === fontName ? 'selected' : '') + ">" + fontName + "</option>");
      }
      return _results;
    }).call(this);
    return "<select name=\"" + this.key + "\" class=\"prop-input\" data-fn=\"" + this.key + "\">\n  " + (options.join("\n")) + "\n</select>";
  };

  OptionRenderer.prototype.renderSizeInput = function(styles) {
    var options, size, sizeName;
    options = (function() {
      var _ref, _results;
      _ref = utils.sizeMap;
      _results = [];
      for (sizeName in _ref) {
        size = _ref[sizeName];
        _results.push("<option " + (this.value === sizeName ? 'selected' : '') + ">" + sizeName + "</option>");
      }
      return _results;
    }).call(this);
    return "<select name=\"" + this.key + "\" class=\"prop-input\" data-fn=\"" + this.key + "\">\n  " + (options.join("\n")) + "\n</select>";
  };

  OptionRenderer.prototype.renderSelectInput = function(styles) {
    var group, grouped, item, items, key, options, optionsArray, renderOption, value;
    grouped = false;
    if ($.isArray(this.config.options)) {
      optionsArray = this.config.options;
    } else if ($.isArray(this.config.options[Object.keys(this.config.options)[0]])) {
      grouped = true;
    } else {
      optionsArray = (function() {
        var _ref, _results;
        _ref = this.config.options;
        _results = [];
        for (key in _ref) {
          value = _ref[key];
          _results.push([key, value]);
        }
        return _results;
      }).call(this);
    }
    renderOption = function(item) {
      return "<option value=\"" + item[0] + "\" " + (this.value === item[0] ? 'selected' : '') + ">" + item[1] + "</option>";
    };
    if (grouped) {
      options = (function() {
        var _ref, _results;
        _ref = this.config.options;
        _results = [];
        for (group in _ref) {
          items = _ref[group];
          items = ((function() {
            var _i, _len, _results1;
            _results1 = [];
            for (_i = 0, _len = items.length; _i < _len; _i++) {
              item = items[_i];
              _results1.push(renderOption(item));
            }
            return _results1;
          })()).join("\n");
          _results.push("<optgroup label=\"" + group + "\">" + items + "</optgroup>");
        }
        return _results;
      }).call(this);
    } else {
      options = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = optionsArray.length; _i < _len; _i++) {
          item = optionsArray[_i];
          _results.push(renderOption(item));
        }
        return _results;
      })();
    }
    return "<select name=\"" + this.key + "\" class=\"prop-input\" data-fn=\"" + this.key + "\">\n  " + (options.join("\n")) + "\n</select>";
  };

  OptionRenderer.prototype.renderCheckboxInput = function(styles) {
    return "<input name=\"" + this.key + "\" class=\"prop-input prop-input-checkbox\" name=\"" + this.key + "\" type=\"" + this.type + "\" value=\"1\" data-fn=\"" + this.key + "\"\n" + (this.value ? 'checked="checked"' : '') + " />";
  };

  return OptionRenderer;

})();
