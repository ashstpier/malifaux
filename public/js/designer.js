window.Designer = {
  currentEditWidget: null,
  loadAll: function(template) {
    this.template = template;
    this.templateKey = template.key;
    return $((function(_this) {
      return function() {
        return API.loadConfig(function() {
          return Widget.loadAll(function() {
            _this.renderControls();
            _this.bindEvents();
            return _this.load();
          });
        });
      };
    })(this));
  },
  init: function() {
    var templateKey;
    templateKey = utils.querystring("template");
    if (templateKey == null) {
      return this.loadAll(Template.create());
    } else {
      return Template.load(templateKey, (function(_this) {
        return function(template) {
          return _this.loadAll(template);
        };
      })(this));
    }
  },
  renderControls: function() {
    var className, name, _ref, _results;
    _ref = Widget.WIDGETS;
    _results = [];
    for (name in _ref) {
      className = _ref[name];
      _results.push($("#gallery").append("<button id=\"add-" + name + "\" type=\"button\">Add " + name + "</button>"));
    }
    return _results;
  },
  setOrientation: function(orientation) {
    $('#page').attr('class', orientation);
    return this.template.orientation = orientation;
  },
  bindEvents: function() {
    var className, name, _ref, _results;
    $('#save').click((function(_this) {
      return function() {
        return _this.save();
      };
    })(this));
    $('#clear').click((function(_this) {
      return function() {
        return _this.clear();
      };
    })(this));
    $('#delete').click((function(_this) {
      return function() {
        return _this["delete"]();
      };
    })(this));
    $('#page').click((function(_this) {
      return function(e) {
        if (e.target === $('#page')[0]) {
          return _this.clearEditWidget();
        }
      };
    })(this));
    $('#orientation input:radio').change((function(_this) {
      return function(e) {
        return _this.setOrientation($(e.currentTarget).val());
      };
    })(this));
    $('#name').blur((function(_this) {
      return function() {
        return _this.updateName();
      };
    })(this));
    $('#name').keypress((function(_this) {
      return function(e) {
        if (e.which === 13) {
          return $('#name').blur();
        }
      };
    })(this));
    $('#name').click((function(_this) {
      return function(e) {
        return $(e.currentTarget).selectText();
      };
    })(this));
    _ref = Widget.WIDGETS;
    _results = [];
    for (name in _ref) {
      className = _ref[name];
      _results.push((function(_this) {
        return function(className) {
          return $("#add-" + name).click(function() {
            return _this.addWidget({
              type: className
            });
          });
        };
      })(this)(className));
    }
    return _results;
  },
  updateName: function() {
    var name;
    name = $('#name').text();
    return this.template.name = name;
  },
  clearEditWidget: function() {
    if (this.currentEditWidget) {
      this.currentEditWidget.layoutMode();
      return this.currentEditWidget = null;
    }
  },
  editWidget: function(widget) {
    this.clearEditWidget();
    this.currentEditWidget = widget;
    return widget.editMode();
  },
  addWidget: function(widgetConfig) {
    if (widgetConfig == null) {
      widgetConfig = {};
    }
    return this.template.addWidget(widgetConfig, 'layout');
  },
  removeWidget: function(widget) {
    if (this.currentEditWidget === widget) {
      this.currentEditWidget = null;
    }
    return this.template.removeWidget(widget);
  },
  clear: function() {
    return this.template.removeAllWidgets();
  },
  load: function() {
    $('#name').text(this.template.name);
    $("#orientation input:radio[value='" + this.template.orientation + "']").attr('checked', true);
    $('#page').attr("class", this.template.orientation);
    return this.template.render();
  },
  save: function() {
    return this.template.save();
  },
  "delete": function() {
    Template["delete"](this.templateKey);
    return window.location.href = './index.html';
  }
};

$(function() {
  return Designer.init();
});
