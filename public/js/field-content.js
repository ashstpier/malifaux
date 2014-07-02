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
    this.field = this.get(config.field, this.metrics()[0]);
    return this.style = $.extend({}, FieldContent.STYLE_DEFAULTS, this.get(config.style, {}));
  };

  FieldContent.prototype.render_layout = function(data) {
    return $("<div class=\"field-widget\" style=\"" + (this.textStyles()) + "\">" + (this.fieldFrom(data)) + "</div>");
  };

  FieldContent.prototype.render_edit = function(data) {
    var metric, options;
    options = (function() {
      var _i, _len, _ref, _results;
      _ref = this.metrics();
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        metric = _ref[_i];
        _results.push("<option " + (this.field === metric ? 'selected' : '') + ">" + metric + "</option>");
      }
      return _results;
    }).call(this);
    return $("<div class=\"field-edit\">\n  <select id=\"field-selector\">" + (options.join("\n")) + "</select>\n\n  <h4>Style</h4>\n  " + (this.styleOption('font', 'font', "Font")) + "\n  " + (this.styleOption('size', 'size', "Text Size")) + "\n  " + (this.styleOption('color', 'color', "Text Color")) + "\n</div>");
  };

  FieldContent.prototype.textStyles = function() {
    return this.styleString({
      'color': this.style.color,
      'font-family': this.style.font,
      'font-size': this.style.size
    });
  };

  FieldContent.prototype.bindEvents = function(el) {
    return {};
  };

  FieldContent.prototype.fieldFrom = function(data) {
    var key, _i, _len, _ref;
    _ref = this.field.split('.');
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      key = _ref[_i];
      data = data[key];
    }
    return data;
  };

  FieldContent.prototype.saveText = function() {
    return this.field = this.el.find('#field-selector').val();
  };

  FieldContent.prototype.saveConfig = function() {
    this.saveText();
    return this.saveStyle();
  };

  FieldContent.prototype.saveStyle = function() {
    var el, name, _i, _len, _ref, _results;
    _ref = this.el.find('.style-option');
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      el = _ref[_i];
      name = $(el).attr('name');
      _results.push(this.style[name] = $(el).val());
    }
    return _results;
  };

  FieldContent.prototype.serialize = function() {
    return {
      field: this.field,
      style: this.style
    };
  };

  return FieldContent;

})(WidgetContent);
