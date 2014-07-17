window.Designer = {
  selection: null,
  currentEditWidget: null,
  propertyPanel: null,
  history: new UndoHistory(),
  NUDGE_SIZE: 10,
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
        return _this.promptSave();
      };
    })(this));
    $('#page').on('mousedown', (function(_this) {
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
    $('#undo').click((function(_this) {
      return function() {
        return _this.history.undo();
      };
    })(this));
    $('#redo').click((function(_this) {
      return function() {
        return _this.history.redo();
      };
    })(this));
    this.history.bind('history:change', (function(_this) {
      return function() {
        return _this.updateHistoryButtonState();
      };
    })(this));
    this.bindKeyboardEvents();
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
  bindKeyboardEvents: function() {
    Mousetrap.bind(['command+z', 'ctrl+z'], (function(_this) {
      return function() {
        _this.history.undo();
        return false;
      };
    })(this));
    Mousetrap.bind(['command+shift+z', 'ctrl+shift+z'], (function(_this) {
      return function() {
        _this.history.redo();
        return false;
      };
    })(this));
    Mousetrap.bind(['backspace', 'del'], (function(_this) {
      return function() {
        if (_this.selection) {
          _this.removeWidget(_this.selection);
        }
        return false;
      };
    })(this));
    Mousetrap.bind('left', (function(_this) {
      return function() {
        if (_this.selection) {
          _this.selection.nudge(-1, 0);
        }
        return false;
      };
    })(this));
    Mousetrap.bind(['command+left', 'ctrl+left'], (function(_this) {
      return function() {
        if (_this.selection) {
          _this.selection.nudge(-_this.NUDGE_SIZE, 0);
        }
        return false;
      };
    })(this));
    Mousetrap.bind('right', (function(_this) {
      return function() {
        if (_this.selection) {
          _this.selection.nudge(1, 0);
        }
        return false;
      };
    })(this));
    Mousetrap.bind(['command+right', 'ctrl+right'], (function(_this) {
      return function() {
        if (_this.selection) {
          _this.selection.nudge(_this.NUDGE_SIZE, 0);
        }
        return false;
      };
    })(this));
    Mousetrap.bind('up', (function(_this) {
      return function() {
        if (_this.selection) {
          _this.selection.nudge(0, -1);
        }
        return false;
      };
    })(this));
    Mousetrap.bind(['command+up', 'ctrl+up'], (function(_this) {
      return function() {
        if (_this.selection) {
          _this.selection.nudge(0, -_this.NUDGE_SIZE);
        }
        return false;
      };
    })(this));
    Mousetrap.bind('down', (function(_this) {
      return function() {
        if (_this.selection) {
          _this.selection.nudge(0, 1);
        }
        return false;
      };
    })(this));
    return Mousetrap.bind(['command+down', 'ctrl+down'], (function(_this) {
      return function() {
        if (_this.selection) {
          _this.selection.nudge(0, _this.NUDGE_SIZE);
        }
        return false;
      };
    })(this));
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
  addWidget: function(widgetConfig, withHistory) {
    var widget;
    if (widgetConfig == null) {
      widgetConfig = {};
    }
    if (withHistory == null) {
      withHistory = true;
    }
    widget = this.template.addWidget(widgetConfig, 'layout');
    this.select(widget);
    if (withHistory) {
      return Designer.history.push(this, 'addRemoveWidget', {
        remove: widget
      }, {
        add: widget
      });
    }
  },
  removeWidget: function(widget, withHistory) {
    if (withHistory == null) {
      withHistory = true;
    }
    if (this.currentEditWidget === widget) {
      this.currentEditWidget = null;
    }
    this.clearSelection();
    this.template.removeWidget(widget);
    if (withHistory) {
      return Designer.history.push(this, 'addRemoveWidget', {
        add: widget
      }, {
        remove: widget
      });
    }
  },
  addRemoveWidget: function(action) {
    if (action.add != null) {
      this.addWidget(action.add, false);
    }
    if (action.remove != null) {
      return this.removeWidget(action.remove, false);
    }
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
  promptSave: function() {
    var shouldPrompt;
    shouldPrompt = this.history.canUndo();
    if (shouldPrompt) {
      if (!utils.is_ccr) {
        this.takeScreenShot();
      }
      $('#save-modal').modal();
    } else {
      this.exitDesigner();
    }
    return false;
  },
  exitDesigner: function() {
    var redirect;
    redirect = environment.is_ccr ? "/ccr2s/parentReports/" : "./index.html";
    return window.location.href = redirect;
  },
  saveAndExit: function() {
    return this.template.save((function(_this) {
      return function() {
        return _this.exitDesigner();
      };
    })(this));
  },
  takeScreenShot: function() {
    $('#viewport').addClass('screenshot');
    return utils.screenshot('page', (function(_this) {
      return function(data_url) {
        _this.template.screenshot = data_url;
        return $('#viewport').removeClass('screenshot');
      };
    })(this));
  },
  updateHistoryButtonState: function() {
    if (this.history.canUndo()) {
      $('#undo').addClass('enabled');
      $('#undo').removeClass('disabled');
    } else {
      $('#undo').removeClass('enabled');
      $('#undo').addClass('disabled');
    }
    if (this.history.canRedo()) {
      $('#redo').addClass('enabled');
      return $('#redo').removeClass('disabled');
    } else {
      $('#redo').removeClass('enabled');
      return $('#redo').addClass('disabled');
    }
  }
};

MicroEvent.mixin(Designer);

$(function() {
  return Designer.init();
});
