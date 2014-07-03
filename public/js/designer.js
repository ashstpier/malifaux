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
    var className, name, type, _ref, _results;
    _ref = Widget.WIDGETS;
    _results = [];
    for (name in _ref) {
      className = _ref[name];
      type = window[className];
      _results.push($("#gallery").append("<div id=\"add-" + name + "\" class=\"add-widget\">\n  <i class=\"glyphicons white " + type.icon + "\"></i>\n  <h4>" + type.displayName + "</h4>\n  <p>" + type.description + "</p>\n</div>"));
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
        return _this.saveAndExit();
      };
    })(this));
    $('#discard').click((function(_this) {
      return function() {
        return _this.discard();
      };
    })(this));
    $('#exit a').click((function(_this) {
      return function() {
        return _this.exit();
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
            $('#gallery').addClass('hidden');
            setTimeout((function() {
              return $('#gallery').removeClass('hidden');
            }), 500);
            _this.addWidget({
              type: className
            });
            return false;
          });
        };
      })(this)(className));
    }
    return _results;
  },
  updateName: function() {
    var name;
    name = $('#name').text();
    this.template.name = name;
    return this.save();
  },
  clearEditWidget: function() {
    if (this.currentEditWidget) {
      this.currentEditWidget.saveConfig();
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
    return this.template.render("layout");
  },
  save: function() {
    return this.template.save;
  },
  exitDesigner: function() {
    var redirect;
    redirect = utils.querystring("return");
    return window.location.href = redirect ? redirect : "./index.html";
  },
  saveAndExit: function() {
    this.template.save((function(_this) {
      return function() {};
    })(this));
    return this.exitDesigner();
  },
  discard: function() {
    return this.exitDesigner();
  },
  exit: function() {
    $('#save-modal').modal();
    return false;
  }
};

$(function() {
  return Designer.init();
});
