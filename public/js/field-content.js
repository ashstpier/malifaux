var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

window.FieldContent = (function(_super) {
  __extends(FieldContent, _super);

  function FieldContent() {
    return FieldContent.__super__.constructor.apply(this, arguments);
  }

  FieldContent.displayName = "Dynamic Text";

  FieldContent.description = "Pull a text field from a student record and style it for display.";

  FieldContent.icon = "nameplate";

  FieldContent.prototype.defaultWidth = function() {
    return 200;
  };

  FieldContent.prototype.defaultHeight = function() {
    return 50;
  };

  FieldContent.STYLE_DEFAULTS = {
    color: '#000000',
    font: 'Helvetica',
    size: 'Medium'
  };

  FieldContent.prototype.initWithConfig = function(config) {
    this._field = this.get(config.field, this.metrics()[0]);
    return this.style = $.extend({}, FieldContent.STYLE_DEFAULTS, this.get(config.style, {}));
  };

  FieldContent.prototype.render_layout = function(data) {
    return $("<div class=\"field-widget\" style=\"" + (this.textStyles()) + "\">" + (this.fieldFrom(data)) + "</div>");
  };

  FieldContent.prototype.renderAppearanceOptions = function() {
    return this.option('font', 'font', "Font") + this.option('size', 'size', "Text Size") + this.option('color', 'color', "Text Color");
  };

  FieldContent.prototype.renderConfigOptions = function() {
    var metric, options, _i, _len, _ref;
    options = {};
    _ref = this.metrics();
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      metric = _ref[_i];
      options[metric] = metric;
    }
    return this.option('select', 'field', "Field", {
      options: options,
      hint: "This is the CCR field you would like to be merged, the data shown is only a sample of the final output."
    });
  };

  FieldContent.prototype.textStyles = function() {
    return this.styleString({
      'color': this.style.color,
      'font-family': this.style.font,
      'font-size': this.style.size
    });
  };

  FieldContent.prototype.fieldFrom = function(data) {
    var key, _i, _len, _ref;
    _ref = this._field.split('.');
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      key = _ref[_i];
      data = data[key];
    }
    return data;
  };

  FieldContent.prototype.font = FieldContent.styleProperty('font');

  FieldContent.prototype.size = FieldContent.styleProperty('size');

  FieldContent.prototype.color = FieldContent.styleProperty('color');

  FieldContent.prototype.field = function(n) {
    if (n != null) {
      this._field = n;
      return this.redraw();
    } else {
      return this._field;
    }
  };

  FieldContent.prototype.serialize = function() {
    return {
      field: this._field,
      style: this.style
    };
  };

  return FieldContent;

})(WidgetContent);
