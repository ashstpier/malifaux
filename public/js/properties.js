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
    this.el.append("<section class=\"prop-section prop-layout\">\n  <h3 class=\"prop-section-header\">Layout</h3>\n  <div class=\"prop-content\">\n    <label for=\"prop-value-x\">x</label>\n    <input type=\"text\" id=\"prop-value-x\" class=\"prop-input prop-coord-input\" data-fn=\"x\" />\n    <label for=\"prop-value-y\">y</label>\n    <input type=\"text\" id=\"prop-value-y\" class=\"prop-input prop-coord-input\" data-fn=\"y\" />\n    <label for=\"prop-value-width\">width</label>\n    <input type=\"text\" id=\"prop-value-width\" class=\"prop-input prop-coord-input\" data-fn=\"width\" />\n    <label for=\"prop-value-height\">height</label>\n    <input type=\"text\" id=\"prop-value-height\" class=\"prop-input prop-coord-input\"  data-fn=\"height\"/>\n  </div>\n</section>\n\n<section class=\"prop-section prop-appearance\">\n  <h3 class=\"prop-section-header\">Appearance</h3>\n  <div class=\"prop-content\">\n    no selection\n  </div>\n</section>");
    this.bindEvents();
    return this.updateLayoutValues();
  };

  Properties.prototype.bindEvents = function() {
    return this.el.find('.prop-layout .prop-input').change((function(_this) {
      return function(e) {
        var input;
        input = $(e.target);
        return _this.selected[input.data('fn')](input.val());
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
      return this.selected.bind("widget:move", this.selectionMoved);
    }
  };

  Properties.prototype.selectionMoved = function() {
    return this.updateLayoutValues();
  };

  Properties.prototype.updateLayoutValues = function() {
    if (this.selected) {
      this.enable();
    } else {
      this.disable();
    }
    this.el.find('#prop-value-x').val(this.x());
    this.el.find('#prop-value-y').val(this.y());
    this.el.find('#prop-value-width').val(this.width());
    return this.el.find('#prop-value-height').val(this.height());
  };

  Properties.prototype.enable = function() {
    this.el.removeClass('disabled');
    return this.el.find('.prop-input').prop('disabled', false);
  };

  Properties.prototype.disable = function() {
    this.el.addClass('disabled');
    return this.el.find('.prop-input').prop('disabled', true);
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
