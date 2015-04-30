var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

window.ShapeContent = (function(superClass) {
  extend(ShapeContent, superClass);

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

  ShapeContent.border_widths = {
    "0": "none",
    "1": "1",
    "3": "3",
    "5": "5",
    "8": "8",
    "10": "10",
    "15": "15"
  };

  ShapeContent.STYLE_DEFAULTS = {
    fill_color: '#CCCCCC',
    stroke_color: '#888888',
    stroke_width: '3',
    shape: 'rectangle',
    border_radius: '5'
  };

  ShapeContent.prototype.fill_color = ShapeContent.property('style', 'fill_color');

  ShapeContent.prototype.stroke_color = ShapeContent.property('style', 'stroke_color');

  ShapeContent.prototype.stroke_width = ShapeContent.property('style', 'stroke_width');

  ShapeContent.prototype.shape = ShapeContent.property('style', 'shape');

  ShapeContent.prototype.border_radius = ShapeContent.property('style', 'border_radius');

  ShapeContent.prototype.maintainAspectRatio = ShapeContent.property('_maintainAspectRatio');

  ShapeContent.prototype.initWithConfig = function(config) {
    return this.style = $.extend({}, ShapeContent.STYLE_DEFAULTS, this.get(config.style, {}));
  };

  ShapeContent.prototype.renderAppearanceOptions = function() {
    return [
      this.option('select', 'shape', "Shape", {
        options: {
          rectangle: "Rectangle",
          ellipse: "Ellipse"
        }
      }), this.option('color', 'fill_color', "Fill colour"), this.option('color', 'stroke_color', "Border colour"), this.option('select', 'stroke_width', "Border width", {
        options: ShapeContent.border_widths
      }), this.option('select', 'border_radius', "Corner radius", {
        options: ShapeContent.border_widths
      })
    ];
  };

  ShapeContent.prototype.renderConfigOptions = function() {
    return [this.option('checkbox', 'maintainAspectRatio', "Maintain Aspect Ratio")];
  };

  ShapeContent.prototype.render_layout = function() {
    if (this.maintainAspectRatio()) {
      this.setAspectRatio(1);
    } else {
      setTimeout(((function(_this) {
        return function() {
          return _this.setAspectRatio(0);
        };
      })(this)), 0);
    }
    if (this.style.shape === 'rectangle') {
      return $("<svg width='100%' height='100%'> <rect x='" + (this.style.stroke_width / 1.6) + "%' y='" + (this.style.stroke_width / 1.6) + "%' width='" + (100 - this.style.stroke_width / 0.8) + "%' height='" + (100 - this.style.stroke_width / 0.8) + "%' rx='" + this.style.border_radius + "' ry='" + this.style.border_radius + "' style='fill:" + this.style.fill_color + ";stroke-width:" + this.style.stroke_width + ";stroke:" + this.style.stroke_color + "' /> </svg>");
    } else {
      return $("<svg height='100%' width='100%'> <ellipse cx='50%' cy='50%' rx='" + (45 - this.style.stroke_width / 1.8) + "%' ry='" + (45 - this.style.stroke_width / 1.8) + "%' stroke='" + this.style.stroke_color + "' stroke-width='" + this.style.stroke_width + "' fill='" + this.style.fill_color + "' /> </svg>");
    }
  };

  ShapeContent.prototype.serialize = function() {
    return {
      style: this.style,
      maintainAspectRatio: this.maintainAspectRatio()
    };
  };

  return ShapeContent;

})(WidgetContent);
