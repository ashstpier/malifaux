var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

window.Widget = (function() {
  Widget.PAGE_SELECTOR = '#page';

  Widget.GRID_SIZE = [1, 1];

  Widget.WIDGETS = {
    'image': 'ImageContent',
    'text': 'TextContent',
    'name': 'NameContent',
    'datatable': 'DatatableContent',
    'field': 'FieldContent',
    'subject-field': 'SubjectFieldContent',
    'attendance': 'AttendanceContent'
  };

  Widget.loadAll = function(cb) {
    var className, completed, name, widgetCount, _ref, _results;
    completed = 0;
    widgetCount = Object.keys(Widget.WIDGETS).length;
    _ref = Widget.WIDGETS;
    _results = [];
    for (name in _ref) {
      className = _ref[name];
      _results.push(this.load(name, function() {
        completed++;
        if (completed === widgetCount) {
          return cb();
        }
      }));
    }
    return _results;
  };

  Widget.load = function(name, cb) {
    utils.loadCSS("widgets/" + name + "/" + name + "-content.css");
    return utils.loadCoffeeScript("js/" + name + "-content.js", cb);
  };

  function Widget(config, data) {
    var height, width;
    if (config == null) {
      config = {};
    }
    this.data = data != null ? data : null;
    this.updateSelectedState = __bind(this.updateSelectedState, this);
    this.currentMode = 'layout';
    this.guid = config.guid || utils.guid();
    this.content = config.type != null ? new window[config.type](this, config.content) : new TextContent();
    width = config.width != null ? config.width : this.content.defaultWidth();
    height = config.height != null ? config.height : this.content.defaultHeight();
    this.origin = {
      x: config.x != null ? config.x : (960 / 2) - (width / 2),
      y: config.y != null ? config.y : 100,
      width: width,
      height: height
    };
    this.position = this.origin;
  }

  Widget.prototype.displayName = function() {
    return this.content.constructor.displayName;
  };

  Widget.prototype.originStyles = function() {
    return "position:absolute; top:" + this.origin.y + "px; left:" + this.origin.x + "px; width:" + this.origin.width + "px; height:" + this.origin.height + "px;";
  };

  Widget.prototype.bindEvents = function() {
    Designer.bind('selection:change', this.updateSelectedState);
    this.el.click((function(_this) {
      return function() {
        return Designer.select(_this);
      };
    })(this));
    this.el.dblclick((function(_this) {
      return function() {
        if (_this.content.editable()) {
          return Designer.editWidget(_this);
        }
      };
    })(this));
    this.el.find('.widget-delete').click((function(_this) {
      return function() {
        return Designer.removeWidget(_this);
      };
    })(this));
    this.el.resizable({
      grid: Widget.GRID_SIZE,
      containment: Widget.PAGE_SELECTOR,
      handles: 'n, e, s, w, ne, se, sw, nw',
      resize: (function(_this) {
        return function() {
          return _this.trigger('widget:move', _this);
        };
      })(this),
      start: (function(_this) {
        return function() {
          return Designer.select(_this);
        };
      })(this),
      stop: (function(_this) {
        return function() {
          return _this.moved();
        };
      })(this)
    });
    return this.el.draggable({
      grid: Widget.GRID_SIZE,
      containment: Widget.PAGE_SELECTOR,
      drag: (function(_this) {
        return function() {
          return _this.trigger('widget:move', _this);
        };
      })(this),
      start: (function(_this) {
        return function() {
          return Designer.select(_this);
        };
      })(this),
      stop: (function(_this) {
        return function() {
          return _this.moved();
        };
      })(this)
    });
  };

  Widget.prototype.render = function(mode) {
    this.el = $("<div data-guid=\"" + this.guid + "\" class=\"widget\" style=\"" + (this.originStyles()) + "\">\n  <div class=\"widget-content\"></div>\n</div>");
    this.contentContainer = this.el.find('.widget-content');
    this.renderContent(mode);
    if (mode !== 'display') {
      this.el.append("<button class=\"widget-button widget-delete\">x</button>");
      this.bindEvents();
    }
    return this.el;
  };

  Widget.prototype.renderContent = function(mode) {
    this.currentMode = mode;
    this.el.removeClass("widget-layout-mode");
    this.el.removeClass("widget-edit-mode");
    this.el.addClass("widget-" + mode + "-mode");
    return this.contentContainer.html(this.content.render(mode, this.data));
  };

  Widget.prototype.redraw = function() {
    return this.renderContent(this.currentMode);
  };

  Widget.prototype.renderAppearanceOptions = function() {
    return this.content.renderAppearanceOptions();
  };

  Widget.prototype.renderConfigOptions = function() {
    return this.content.renderConfigOptions();
  };

  Widget.prototype.moved = function() {
    var oldPosition;
    oldPosition = this.position;
    this.cachePosition();
    return Designer.history.push(this, 'moveTo', oldPosition, this.position);
  };

  Widget.prototype.cachePosition = function() {
    return this.position = {
      x: this.x(),
      y: this.y(),
      width: this.width(),
      height: this.height()
    };
  };

  Widget.prototype.layoutMode = function() {
    this.el.draggable('enable');
    return this.renderContent('layout');
  };

  Widget.prototype.editMode = function() {
    this.el.draggable('disable');
    return this.renderContent('edit');
  };

  Widget.prototype.remove = function() {
    return this.el.remove();
  };

  Widget.prototype.serialize = function() {
    return {
      guid: this.guid,
      x: this.x(),
      y: this.y(),
      width: this.width(),
      height: this.height(),
      type: this.content.constructor.name,
      content: this.content.serialize()
    };
  };

  Widget.prototype.moveTo = function(coords) {
    if (coords.x != null) {
      this.x(coords.x);
    }
    if (coords.y != null) {
      this.y(coords.y);
    }
    if (coords.width != null) {
      this.width(coords.width);
    }
    if (coords.height != null) {
      this.height(coords.height);
    }
    return this.trigger('widget:move', this);
  };

  Widget.prototype.nudge = function(x, y) {
    var oldPosition;
    oldPosition = this.position;
    if (x !== 0) {
      this.x(this.x() + x);
    }
    if (y !== 0) {
      this.y(this.y() + y);
    }
    this.cachePosition();
    Designer.history.push(this, 'moveTo', oldPosition, this.position);
    return this.trigger('widget:move', this);
  };

  Widget.prototype.saveConfig = function() {
    return this.content.saveConfig();
  };

  Widget.prototype.setAspectRatio = function(ratio) {
    this.el.resizable('destroy');
    this.el.height(this.el.width() / ratio);
    return this.el.resizable({
      grid: Widget.GRID_SIZE,
      containment: Widget.PAGE_SELECTOR,
      aspectRatio: ratio
    });
  };

  Widget.prototype.width = function(n) {
    if (n != null) {
      return this.el.width(n);
    } else {
      return this.el.width();
    }
  };

  Widget.prototype.height = function(n) {
    if (n != null) {
      return this.el.height(n);
    } else {
      return this.el.height();
    }
  };

  Widget.prototype.x = function(n) {
    if (n != null) {
      return this.el.css('left', "" + n + "px");
    } else {
      return this.el.position().left;
    }
  };

  Widget.prototype.y = function(n) {
    if (n != null) {
      return this.el.css('top', "" + n + "px");
    } else {
      return this.el.position().top;
    }
  };

  Widget.prototype.updateSelectedState = function(selection) {
    if (this === selection) {
      return this.el.addClass('selected');
    } else {
      return this.el.removeClass('selected');
    }
  };

  return Widget;

})();

MicroEvent.mixin(window.Widget);
