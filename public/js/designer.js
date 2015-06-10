window.Designer = {
  selection: null,
  currentEditWidget: null,
  propertyPanel: null,
  history: new UndoHistory(),
  clipboard: null,
  NUDGE_SIZE: 10,
  UNSAVED_CHANGES_WARNING: "You have made changes to the template without saving them.\n\nPlease use the 'Save' button to save your changes.",
  loadAll: function(template) {
    this.template = template;
    this.templateKey = template.key;
    return $((function(_this) {
      return function() {
        return API.loadConfig(function() {
          _this.renderControls();
          _this.bindEvents();
          return _this.load();
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
    this.renderPropertyPanel();
    return this.renderPagesList();
  },
  renderPropertyPanel: function() {
    this.propertyPanel = new Properties(this);
    return this.propertyPanel.render();
  },
  renderWidgetButtons: function() {
    var className, name, ref, results, type;
    ref = Widget.WIDGETS;
    results = [];
    for (name in ref) {
      className = ref[name];
      type = window[className];
      if (type.active) {
        results.push($("#widget-gallery .assembly-modal-content").append("<div id=\"add-" + name + "\" class=\"add-widget\">\n  <i class=\"glyphicons " + type.icon + "\"></i>\n  <h4>" + type.displayName + "</h4>\n  <p>" + type.description + "</p>\n</div>"));
      } else {
        results.push(void 0);
      }
    }
    return results;
  },
  renderPagesList: function() {
    var classes, i, len, n, page, ref, results;
    $('#page-list').empty();
    $('#pages-nav-label').html("Page " + (this.template.currentPageNumber + 1));
    ref = this.template.pages;
    results = [];
    for (n = i = 0, len = ref.length; i < len; n = ++i) {
      page = ref[n];
      classes = ['page-button'];
      if (n === this.template.currentPageNumber) {
        classes.push('page-button-active');
      }
      if (page.orientation === 'landscape') {
        classes.push('page-button-landscape');
      }
      if (page.pagetype === 'subject') {
        classes.push('page-button-subject');
      }
      results.push($('#page-list').append("<div class=\"" + (classes.join(' ')) + "\" data-number=\"" + n + "\">\n  <div class=\"page-icon\">\n    " + (n === this.template.currentPageNumber ? '' : '<span class="page-delete-button" title="Remove page" data-number="#{n}">&times;</span>') + "\n  </div>\n  Page " + (n + 1) + "\n</div>"));
    }
    return results;
  },
  setOrientation: function(orientation) {
    Designer.history.push(this, 'updateOrientation', this.template.currentPage.orientation, orientation, this.template.currentPageNumber);
    return this.updateOrientation(orientation);
  },
  updateOrientation: function(orientation) {
    this.template.currentPage.orientation = orientation;
    $("#orientation input:radio").removeAttr('checked');
    $("#orientation input:radio[value='" + this.template.currentPage.orientation + "']").prop('checked', true);
    this.updatePageAttributes();
    return this.renderPagesList();
  },
  setPageType: function(pagetype) {
    Designer.history.push(this, 'updatePageType', this.template.currentPage.pagetype, pagetype, this.template.currentPageNumber);
    return this.updatePageType(pagetype);
  },
  updatePageType: function(pagetype) {
    this.template.currentPage.pagetype = pagetype;
    $("#pagetype input:radio").removeAttr('checked');
    $("#pagetype input:radio[value='" + this.template.currentPage.pagetype + "']").prop('checked', true);
    this.updatePageAttributes();
    this.renderPagesList();
    return this.template.setSubject(utils.subject(this.template.currentPage.pagetype));
  },
  updatePageAttributes: function() {
    return this.template.currentPage.updateAttributes();
  },
  isSubjectPage: function() {
    return this.template.currentPage.pagetype === 'subject';
  },
  isStudentPage: function() {
    return this.template.currentPage.pagetype === 'student';
  },
  bindEvents: function() {
    var className, name, ref, results;
    $('#save-exit').click((function(_this) {
      return function() {
        return _this.saveAndExit();
      };
    })(this));
    $('#discard').click((function(_this) {
      return function() {
        return _this.discard();
      };
    })(this));
    $('#save a').click((function(_this) {
      return function() {
        _this.template.save(function() {
          return _this.history.resetSaveChanges();
        });
        return false;
      };
    })(this));
    $('#exit a').click((function(_this) {
      return function() {
        return _this.promptSave();
      };
    })(this));
    $('#viewport').on('mousedown', '.page', (function(_this) {
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
    $('#page-list').on('click', '.page-delete-button', (function(_this) {
      return function(e) {
        return _this.deletePage(Number($(e.currentTarget).attr('data-number')));
      };
    })(this));
    $('#page-list').on('click', '.page-button', (function(_this) {
      return function(e) {
        return _this.switchPage(Number($(e.currentTarget).attr('data-number')));
      };
    })(this));
    $('#add-page').click((function(_this) {
      return function() {
        return _this.addPage();
      };
    })(this));
    this.history.bind('history:ensure-page', (function(_this) {
      return function(page) {
        return _this.switchPage(page);
      };
    })(this));
    this.history.bind('history:change', (function(_this) {
      return function() {
        return _this.updateHistoryButtonState();
      };
    })(this));
    this.history.bind('history:change', (function(_this) {
      return function() {
        return _this.updateSavedButtonState();
      };
    })(this));
    this.bindKeyboardEvents();
    $('#widget-options, .assembly-modal-close').click((function(_this) {
      return function() {
        return _this.toggleGallery();
      };
    })(this));
    window.addEventListener("beforeunload", (function(_this) {
      return function(e) {
        return _this.reminderToSave(e);
      };
    })(this));
    ref = Widget.WIDGETS;
    results = [];
    for (name in ref) {
      className = ref[name];
      results.push((function(_this) {
        return function(className) {
          return $("#add-" + name).click(function() {
            $('#gallery').addClass('hidden');
            setTimeout((function() {
              return $('#gallery').removeClass('hidden');
            }), 500);
            _this.addWidget({
              type: className,
              zIndex: _this.template.currentPage.widgets.length + 1
            });
            return false;
          });
        };
      })(this)(className));
    }
    return results;
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
    Mousetrap.bind(['command+down', 'ctrl+down'], (function(_this) {
      return function() {
        if (_this.selection) {
          _this.selection.nudge(0, _this.NUDGE_SIZE);
        }
        return false;
      };
    })(this));
    Mousetrap.bind(['command+c', 'ctrl+c'], (function(_this) {
      return function() {
        if (_this.currentEditWidget) {
          return true;
        }
        _this.copy();
        return false;
      };
    })(this));
    Mousetrap.bind(['command+v', 'ctrl+v'], (function(_this) {
      return function() {
        if (_this.currentEditWidget) {
          return true;
        }
        _this.paste();
        return false;
      };
    })(this));
    return Mousetrap.bind(['command+d', 'ctrl+d'], (function(_this) {
      return function() {
        if (_this.currentEditWidget) {
          return true;
        }
        _this.duplicate();
        return false;
      };
    })(this));
  },
  addPage: function() {
    this.template.addPage();
    this.template.setCurrentPage(this.template.pages.length - 1);
    this.renderPagesList();
    return false;
  },
  switchPage: function(number) {
    if (this.template.currentPageNumber === number) {
      return;
    }
    this.clearSelection();
    this.clearEditWidget();
    this.template.setCurrentPage(number);
    this.setPageFormFields();
    this.renderPagesList();
    return false;
  },
  deletePage: function(number) {
    this.template.removePage(number);
    this.renderPagesList();
    return false;
  },
  copy: function() {
    if (!this.selection) {
      return;
    }
    return this.clipboard = this.selection.serialize();
  },
  paste: function() {
    var content, widgetConfig, width;
    if (!this.clipboard) {
      return;
    }
    widgetConfig = $.extend({}, this.clipboard);
    content = widgetConfig.type != null ? new window[widgetConfig.type](this, widgetConfig.content) : new TextContent();
    width = widgetConfig.width != null ? widgetConfig.width : this.content.defaultWidth();
    widgetConfig.x = (960 / 2) - (width / 2);
    widgetConfig.y = $('#viewport').scrollTop() + 100;
    return this.addWidget(widgetConfig);
  },
  duplicate: function() {
    var widgetConfig;
    widgetConfig = this.selection.serialize();
    widgetConfig.x = widgetConfig.x + Designer.NUDGE_SIZE * 2;
    widgetConfig.y = widgetConfig.y + Designer.NUDGE_SIZE * 2;
    return this.addWidget(widgetConfig);
  },
  updateNameFromHistory: function(name) {
    this.template.name = name;
    return $('#name').text(name);
  },
  updateName: function() {
    var newName, oldName;
    newName = $('#name').text();
    oldName = this.template.name;
    this.template.name = newName;
    return Designer.history.push(this, 'updateNameFromHistory', oldName, newName);
  },
  select: function(widget) {
    if (this.selection === widget) {
      return true;
    }
    this.selection = widget;
    return this.trigger('selection:change', this.selection);
  },
  clearSelection: function() {
    return this.select(null);
  },
  maybeClearSelection: function(target) {
    if ($('.page').is(target)) {
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
      }, this.template.currentPageNumber);
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
      }, this.template.currentPageNumber);
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
    this.setPageFormFields();
    subject = this.isSubjectPage() ? utils.fakeSubject() : null;
    return this.template.render("layout");
  },
  setPageFormFields: function() {
    $("#orientation input:radio[value='" + this.template.currentPage.orientation + "']").prop('checked', true);
    return $("#pagetype input:radio[value='" + this.template.currentPage.pagetype + "']").prop('checked', true);
  },
  discard: function() {
    return this.exitDesigner();
  },
  clear: function() {
    return this.template.removeAllWidgets();
  },
  promptSave: function() {
    if (this.hasUnsavedChanges()) {
      $('#save-modal').modal();
    } else {
      this.exitDesigner();
    }
    return false;
  },
  hasUnsavedChanges: function() {
    return this.history.hasChangesSinceLastSave() && this.safeToExit !== true;
  },
  reminderToSave: function(e) {
    if (this.hasUnsavedChanges()) {
      (e || window.event).returnValue = Designer.UNSAVED_CHANGES_WARNING;
      return Designer.UNSAVED_CHANGES_WARNING;
    } else {
      return null;
    }
  },
  exitDesigner: function() {
    var redirect;
    this.safeToExit = true;
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
  },
  updateSavedButtonState: function() {
    if (this.history.hasChangesSinceLastSave()) {
      $('#saved-icon').addClass('hidden');
      return $('#save-msg').fadeIn(200);
    } else {
      $('#saved-icon').removeClass('hidden');
      return $('#save-msg').fadeOut(200);
    }
  },
  setWidgetToBack: function(guid) {
    var currentOrder, reorder;
    currentOrder = this.template.getWidgetOrder();
    reorder = _.without(currentOrder, guid);
    reorder.unshift(guid);
    this.template.setWidgetOrder(reorder);
    return Designer.history.push(this, 'undoRedoOrderingWidget', {
      undo: currentOrder
    }, {
      redo: reorder
    }, this.template.currentPageNumber);
  },
  setWidgetBackOne: function(guid) {
    var currentIndex, currentOrder, reorder;
    currentOrder = this.template.getWidgetOrder();
    currentIndex = _.indexOf(currentOrder, guid);
    if (currentIndex !== 0) {
      reorder = _.without(currentOrder, guid);
      reorder.splice(currentIndex - 1, 0, guid);
      this.template.setWidgetOrder(reorder);
      return Designer.history.push(this, 'undoRedoOrderingWidget', {
        undo: currentOrder
      }, {
        redo: reorder
      }, this.template.currentPageNumber);
    }
  },
  setWidgetForwardOne: function(guid) {
    var currentIndex, currentOrder, reorder;
    currentOrder = this.template.getWidgetOrder();
    currentIndex = _.indexOf(currentOrder, guid);
    if (currentIndex !== this.template.currentPage.widgets.length - 1) {
      reorder = _.without(currentOrder, guid);
      reorder.splice(currentIndex + 1, 0, guid);
      this.template.setWidgetOrder(reorder);
      return Designer.history.push(this, 'undoRedoOrderingWidget', {
        undo: currentOrder
      }, {
        redo: reorder
      }, this.template.currentPageNumber);
    }
  },
  setWidgetToFront: function(guid) {
    var currentOrder, reorder;
    currentOrder = this.template.getWidgetOrder();
    reorder = _.without(currentOrder, guid);
    reorder.push(guid);
    this.template.setWidgetOrder(reorder);
    return Designer.history.push(this, 'undoRedoOrderingWidget', {
      undo: currentOrder
    }, {
      redo: reorder
    }, this.template.currentPageNumber);
  },
  undoRedoOrderingWidget: function(action) {
    this.template.setWidgetOrder(action.undo);
    return this.template.setWidgetOrder(action.redo);
  }
};

MicroEvent.mixin(Designer);

$(function() {
  return Designer.init();
});
