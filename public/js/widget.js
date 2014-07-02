window.Widget = (function() {
  Widget.PAGE_SELECTOR = '#page';

  Widget.GRID_SIZE = [20, 20];

  Widget.WIDGETS = {
    'image': 'ImageContent',
    'text': 'TextContent',
    'name': 'NameContent',
    'datatable': 'DatatableContent',
    'field': 'FieldContent',
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
    this.currentMode = 'layout';
    this.guid = config.guid || utils.guid();
    this.content = config.type != null ? new window[config.type](config.content) : new TextContent();
    width = config.width != null ? config.width : this.content.defaultWidth();
    height = config.height != null ? config.height : this.content.defaultHeight();
    this.origin = {
      x: config.x != null ? config.x : (960 / 2) - (width / 2),
      y: config.y != null ? config.y : 300,
      width: width,
      height: height
    };
  }

  Widget.prototype.originStyles = function() {
    return "position:absolute; top:" + this.origin.y + "px; left:" + this.origin.x + "px; width:" + this.origin.width + "px; height:" + this.origin.height + "px;";
  };

  Widget.prototype.bindEvents = function() {
    this.el.dblclick((function(_this) {
      return function() {
        return Designer.editWidget(_this);
      };
    })(this));
    this.el.find('.widget-delete').click((function(_this) {
      return function() {
        return Designer.removeWidget(_this);
      };
    })(this));
    this.el.resizable({
      grid: Widget.GRID_SIZE,
      containment: Widget.PAGE_SELECTOR
    });
    return this.el.draggable({
      grid: Widget.GRID_SIZE,
      containment: Widget.PAGE_SELECTOR
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
    var position;
    position = this.el.position();
    return {
      guid: this.guid,
      x: position.left,
      y: position.top,
      width: this.el.width(),
      height: this.el.height(),
      type: this.content.constructor.name,
      content: this.content.serialize()
    };
  };

  return Widget;

})();
