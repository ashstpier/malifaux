var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

window.Widget = (function() {
  Widget.PAGE_SELECTOR = '#page';

  Widget.GRID_SIZE = [1, 1];

  Widget.WIDGETS = {
    'image': 'ImageContent',
    'image-gallery': 'ImageGalleryContent',
    'text': 'TextContent',
    'datatable': 'DatatableContent',
    'field': 'FieldContent',
    'name': 'NameContent',
    'subject-field': 'SubjectFieldContent',
    'attendance': 'AttendanceContent',
    'dynamictable': 'DynamicTableContent',
    'shape': 'ShapeContent'
  };

  Widget.loadAll = function(done) {
    var className, completed, name, names, widgetCount;
    completed = 0;
    widgetCount = Object.keys(Widget.WIDGETS).length;
    names = (function() {
      var ref, results;
      ref = Widget.WIDGETS;
      results = [];
      for (name in ref) {
        className = ref[name];
        results.push(name);
      }
      return results;
    })();
    return async.eachLimit(names, 5, this.load, done);
  };

  Widget.load = function(name, cb) {
    utils.loadCSS("widgets/" + name + "/" + name + "-content.css");
    return utils.loadJS("js/" + name + "-content.js", cb);
  };

  Widget.prototype.isWidget = true;

  function Widget(config, data, subject) {
    var height, width;
    if (config == null) {
      config = {};
    }
    this.data = data != null ? data : null;
    this.subject = subject != null ? subject : null;
    this.updateSelectedState = bind(this.updateSelectedState, this);
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
    this.applyResizable();
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

  Widget.prototype.applyResizable = function(ratio) {
    if (ratio == null) {
      ratio = null;
    }
    return this.el.resizable({
      grid: Widget.GRID_SIZE,
      containment: Widget.PAGE_SELECTOR,
      handles: 'n, e, s, w, ne, se, sw, nw',
      resize: (function(_this) {
        return function() {
          _this.trigger('widget:move', _this);
          return _this.trigger('widget:resize', _this);
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
      })(this),
      aspectRatio: ratio
    });
  };

  Widget.prototype.render = function(mode) {
    this.el = $("<div data-guid=\"" + this.guid + "\" class=\"widget widget-" + (this.cssClass()) + "\" style=\"" + (this.originStyles()) + "\">\n  <div class=\"widget-content\"></div>\n</div>");
    this.contentContainer = this.el.find('.widget-content');
    this.renderContent(mode);
    if (mode !== 'display') {
      this.el.append("<button class=\"widget-button widget-delete\">x</button>");
      this.bindEvents();
    }
    return this.el;
  };

  Widget.prototype.cssClass = function() {
    return this.content.className().toLowerCase().replace('content', '');
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
    if (this.currentMode === 'layout') {
      return;
    }
    this.trigger('widget:layout-switching', this);
    this.el.draggable('enable');
    this.renderContent('layout');
    return this.trigger('widget:layout-switched', this);
  };

  Widget.prototype.editMode = function() {
    if (this.currentMode === 'edit') {
      return;
    }
    this.trigger('widget:edit-switching', this);
    this.el.draggable('disable');
    this.renderContent('edit');
    return this.trigger('widget:edit-switched', this);
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
      type: this.content.className(),
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
    this.trigger('widget:move', this);
    return Designer.select(this);
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
    return this.applyResizable(ratio);
  };

  Widget.prototype.width = function(n) {
    if (n != null) {
      return this.el.width(Math.round(n));
    } else {
      return Math.round(this.el.width());
    }
  };

  Widget.prototype.height = function(n) {
    if (n != null) {
      return this.el.height(Math.round(n));
    } else {
      return Math.round(this.el.height());
    }
  };

  Widget.prototype.x = function(n) {
    if (n != null) {
      return this.el.css('left', (Math.round(n)) + "px");
    } else {
      return Math.round(this.el.position().left);
    }
  };

  Widget.prototype.y = function(n) {
    if (n != null) {
      return this.el.css('top', (Math.round(n)) + "px");
    } else {
      return Math.round(this.el.position().top);
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
