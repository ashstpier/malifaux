window.Designer = {
  selection: null,
  currentEditWidget: null,
  propertyPanel: null,
  history: new UndoHistory(),
  NUDGE_SIZE: 10,
  UNSAVED_CHANGES_WARNING: "You have made changes to the template without saving them.\n\nPlease use the 'Exit' button to save your changes.",
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
      if (type.active) {
        _results.push($("#gallery").append("<div id=\"add-" + name + "\" class=\"add-widget\">\n  <i class=\"glyphicons white " + type.icon + "\"></i>\n  <h4>" + type.displayName + "</h4>\n  <p>" + type.description + "</p>\n</div>"));
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  },
  setOrientation: function(orientation) {
    Designer.history.push(this, 'updateOrientation', this.template.orientation, orientation);
    return this.updateOrientation(orientation);
  },
  updateOrientation: function(orientation) {
    this.template.orientation = orientation;
    $("#orientation input:radio").removeAttr('checked');
    $("#orientation input:radio[value='" + this.template.orientation + "']").prop('checked', true);
    return this.addPageClass();
  },
  setPageType: function(pagetype) {
    Designer.history.push(this, 'updatePageType', this.template.pagetype, pagetype);
    return this.updatePageType(pagetype);
  },
  updatePageType: function(pagetype) {
    this.template.pagetype = pagetype;
    $("#pagetype input:radio").removeAttr('checked');
    $("#pagetype input:radio[value='" + this.template.pagetype + "']").prop('checked', true);
    this.addPageClass();
    return this.reloadTemplate();
  },
  reloadTemplate: function() {
    var config;
    config = this.template.serialize();
    this.template.removeAllWidgets();
    this.template = new Template(config);
    return this.template.render('layout');
  },
  addPageClass: function() {
    $('#page').attr('class', '');
    return $('#page').addClass("" + this.template.orientation + " " + this.template.pagetype);
  },
  isSubjectPage: function() {
    return this.template.pagetype === 'subject';
  },
  isStudentPage: function() {
    return this.template.pagetype === 'student';
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
    $('#pagetype input:radio').change((function(_this) {
      return function(e) {
        return _this.setPageType($(e.currentTarget).val());
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
    window.addEventListener("beforeunload", (function(_this) {
      return function(e) {
        if (_this.hasUnsavedChanges()) {
          (e || window.event).returnValue = Designer.UNSAVED_CHANGES_WARNING;
          return Designer.UNSAVED_CHANGES_WARNING;
        } else {
          return null;
        }
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
    var subject;
    $('#name').text(this.template.name);
    $("#orientation input:radio[value='" + this.template.orientation + "']").attr('checked', true);
    $("#pagetype input:radio[value='" + this.template.pagetype + "']").attr('checked', true);
    $('#page').addClass("" + this.template.orientation + " " + this.template.pagetype);
    subject = this.isSubjectPage() ? utils.fakeSubject() : null;
    return this.template.render("layout");
  },
  discard: function() {
    return this.exitDesigner();
  },
  clear: function() {
    return this.template.removeAllWidgets();
  },
  promptSave: function() {
    if (this.hasUnsavedChanges()) {
      if (!utils.is_ccr) {
        this.takeScreenShot();
      }
      $('#save-modal').modal();
    } else {
      this.exitDesigner();
    }
    return false;
  },
  hasUnsavedChanges: function() {
    return this.history.canUndo();
  },
  reminderToSave: (function(_this) {
    return function() {
      if (_this.history.canUndo()) {
        return "You haven't saved your progress!";
      } else {
        return null;
      }
    };
  })(this),
  exitDesigner: function() {
    var redirect;
    redirect = environment.is_ccr ? "/ccr2/parentReports/" : "./index.html";
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
