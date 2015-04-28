var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

window.ShapeContent = (function(_super) {
  __extends(ShapeContent, _super);

  function ShapeContent() {
    return ShapeContent.__super__.constructor.apply(this, arguments);
  }

  ShapeContent.className = "ShapeContent";

  ShapeContent.displayName = "Shape";

  ShapeContent.description = "A simple shape to be used for drawing.";

  ShapeContent.icon = "vector_path_square";

  ShapeContent.prototype.defaultWidth = function() {
    return 200;
  };

  ShapeContent.prototype.defaultHeight = function() {
    return 200;
  };

  ShapeContent.STYLE_DEFAULTS = {
    fill_color: '#CCCCCC',
    stroke_color: '#888888'
  };

  ShapeContent.prototype.fill_color = ShapeContent.property('style', 'fill_color');

  ShapeContent.prototype.stroke_color = ShapeContent.property('style', 'stroke_color');

  ShapeContent.prototype.initWithConfig = function(config) {
    return this.style = $.extend({}, ShapeContent.STYLE_DEFAULTS, this.get(config.style, {}));
  };

  ShapeContent.prototype.renderAppearanceOptions = function() {
    return [this.option('color', 'fill_color', "Fill colour"), this.option('color', 'stroke_color', "Border colour")];
  };

  ShapeContent.prototype.render_layout = function() {
    return $("<svg width='100%' height='100%'> <rect width='100%' height='100%' style='fill:" + this.style.fill_color + ";stroke-width:3;stroke:" + this.style.stroke_color + "' /> </svg>");
  };

  ShapeContent.prototype.serialize = function() {
    return {
      style: this.style
    };
  };

  return ShapeContent;

})(WidgetContent);
