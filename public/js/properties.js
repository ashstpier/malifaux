var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

window.Properties = (function() {
  function Properties(designer) {
    this.designer = designer;
    this.selectionMoved = __bind(this.selectionMoved, this);
    this.el = $("#properties");
    this.selected = null;
    this.designer.bind("selection:change", (function(_this) {
      return function(newSelection) {
        return _this.selectionChanged(newSelection);
      };
    })(this));
  }

  Properties.prototype.render = function() {
    this.el.append("<h2 class=\"prop-selection\"></h2>\n<section class=\"prop-section prop-layout\">\n  <h3 class=\"prop-section-header\">Layout</h3>\n  <div class=\"prop-content\">\n    <label for=\"prop-value-x\">x</label>\n    <input type=\"text\" id=\"prop-value-x\" class=\"prop-input prop-coord-input\" data-fn=\"x\" />\n    <label for=\"prop-value-y\">y</label>\n    <input type=\"text\" id=\"prop-value-y\" class=\"prop-input prop-coord-input\" data-fn=\"y\" />\n    <label for=\"prop-value-width\">width</label>\n    <input type=\"text\" id=\"prop-value-width\" class=\"prop-input prop-coord-input\" data-fn=\"width\" />\n    <label for=\"prop-value-height\">height</label>\n    <input type=\"text\" id=\"prop-value-height\" class=\"prop-input prop-coord-input\"  data-fn=\"height\"/>\n  </div>\n</section>\n\n<section class=\"prop-section prop-config\"></section>\n<section class=\"prop-section prop-appearance\"></section>");
    this.bindEvents();
    this.updateLayoutValues();
    return this.disable();
  };

  Properties.prototype.bindEvents = function() {
    return this.el.on('input', '.prop-input', (function(_this) {
      return function(e) {
        var input;
        input = $(e.target);
        return _this.selected.content[input.data('fn')].call(_this.selected.content, input.val());
      };
    })(this));
  };

  Properties.prototype.selectionChanged = function(newSelection) {
    if (this.selected === newSelection) {
      return;
    }
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
    return this.updateLayoutValues();
  };

  Properties.prototype.updateLayoutValues = function() {
    this.el.find('#prop-value-x').val(this.x());
    this.el.find('#prop-value-y').val(this.y());
    this.el.find('#prop-value-width').val(this.width());
    return this.el.find('#prop-value-height').val(this.height());
  };

  Properties.prototype.enable = function() {
    this.el.removeClass('disabled');
    this.el.find('.prop-input').prop('disabled', false);
    this.el.find('.prop-selection').text(this.selected.displayName());
    this.setAppearanceOptions();
    return this.setConfigOptions();
  };

  Properties.prototype.disable = function() {
    this.el.addClass('disabled');
    this.el.find('.prop-input').prop('disabled', true);
    this.el.find('.prop-selection').html('Nothing Selected');
    this.clearAppearanceOptions();
    return this.clearConfigOptions();
  };

  Properties.prototype.setAppearanceOptions = function() {
    var options;
    options = this.selected.renderAppearanceOptions();
    if (options === false) {
      return this.clearAppearanceOptions();
    } else {
      return this.el.find('.prop-appearance').html("  <h3 class=\"prop-section-header\">Appearance</h3>\n  <div class=\"prop-content\">\n    " + options + "\n  </div>\n</section>");
    }
  };

  Properties.prototype.clearAppearanceOptions = function() {
    return this.el.find('.prop-appearance').html('');
  };

  Properties.prototype.setConfigOptions = function() {
    var options;
    options = this.selected.renderConfigOptions();
    if (options === false) {
      return this.clearConfigOptions();
    } else {
      return this.el.find('.prop-config').html("  <h3 class=\"prop-section-header\">Configuration</h3>\n  <div class=\"prop-content\">\n    " + options + "\n  </div>\n</section>");
    }
  };

  Properties.prototype.clearConfigOptions = function() {
    return this.el.find('.prop-config').html('');
  };

  Properties.prototype.x = function() {
    var _ref;
    return ((_ref = this.selected) != null ? _ref.x() : void 0) || '';
  };

  Properties.prototype.y = function() {
    var _ref;
    return ((_ref = this.selected) != null ? _ref.y() : void 0) || '';
  };

  Properties.prototype.width = function() {
    var _ref;
    return ((_ref = this.selected) != null ? _ref.width() : void 0) || '';
  };

  Properties.prototype.height = function() {
    var _ref;
    return ((_ref = this.selected) != null ? _ref.height() : void 0) || '';
  };

  return Properties;

})();
