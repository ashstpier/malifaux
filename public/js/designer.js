window.Designer = {
  selection: null,
  currentEditWidget: null,
  propertyPanel: null,
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
    this.renderWidgetButtons();
    return this.renderPropertyPanel();
  },
  renderPropertyPanel: function() {
    this.propertyPanel = new Properties(this);
    return this.propertyPanel.render();
  },
  renderWidgetButtons: function() {
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
        return _this.maybeClearSelection(e.target);
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
  select: function(widget) {
    this.selection = widget;
    return this.trigger('selection:change', this.selection);
  },
  clearSelection: function() {
    return this.select(null);
  },
  maybeClearSelection: function(target) {
    if (target === $('#page')[0]) {
      this.clearSelection();
      return this.clearEditWidget();
    }
  },
  clearEditWidget: function() {
    if (this.currentEditWidget) {
      this.currentEditWidget.saveConfig();
      this.currentEditWidget.layoutMode();
      this.currentEditWidget = null;
      return this.trigger('selection:change', null);
    }
  },
  editWidget: function(widget) {
    this.clearEditWidget();
    this.currentEditWidget = widget;
    widget.editMode();
    return this.trigger('selection:change', this.currentEditWidget);
  },
  addWidget: function(widgetConfig) {
    var widget;
    if (widgetConfig == null) {
      widgetConfig = {};
    }
    widget = this.template.addWidget(widgetConfig, 'layout');
    return this.select(widget);
  },
  removeWidget: function(widget) {
    if (this.currentEditWidget === widget) {
      this.currentEditWidget = null;
    }
    this.clearSelection();
    return this.template.removeWidget(widget);
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
  discard: function() {
    return this.exitDesigner();
  },
  clear: function() {
    return this.template.removeAllWidgets();
  },
  exitDesigner: function() {
    var redirect;
    redirect = utils.querystring("return");
    return window.location.href = redirect ? redirect : "./index.html";
  },
  saveAndExit: function() {
    return this.template.save((function(_this) {
      return function() {
        return _this.exitDesigner();
      };
    })(this));
  },
  takeScreenShot: function() {
    return html2canvas(document.getElementById('page'), {
      allowTaint: false,
      taintTest: false,
      useCORS: true,
      onrendered: (function(_this) {
        return function(canvas) {
          return _this.template.screenshot = canvas.toDataURL();
        };
      })(this)
    });
  },
  exit: function() {
    if (!utils.is_production) {
      this.takeScreenShot();
    }
    $('#save-modal').modal();
    return false;
  }
};

MicroEvent.mixin(Designer);

$(function() {
  return Designer.init();
});
