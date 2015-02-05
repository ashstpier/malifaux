var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

window.DatatableContent = (function(_super) {
  __extends(DatatableContent, _super);

  function DatatableContent() {
    this.updateMapping = __bind(this.updateMapping, this);
    this.filter_subjects = __bind(this.filter_subjects, this);
    return DatatableContent.__super__.constructor.apply(this, arguments);
  }

  DatatableContent.className = "DatatableContent";

  DatatableContent.displayName = "Subjects Data Table";

  DatatableContent.description = "Showing assessment points, one row per subject.";

  DatatableContent.icon = "book_open";

  DatatableContent.STYLE_DEFAULTS = {
    subject_order: 'alphabetical',
    heading_text_color: '#000000',
    heading_background_color: '#FFFFFF',
    cell_text_color: '#000000',
    cell_background_color_odd: '#FFFFFF',
    cell_background_color_even: '#FFFFFF',
    font: 'Helvetica',
    size: 'Medium'
  };

  DatatableContent.prototype.defaultWidth = function() {
    return 640;
  };

  DatatableContent.prototype.defaultHeight = function() {
    return 480;
  };

  DatatableContent.prototype.initWithConfig = function(config) {
    this.columns = this.get(config.columns, []);
    this.style = $.extend({}, DatatableContent.STYLE_DEFAULTS, this.get(config.style, {}));
    return this._exclusions = this.get(config.exclusions, '');
  };

  DatatableContent.prototype.render_layout = function(data) {
    var col, columnTitles, columnValues, filteredSubjects, i, name, node, subject, _i, _len, _ref;
    name = utils.escape(data.name);
    columnTitles = (function() {
      var _i, _len, _ref, _results;
      _ref = this.columns;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        col = _ref[_i];
        _results.push("<th style=\"" + (this.headingStyles()) + "\">" + col.title + "</th>");
      }
      return _results;
    }).call(this);
    node = $("<table class=\"datatable\" style=\"" + (this.styleString({
      'font-family': utils.fontMap[this.style.font],
      'font-size': utils.sizeMap[this.style.size]
    })) + "\">\n  <thead>\n    <tr>\n      <th style=\"" + (this.headingStyles()) + "\"></th>\n      " + (columnTitles.join("\n")) + "\n    </tr>\n  </thead>\n  <tbody>\n  </tbody>\n</table>");
    filteredSubjects = this.filter_subjects(data.subjects);
    _ref = this.orderdSubjects(filteredSubjects);
    for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
      subject = _ref[i];
      columnValues = (function() {
        var _j, _len1, _ref1, _results;
        _ref1 = this.columns;
        _results = [];
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          col = _ref1[_j];
          _results.push("<td style=\"" + (this.cellStyles(i + 1, this.cellValue(subject, col))) + "\">" + (this.cellContent(subject, col)) + "</td>");
        }
        return _results;
      }).call(this);
      node.find("tbody").append("<tr>\n  <th style=\"" + (this.headingStyles()) + "\">\n    <strong class=\"subject\">" + subject.subjectName + "</strong>\n    <em class=\"teacher\">" + subject.teacherNames + "</em>\n  </th>\n  " + (columnValues.join("\n")) + "\n</tr>");
    }
    return node;
  };

  DatatableContent.prototype.filter_subjects = function(subjects) {
    if (this.widget.subject) {
      return [subjects[this.widget.subject]];
    }
    return _.filter(subjects, (function(_this) {
      return function(subject) {
        var e, exclusions;
        if (!_this._exclusions) {
          return true;
        }
        exclusions = (function() {
          var _i, _len, _ref, _results;
          _ref = this._exclusions.split(",");
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            e = _ref[_i];
            _results.push($.trim(e).toLowerCase());
          }
          return _results;
        }).call(_this);
        return !_.contains(exclusions, subject.subjectName.toLowerCase());
      };
    })(this));
  };

  DatatableContent.prototype.buildEditRow = function(col) {
    var options;
    if (col == null) {
      col = {
        title: '',
        value: '',
        compare_to: '',
        mappings: {}
      };
    }
    if (!col.mappings) {
      col.mappings = {};
    }
    options = (function(_this) {
      return function(val) {
        var point, _i, _len, _ref, _results;
        _ref = _this.assessmentPoints();
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          point = _ref[_i];
          _results.push("<option value=\"" + point.code + "\" " + (point.code === val ? 'selected="selected"' : '') + ">" + point.name + " | " + point.longName + "</option>");
        }
        return _results;
      };
    })(this);
    return "<tr class=\"column-setting\" data-mappings=\"" + (JSON.stringify(col.mappings).replace(/\"/g, '&quot;')) + "\">\n  <td>\n    <input class=\"col-title\" name=\"col-title\" type=\"text\" value=\"" + col.title + "\" placeholder=\"Untitled...\" />\n    <span class=\"col-comp-label\">compared to:</ span>\n  </td>\n  <td>\n    <select class=\"col-value\" name=\"col-value\">\n      <option value=\"\" " + (col.value === "" ? 'selected="selected"' : '') + "></option>\n      " + (options(col.value).join("\n")) + "\n    </select>\n    <select class=\"col-compare-to\" name=\"col-compare-to\">\n      <option value=\"\" " + (col.compare_to === "" ? 'selected="selected"' : '') + "></option>\n      " + (options(col.compare_to).join("\n")) + "\n    </select>\n    <a href=\"#\" class=\"mapping\">" + ($.isEmptyObject(col.mappings) ? 'Add word mappings...' : 'Edit word mappings...') + "</a>\n  </td>\n</tr>";
  };

  DatatableContent.prototype.renderAppearanceOptions = function() {
    return [this.option('font', 'font', "Font"), this.option('size', 'size', "Text Size"), this.option('color', 'heading_text_color', "Heading Text"), this.option('color', 'heading_background_color', "Heading Bg"), this.option('color', 'cell_text_color', "Cell Text"), this.option('color', 'cell_background_color_odd', "Cell Bg Odd"), this.option('color', 'cell_background_color_even', "Cell Bg Even")];
  };

  DatatableContent.prototype.subject_order = DatatableContent.property('style', 'subject_order');

  DatatableContent.prototype.font = DatatableContent.property('style', 'font');

  DatatableContent.prototype.size = DatatableContent.property('style', 'size');

  DatatableContent.prototype.heading_text_color = DatatableContent.property('style', 'heading_text_color');

  DatatableContent.prototype.heading_background_color = DatatableContent.property('style', 'heading_background_color');

  DatatableContent.prototype.cell_text_color = DatatableContent.property('style', 'cell_text_color');

  DatatableContent.prototype.cell_background_color_odd = DatatableContent.property('style', 'cell_background_color_odd');

  DatatableContent.prototype.cell_background_color_even = DatatableContent.property('style', 'cell_background_color_even');

  DatatableContent.prototype.exclusions = DatatableContent.property('_exclusions');

  DatatableContent.prototype.renderConfigOptions = function() {
    return [
      this.option('select', 'subject_order', "Subject Order", {
        options: {
          alphabetical: "Alphabetical",
          core_first: 'Core First'
        }
      }), this.columSettings(), this.option('text', 'exclusions', 'Subject Blacklist', {
        hint: "A comma seperated, case insensitive, list of subject names to be excluded from reports."
      })
    ];
  };

  DatatableContent.prototype.columSettings = function() {
    var col, columnChanged, node, self, table, _i, _len, _ref;
    node = $("<div class=\"datatable-cols prop-table-config\">\n  <h4>Columns</h4>\n  <div class=\"prop-table-wrap\">\n    <table>\n      <thead>\n        <tr>\n          <th>Title</th>\n          <th>Value</th>\n        </tr>\n      </thead>\n      <tbody class=\"edit-rows\">\n      </tbody>\n    </table>\n  </div>\n</div>");
    table = node.find('.edit-rows');
    _ref = this.columns;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      col = _ref[_i];
      table.append(this.buildEditRow(col));
    }
    table.append(this.buildEditRow());
    columnChanged = (function(_this) {
      return function() {
        console.log('option changed');
        _this.maybeAddEditRow(table);
        _this.saveColumns(table);
        return _this.redraw();
      };
    })(this);
    table.on("input", ".col-title", columnChanged);
    table.on("change", ".col-value, .col-compare-to", columnChanged);
    self = this;
    table.on("click", ".mapping", function() {
      var element, mappingIndex, mappings;
      element = this;
      mappingIndex = $(this).parents('.column-setting').index();
      mappings = $(element).parents(".edit-rows").find(".column-setting:eq(" + mappingIndex + ")").data('mappings');
      return new MappingModal(mappings, (function(_this) {
        return function(newMappings) {
          return self.updateMapping(mappingIndex, newMappings);
        };
      })(this));
    });
    return node;
  };

  DatatableContent.prototype.updateMapping = function(index, newMappings) {
    var editrows;
    editrows = $(".edit-rows");
    editrows.find(".column-setting:eq(" + index + ")").data('mappings', newMappings);
    this.saveColumns(editrows);
    return this.redraw();
  };

  DatatableContent.prototype.headingStyles = function() {
    return this.styleString({
      'background-color': this.style.heading_background_color,
      color: this.style.heading_text_color
    });
  };

  DatatableContent.prototype.cellStyles = function(row, content) {
    var bg_color, text_align;
    bg_color = row % 2 === 0 ? this.style.cell_background_color_even : this.style.cell_background_color_odd;
    text_align = content.split(' ').length > 1 ? 'left' : 'center';
    return this.styleString({
      'background-color': bg_color,
      color: this.style.cell_text_color,
      'text-align': text_align
    });
  };

  DatatableContent.prototype.cellValue = function(subject, col) {
    var originalValue, _ref, _ref1;
    originalValue = ((_ref = subject.results) != null ? _ref[col.value] : void 0) || '';
    return ((_ref1 = col.mappings) != null ? _ref1[originalValue] : void 0) || originalValue || this.placeholderWithLabel(col.value);
  };

  DatatableContent.prototype.cellContent = function(subject, col) {
    var compareTo, numVal, tlClass, val, _ref, _ref1;
    val = this.cellValue(subject, col);
    if (!(col.compare_to && col.compare_to.length > 0)) {
      return val;
    }
    numVal = ((_ref = subject.internalPoints) != null ? _ref[col.value] : void 0) || 0;
    compareTo = ((_ref1 = subject.internalPoints) != null ? _ref1[col.compare_to] : void 0) || 0;
    tlClass = 'amber';
    if (numVal < compareTo) {
      tlClass = 'red';
    }
    if (numVal > compareTo) {
      tlClass = 'green';
    }
    return "<span class=\"traffic-light " + tlClass + "\"></span>";
  };

  DatatableContent.prototype.maybeAddEditRow = function(el) {
    var lastRow, rows;
    rows = el.find('.column-setting');
    lastRow = $(rows[rows.length - 1]);
    if (lastRow.find('.col-value').val() !== '') {
      return lastRow.after(this.buildEditRow());
    }
  };

  DatatableContent.prototype.saveColumns = function(el) {
    var $col, col, columns, oldColumns;
    oldColumns = this.columns;
    columns = (function() {
      var _i, _len, _ref, _results;
      _ref = el.find('.column-setting');
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        col = _ref[_i];
        $col = $(col);
        _results.push({
          title: $col.find('.col-title').val(),
          value: $col.find('.col-value').val(),
          compare_to: $col.find('.col-compare-to').val(),
          mappings: $col.data('mappings')
        });
      }
      return _results;
    })();
    this.columns = (function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = columns.length; _i < _len; _i++) {
        col = columns[_i];
        if ((col.value != null) && col.value !== '') {
          _results.push(col);
        }
      }
      return _results;
    })();
    return Designer.history.push(this, 'setColumnsFromUndo', oldColumns, this.columns);
  };

  DatatableContent.prototype.setColumnsFromUndo = function(cols) {
    this.columns = cols;
    this.redraw();
    return Designer.select(this.widget);
  };

  DatatableContent.prototype.orderdSubjects = function(subjects) {
    var alphabetical, k, rank, v;
    subjects = (function() {
      var _results;
      _results = [];
      for (k in subjects) {
        v = subjects[k];
        _results.push(v);
      }
      return _results;
    })();
    alphabetical = subjects.sort((function(_this) {
      return function(a, b) {
        if (a.subjectName >= b.subjectName) {
          return 1;
        } else {
          return -1;
        }
      };
    })(this));
    if (this.style.subject_order === 'alphabetical') {
      return alphabetical;
    }
    rank = {
      'english': 1,
      'maths': 2,
      'mathematics': 2,
      'science': 3
    };
    return _.sortBy(alphabetical, function(subject) {
      var name;
      name = subject.subjectName.toLowerCase();
      if (rank[name]) {
        return rank[name];
      } else {
        return name.charCodeAt(0);
      }
    });
  };

  DatatableContent.prototype.serialize = function() {
    return {
      columns: this.columns,
      style: this.style,
      exclusions: this._exclusions
    };
  };

  return DatatableContent;

})(WidgetContent);
