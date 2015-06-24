var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

window.PageTemplate = (function() {
  PageTemplate.create = function() {
    var template;
    template = new PageTemplate({
      key: utils.guid(),
      layout: [],
      orientation: 'portrait',
      pagetype: 'student'
    });
    return template;
  };

  function PageTemplate(description) {
    this.getWidget = bind(this.getWidget, this);
    this.widgets = [];
    this.layout = description.layout;
    this.orientation = description.orientation;
    this.pagetype = description.pagetype;
    this.el = $("<div class=\"page\" data-orientation=\"" + this.orientation + "\"\" data-pagetype=\"" + this.pagetype + "\"/>");
    $('#viewport #pages').append(this.el);
  }

  PageTemplate.prototype.render = function(mode, data, subject) {
    var i, len, ref, widgetConfig;
    if (data == null) {
      data = null;
    }
    if (subject == null) {
      subject = null;
    }
    ref = this.layout;
    for (i = 0, len = ref.length; i < len; i++) {
      widgetConfig = ref[i];
      this.addWidget(widgetConfig, mode, data, subject);
    }
    this.layout = [];
    return this.isRendered = true;
  };

  PageTemplate.prototype.addWidget = function(widgetConfig, mode, data, subject) {
    var widget;
    if (data == null) {
      data = null;
    }
    if (subject == null) {
      subject = null;
    }
    data = data || utils.fakeStudentData();
    subject = subject || utils.subject(this.pagetype);
    widget = widgetConfig.isWidget ? widgetConfig : new Widget(widgetConfig, data, subject);
    this.widgets.push(widget);
    this.el.append(widget.render(mode));
    return widget;
  };

  PageTemplate.prototype.activate = function() {
    return this.el.addClass('page-active');
  };

  PageTemplate.prototype.deactivate = function() {
    return this.el.removeClass('page-active');
  };

  PageTemplate.prototype.redraw = function() {
    var i, len, ref, results, widget;
    ref = this.widgets;
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      widget = ref[i];
      results.push(widget.redraw());
    }
    return results;
  };

  PageTemplate.prototype.removeWidget = function(widget) {
    var w;
    widget.remove();
    return this.widgets = (function() {
      var i, len, ref, results;
      ref = this.widgets;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        w = ref[i];
        if (w.guid !== widget.guid) {
          results.push(w);
        }
      }
      return results;
    }).call(this);
  };

  PageTemplate.prototype.removeAllWidgets = function() {
    var i, len, ref, results, widget;
    ref = this.widgets;
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      widget = ref[i];
      results.push(this.removeWidget(widget));
    }
    return results;
  };

  PageTemplate.prototype.getWidget = function(guid) {
    return _.find(this.widgets, function(w) {
      return w.guid === guid;
    });
  };

  PageTemplate.prototype.getWidgetOrder = function() {
    var sortedWidgets;
    sortedWidgets = _.sortBy(this.widgets, function(w) {
      return w.zIndex();
    });
    return _.map(sortedWidgets, function(w) {
      return w.guid;
    });
  };

  PageTemplate.prototype.setWidgetOrder = function(newOrder) {
    var i, index, len, newlyOrderedWidgets, results, widget;
    newlyOrderedWidgets = _.map(newOrder, this.getWidget);
    results = [];
    for (index = i = 0, len = newlyOrderedWidgets.length; i < len; index = ++i) {
      widget = newlyOrderedWidgets[index];
      results.push(widget.zIndex(index + 1));
    }
    return results;
  };

  PageTemplate.prototype.updateAttributes = function() {
    this.el.attr('data-orientation', this.orientation);
    return this.el.attr('data-pagetype', this.pagetype);
  };

  PageTemplate.prototype.serializeWidgets = function() {
    var widget;
    return this.layout = (function() {
      var i, len, ref, results;
      ref = this.widgets;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        widget = ref[i];
        results.push(widget.serialize());
      }
      return results;
    }).call(this);
  };

  PageTemplate.prototype.serialize = function() {
    var data;
    this.serializeWidgets();
    data = {
      layout: this.layout,
      orientation: this.orientation,
      pagetype: this.pagetype
    };
    return data;
  };

  PageTemplate.deserialize = function(templateData, cb) {
    var template;
    template = new PageTemplate(templateData);
    return cb(template);
  };

  return PageTemplate;

})();
