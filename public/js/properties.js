window.Properties = (function() {
  function Properties(designer) {
    this.designer = designer;
    this.el = $("#properties");
    this.selected = null;
    this.designer.on("selection:change", (function(_this) {
      return function() {
        return _this.selectionChanged();
      };
    })(this));
    this.designer.on("selection:moved", (function(_this) {
      return function() {
        return _this.selectionMoved();
      };
    })(this));
  }

  Properties.prototype.render = function() {
    return this.el.append("<div class=\"prop-section prop-layout\">\n  <div>\n    x: <span id=\"prop-value-x\"></span>\n    y: <span id=\"prop-value-y\"></span>\n    width: <span id=\"prop-value-width\"></span>\n    height: <span id=\"prop-value-height\"></span>\n  </div>\n</div>\n\n<div class=\"prop-section prop-options\">\n  options\n</div>");
  };

  Properties.prototype.selectionChanged = function() {
    this.selected = this.designer.currentEditWidget;
    return this.updateLayoutValues();
  };

  Properties.prototype.selectionMoved = function() {
    return this.updateLayoutValues();
  };

  Properties.prototype.updateLayoutValues = function() {
    this.el.find('prop-value-x').html(this.selected.x());
    this.el.find('prop-value-y').html(this.selected.y());
    this.el.find('prop-value-width').html(this.selected.width());
    return this.el.find('prop-value-height').html(this.selected.height());
  };

  return Properties;

})();
