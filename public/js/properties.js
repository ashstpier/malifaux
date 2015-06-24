var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

window.Properties = (function() {
  function Properties(designer) {
    this.designer = designer;
    this.cachedSelector = bind(this.cachedSelector, this);
    this.updateLayoutValues = bind(this.updateLayoutValues, this);
    this.selectionMoved = bind(this.selectionMoved, this);
    this.el = $("#properties");
    this.meta = $("#meta");
    this.selected = null;
    this.designer.bind("selection:change", (function(_this) {
      return function(newSelection) {
        return _this.selectionChanged(newSelection);
      };
    })(this));
    this.designer.bind("sidebar:redraw", (function(_this) {
      return function() {
        return _this.redraw();
      };
    })(this));
  }

  Properties.prototype.render = function() {
    this.el.append("<h2 class=\"prop-selection\"></h2>\n<div id=\"properties-tabs\" class=\"tabs\">\n  <nav>\n    <ul>\n      <li><a href=\"#style-tab\">Style</a></li>\n      <li><a href=\"#data-tab\">Configuration</a></li>\n    </ul>\n  </nav>\n  <div class=\"tab-wrapper\">\n    <div id=\"style-tab\" class=\"tab-content\">\n      <section class=\"prop-section prop-appearance\"></section>\n    </div>\n    <div id=\"data-tab\" class=\"tab-content\">\n      <section class=\"prop-section prop-config\"></section>\n    </div>\n  </div>\n</div>\n<section class=\"prop-section prop-page-options\">\n  <h3 class=\"prop-section-header\">Options</h3>\n  <div class=\"prop-content\">\n    <form id=\"orientation\" class=\"prop-form\">\n      <h4 class=\"prop-option-header\">Orientation</h4>\n      <label class=\"prop-block-label\">\n        <input type=\"radio\" name=\"orientation\" value=\"portrait\">\n        Portrait\n      </label>\n      <label class=\"prop-block-label\">\n        <input type=\"radio\" name=\"orientation\" value=\"landscape\">\n        Landscape\n      </label>\n    </form>\n    <form id=\"pagetype\" class=\"prop-form\">\n      <h4 class=\"prop-option-header\">Report Style</h4>\n      <label class=\"prop-block-label\">\n        <input type=\"radio\" name=\"pagetype\" value=\"student\">\n        Student per page\n      </label>\n      <label class=\"prop-block-label\">\n        <input type=\"radio\" name=\"pagetype\" value=\"subject\">\n        Subject per page\n      </label>\n    </form>\n  </div>\n</section>");
    this.meta.append("<label for=\"prop-value-x\">x:</label>\n<input type=\"number\" step=\"1\" id=\"prop-value-x\" class=\"prop-coord-input\" data-fn=\"x\" />\n<label for=\"prop-value-y\">y:</label>\n<input type=\"number\" step=\"1\" id=\"prop-value-y\" class=\"prop-coord-input\" data-fn=\"y\" />\n<label for=\"prop-value-width\">width:</label>\n<input type=\"number\" step=\"1\" id=\"prop-value-width\" class=\"prop-coord-input\" data-fn=\"width\" />\n<label for=\"prop-value-height\">height:</label>\n<input type=\"number\" step=\"1\" id=\"prop-value-height\" class=\"prop-coord-input\"  data-fn=\"height\"/>\n<div class=\"ordering float-right\">\n  <label for=\"prop-value-ordering\">ordering:</label>\n  <select id='prop-value-ordering' class='prop-coord-select' data-fn=\"ordering\">\n    <option></option>\n    <option value=\"setWidgetToBack\">Send to back</option>\n    <option value=\"setWidgetBackOne\">Send backward</option>\n    <option value=\"setWidgetForwardOne\">Bring forward</option>\n    <option value=\"setWidgetToFront\">Bring to front</option>\n  </select>\n</div>");
    this.bindEvents();
    this.updateLayoutValues();
    return this.disable();
  };

  Properties.prototype.bindEvents = function() {
    this.meta.on('input', '.prop-coord-input', (function(_this) {
      return function(e) {
        var input;
        input = $(e.target);
        return _this.selected[input.data('fn')].call(_this.selected, input.val());
      };
    })(this));
    this.meta.on('change', '.prop-coord-select', (function(_this) {
      return function(e) {
        var input;
        input = $(e.target);
        _this.selected[input.data('fn')].call(_this.selected, input.val());
        return input.val('');
      };
    })(this));
    this.el.on('input', 'input.prop-input', (function(_this) {
      return function(e) {
        var input;
        input = $(e.target);
        return _this.selected.content[input.data('fn')].call(_this.selected.content, input.val());
      };
    })(this));
    this.el.on('change', 'select.prop-input', (function(_this) {
      return function(e) {
        var input;
        input = $(e.target);
        return _this.selected.content[input.data('fn')].call(_this.selected.content, input.val());
      };
    })(this));
    return this.el.on('change', '.prop-input-checkbox', (function(_this) {
      return function(e) {
        var input;
        input = $(e.target);
        return _this.selected.content[input.data('fn')].call(_this.selected.content, input.is(":checked"));
      };
    })(this));
  };

  Properties.prototype.selectionChanged = function(newSelection) {
    if (this.selected) {
      this.selected.unbind("widget:move", this.selectionMoved);
    }
    this.selected = newSelection;
    this.updateLayoutValues();
    if (this.selected) {
      this.selected.bind("widget:move", this.selectionMoved);
      return this.enable();
    } else {
      return this.disable();
    }
  };

  Properties.prototype.selectionMoved = function() {
    this.throttledUpdateLayoutValues();
    return true;
  };

  Properties.prototype.updateLayoutValues = function() {
    this.cachedSelector('#prop-value-x').val(this.x());
    this.cachedSelector('#prop-value-y').val(this.y());
    this.cachedSelector('#prop-value-width').val(this.width());
    this.cachedSelector('#prop-value-height').val(this.height());
    return this.cachedSelector('#prop-value-z-index').val(this.zIndex());
  };

  Properties.prototype.throttledUpdateLayoutValues = _.throttle(Properties.prototype.updateLayoutValues, 300);

  Properties.prototype.cachedSelector = function(sel) {
    if (!this._elCache) {
      this._elCache = {};
    }
    this._elCache[sel] = this.meta.find(sel);
    return this._elCache[sel];
  };

  Properties.prototype.redraw = function() {
    this.setAppearanceOptions();
    return this.setConfigOptions();
  };

  Properties.prototype.enable = function() {
    this.el.find('.prop-page-options').hide();
    this.el.find('.prop-layout').show();
    this.el.removeClass('disabled');
    this.el.find('.prop-input').prop('disabled', false);
    this.el.find('.prop-selection').text(this.selected.displayName());
    this.el.find('.tabs').show();
    this.meta.show();
    return this.redraw();
  };

  Properties.prototype.disable = function() {
    this.el.find('.prop-layout').hide();
    this.el.find('.prop-page-options').show();
    this.el.find('.prop-input').prop('disabled', true);
    this.el.find('.prop-selection').html('Page');
    this.el.find('.tabs').hide();
    this.meta.hide();
    this.clearAppearanceOptions();
    return this.clearConfigOptions();
  };

  Properties.prototype.setAppearanceOptions = function() {
    var appearance, o, options;
    options = this.selected.renderAppearanceOptions();
    if (options === false) {
      return this.clearAppearanceOptions();
    } else {
      if (!$.isArray(options)) {
        options = [options];
      }
      options = (function() {
        var i, len, results;
        results = [];
        for (i = 0, len = options.length; i < len; i++) {
          o = options[i];
          if (typeof o === 'string') {
            results.push($(o));
          } else {
            results.push(o);
          }
        }
        return results;
      })();
      appearance = this.el.find('.prop-appearance');
      appearance.html("  <h3 class=\"prop-section-header\">Appearance</h3>\n  <div class=\"prop-content\">\n  </div>\n</section>");
      return appearance.find('.prop-content').append(options);
    }
  };

  Properties.prototype.clearAppearanceOptions = function() {
    return this.el.find('.prop-appearance').html('');
  };

  Properties.prototype.setConfigOptions = function() {
    var config, i, len, o, option, options, results;
    options = this.selected.renderConfigOptions();
    if (options === false) {
      return this.clearConfigOptions();
    } else {
      if (!$.isArray(options)) {
        options = [options];
      }
      options = (function() {
        var i, len, results;
        results = [];
        for (i = 0, len = options.length; i < len; i++) {
          o = options[i];
          if (typeof o === 'string') {
            results.push($(o));
          } else {
            results.push(o);
          }
        }
        return results;
      })();
      config = this.el.find('.prop-config');
      config.html("  <h3 class=\"prop-section-header\">Configuration</h3>\n  <div class=\"prop-content\">\n  </div>\n</section>");
      results = [];
      for (i = 0, len = options.length; i < len; i++) {
        option = options[i];
        results.push(config.find('.prop-content').append(option));
      }
      return results;
    }
  };

  Properties.prototype.clearConfigOptions = function() {
    return this.el.find('.prop-config').html('');
  };

  Properties.prototype.x = function() {
    var ref;
    return ((ref = this.selected) != null ? ref.x() : void 0) || '0';
  };

  Properties.prototype.y = function() {
    var ref;
    return ((ref = this.selected) != null ? ref.y() : void 0) || '0';
  };

  Properties.prototype.zIndex = function() {
    var ref;
    return ((ref = this.selected) != null ? ref.zIndex() : void 0) || '';
  };

  Properties.prototype.width = function() {
    var ref;
    return ((ref = this.selected) != null ? ref.width() : void 0) || '0';
  };

  Properties.prototype.height = function() {
    var ref;
    return ((ref = this.selected) != null ? ref.height() : void 0) || '0';
  };

  return Properties;

})();
