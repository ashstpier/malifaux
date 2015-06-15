var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

window.DatatableContent = (function(superClass) {
  extend(DatatableContent, superClass);

  function DatatableContent() {
    this.updateMapping = bind(this.updateMapping, this);
    this.filter_subjects = bind(this.filter_subjects, this);
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
    this._exclusions = this.get(config.exclusions, []);
    if (typeof this._exclusions === 'string') {
      return this._exclusions = this.upgradeStringBasedExclusions(this._exclusions);
    }
  };

  DatatableContent.prototype.render_layout = function(data) {
    var col, columnTitles, columnValues, filteredSubjects, i, j, len, name, node, ref, subject;
    name = utils.escape(data.name);
    columnTitles = (function() {
      var j, len, ref, results;
      ref = this.columns;
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        col = ref[j];
        results.push("<th style=\"" + (this.headingStyles()) + "\">" + col.title + "</th>");
      }
      return results;
    }).call(this);
    node = $("<table class=\"datatable\" style=\"" + (this.styleString({
      'font-family': utils.fontMap[this.style.font],
      'font-size': utils.sizeMap[this.style.size]
    })) + "\">\n  <thead>\n    <tr>\n      <th style=\"" + (this.headingStyles()) + "\"></th>\n      " + (columnTitles.join("\n")) + "\n    </tr>\n  </thead>\n  <tbody>\n  </tbody>\n</table>");
    filteredSubjects = this.filter_subjects(data.subjects);
    ref = this.orderdSubjects(filteredSubjects);
    for (i = j = 0, len = ref.length; j < len; i = ++j) {
      subject = ref[i];
      columnValues = (function() {
        var l, len1, ref1, results;
        ref1 = this.columns;
        results = [];
        for (l = 0, len1 = ref1.length; l < len1; l++) {
          col = ref1[l];
          results.push("<td style=\"" + (this.cellStyles(i + 1, this.cellValue(subject, col))) + "\">" + (this.cellContent(subject, col)) + "</td>");
        }
        return results;
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
      return function(subject, code) {
        if (!_this.exclusions()) {
          return true;
        }
        return !_.contains(_this.exclusions(), code);
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
        var j, len, point, ref, results;
        ref = _this.assessmentPoints();
        results = [];
        for (j = 0, len = ref.length; j < len; j++) {
          point = ref[j];
          results.push("<option value=\"" + point.code + "\" " + (point.code === val ? 'selected="selected"' : '') + ">" + point.name + " | " + point.longName + "</option>");
        }
        return results;
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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> Add tabs and styling
=======
>>>>>>> Add tabs and styling
      this.columSettings(), this.option('select', 'exclusions', 'Subject Blacklist', {
        options: API.subjects(),
        multiple: true,
        hint: "A list of subjects names to be excluded from reports. Hold the shift or command keys for multiple selection."
      }), this.option('select', 'subject_order', "Subject Order", {
<<<<<<< HEAD
<<<<<<< HEAD
=======
      this.option('select', 'subject_order', "Subject Order", {
>>>>>>> Add tabs and styling
=======
>>>>>>> Add tabs and styling
=======
=======
      this.option('select', 'subject_order', "Subject Order", {
>>>>>>> Add tabs and styling
>>>>>>> Add tabs and styling
        options: {
          alphabetical: "Alphabetical",
          core_first: 'Core First'
        }
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> Add tabs and styling
=======
      }), this.columSettings(), this.option('select', 'exclusions', 'Subject Blacklist', {
        options: API.subjects(),
        multiple: true,
        hint: "A list of subjects names to be excluded from reports. Hold the shift or command keys for multiple selection."
>>>>>>> Add tabs and styling
<<<<<<< HEAD
=======
>>>>>>> Add tabs and styling
=======
>>>>>>> Add tabs and styling
      })
    ];
  };

  DatatableContent.prototype.columSettings = function() {
    var col, columnChanged, j, len, node, ref, self, table;
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
    node = $("<div class=\"datatable-cols prop-table-config\">\n  <h4>Table data</h4>\n  <div class=\"prop-table-wrap\">\n    <table>\n      <thead>\n        <tr>\n          <th>Title</th>\n          <th>Value</th>\n        </tr>\n      </thead>\n      <tbody class=\"edit-rows\">\n      </tbody>\n    </table>\n  </div>\n</div>");
=======
    node = $("<div class=\"datatable-cols prop-table-config\">\n  <h4>Columns</h4>\n  <div class=\"prop-table-wrap\">\n    <table>\n      <thead>\n        <tr>\n          <th>Title</th>\n          <th>Value</th>\n        </tr>\n      </thead>\n      <tbody class=\"edit-rows\">\n      </tbody>\n    </table>\n  </div>\n</div>");
>>>>>>> Add tabs and styling
=======
    node = $("<div class=\"datatable-cols prop-table-config\">\n  <h4>Table data</h4>\n  <div class=\"prop-table-wrap\">\n    <table>\n      <thead>\n        <tr>\n          <th>Title</th>\n          <th>Value</th>\n        </tr>\n      </thead>\n      <tbody class=\"edit-rows\">\n      </tbody>\n    </table>\n  </div>\n</div>");
=======
    node = $("<div class=\"datatable-cols prop-table-config\">\n  <h4>Table data</h4>\n  <div class=\"prop-table-wrap\">\n    <table>\n      <thead>\n        <tr>\n          <th>Title</th>\n          <th>Value</th>\n        </tr>\n      </thead>\n      <tbody class=\"edit-rows\">\n      </tbody>\n    </table>\n  </div>\n</div>");
=======
    node = $("<div class=\"datatable-cols prop-table-config\">\n  <h4>Columns</h4>\n  <div class=\"prop-table-wrap\">\n    <table>\n      <thead>\n        <tr>\n          <th>Title</th>\n          <th>Value</th>\n        </tr>\n      </thead>\n      <tbody class=\"edit-rows\">\n      </tbody>\n    </table>\n  </div>\n</div>");
>>>>>>> Add tabs and styling
>>>>>>> Add tabs and styling
    table = node.find('.edit-rows');
    ref = this.columns;
    for (j = 0, len = ref.length; j < len; j++) {
      col = ref[j];
      table.append(this.buildEditRow(col));
    }
    table.append(this.buildEditRow());
    columnChanged = (function(_this) {
      return function() {
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
    var originalValue, ref, ref1;
    originalValue = ((ref = subject.results) != null ? ref[col.value] : void 0) || '';
    return ((ref1 = col.mappings) != null ? ref1[originalValue] : void 0) || originalValue || this.placeholderWithLabel(col.value);
  };

  DatatableContent.prototype.cellContent = function(subject, col) {
    var compareTo, numVal, ref, ref1, tlClass, val;
    val = this.cellValue(subject, col);
    if (!(col.compare_to && col.compare_to.length > 0)) {
      return val;
    }
    numVal = ((ref = subject.internalPoints) != null ? ref[col.value] : void 0) || 0;
    compareTo = ((ref1 = subject.internalPoints) != null ? ref1[col.compare_to] : void 0) || 0;
    if (numVal > compareTo) {
      tlClass = 'dark-green';
    }
    if (numVal === compareTo) {
      tlClass = 'light-green';
    }
    if (numVal === compareTo - 1) {
      tlClass = 'amber';
    }
    if (numVal < compareTo - 1) {
      tlClass = 'red';
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
      var j, len, ref, results;
      ref = el.find('.column-setting');
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        col = ref[j];
        $col = $(col);
        results.push({
          title: $col.find('.col-title').val(),
          value: $col.find('.col-value').val(),
          compare_to: $col.find('.col-compare-to').val(),
          mappings: $col.data('mappings')
        });
      }
      return results;
    })();
    this.columns = (function() {
      var j, len, results;
      results = [];
      for (j = 0, len = columns.length; j < len; j++) {
        col = columns[j];
        if ((col.value != null) && col.value !== '') {
          results.push(col);
        }
      }
      return results;
    })();
<<<<<<< HEAD
<<<<<<< HEAD
    return Designer.history.push(this, 'setColumnsFromUndo', oldColumns, this.columns);
=======
    return Designer.history.push(this, 'setColumnsFromUndo', oldColumns, this.columns, Designer.template.currentPageNumber);
>>>>>>> Add tabs and styling
=======
    return Designer.history.push(this, 'setColumnsFromUndo', oldColumns, this.columns);
>>>>>>> Add tabs and styling
  };

  DatatableContent.prototype.setColumnsFromUndo = function(cols) {
    this.columns = cols;
    this.redraw();
    return Designer.select(this.widget);
  };

  DatatableContent.prototype.orderdSubjects = function(subjects) {
    var alphabetical, k, rank, v;
    subjects = (function() {
      var results;
      results = [];
      for (k in subjects) {
        v = subjects[k];
        results.push(v);
      }
      return results;
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

  DatatableContent.prototype.upgradeStringBasedExclusions = function(exclusionsString) {
    var exclusions, k, newExclusions, subjects, v;
    newExclusions = exclusionsString.split(',');
    subjects = $.extend({}, API.subjects());
    for (k in subjects) {
      v = subjects[k];
      subjects[k] = v.toLowerCase();
    }
    subjects = _.invert(subjects);
    exclusions = _.map(newExclusions, function(e) {
      return subjects[$.trim(e.toLowerCase())];
    });
    return _.compact(exclusions);
  };

  return DatatableContent;

})(WidgetContent);
