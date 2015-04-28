var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

window.FieldContent = (function(superClass) {
  extend(FieldContent, superClass);

  function FieldContent() {
    this.updateMapping = bind(this.updateMapping, this);
    this.changeMapping = bind(this.changeMapping, this);
    return FieldContent.__super__.constructor.apply(this, arguments);
  }

  FieldContent.className = "FieldContent";

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
    this._field = this.get(config.field, Object.keys(this.metrics())[0]);
    this.style = $.extend({}, FieldContent.STYLE_DEFAULTS, this.get(config.style, {}));
    return this.mappings = this.get(config.mappings, {});
  };

  FieldContent.prototype.render_layout = function(data) {
    return $("<div class=\"field-widget\" style=\"" + (this.textStyles()) + "\">" + (this.fieldFrom(data)) + "</div>");
  };

  FieldContent.prototype.renderAppearanceOptions = function() {
    return this.option('font', 'font', "Font") + this.option('size', 'size', "Text Size") + this.option('color', 'color', "Text Color");
  };

  FieldContent.prototype.renderConfigOptions = function() {
    return [
      this.option('select', 'field', "Field", {
        options: this.metrics(),
        hint: "This is the CCR! field you would like to be merged, the data shown is only a sample of the final output."
      }), this.mappingSettings()
    ];
  };

  FieldContent.prototype.mappingSettings = function() {
    var node, self;
    node = $("<div class=\"mapping-option\"><a href=\"#\" class=\"mapping\">" + ($.isEmptyObject(this.mappings) ? 'Add word mappings...' : 'Edit word mappings...') + "</a></div>");
    self = this;
    node.on("click", ".mapping", (function(_this) {
      return function() {
        return new MappingModal(_this.mappings, _this.changeMapping);
      };
    })(this));
    return node;
  };

  FieldContent.prototype.changeMapping = function(newMappings) {
    var oldMappings;
    oldMappings = this.mappings;
    this.updateMapping(newMappings);
    return Designer.history.push(this, 'updateMapping', oldMappings, newMappings);
  };

  FieldContent.prototype.updateMapping = function(mappings) {
    this.mappings = mappings;
    return this.redraw();
  };

  FieldContent.prototype.textStyles = function() {
    return this.styleString({
      'color': this.style.color,
      'font-family': utils.fontMap[this.style.font],
      'font-size': utils.sizeMap[this.style.size]
    });
  };

  FieldContent.prototype.fieldFrom = function(data) {
    var i, key, len, ref;
    ref = this._field.split('.');
    for (i = 0, len = ref.length; i < len; i++) {
      key = ref[i];
      data = data != null ? data[key] : void 0;
    }
    return this.mappings[data] || data || this.placeholderWithLabel(key);
  };

  FieldContent.prototype.font = FieldContent.property('style', 'font');

  FieldContent.prototype.size = FieldContent.property('style', 'size');

  FieldContent.prototype.color = FieldContent.property('style', 'color');

  FieldContent.prototype.field = FieldContent.property('_field');

  FieldContent.prototype.serialize = function() {
    return {
      field: this._field,
      style: this.style,
      mappings: this.mappings
    };
  };

  return FieldContent;

})(WidgetContent);
