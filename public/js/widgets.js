(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  window.AttendanceContent = (function(superClass) {
    extend(AttendanceContent, superClass);

    function AttendanceContent() {
      return AttendanceContent.__super__.constructor.apply(this, arguments);
    }

    AttendanceContent.className = "AttendanceContent";

    AttendanceContent.displayName = "Attendance Chart";

    AttendanceContent.description = "Show a visual representation of student attendance.";

    AttendanceContent.icon = "bell";

    AttendanceContent.prototype.defaultWidth = function() {
      return 400;
    };

    AttendanceContent.prototype.defaultHeight = function() {
      return 300;
    };

    AttendanceContent.STYLE_DEFAULTS = {
      color1: '#77cc33',
      color2: '#cc0000',
      color3: '#e67e22',
      color4: '#9b59b6',
      chartstyle: 'bar',
      color: '#000000',
      font: 'Helvetica',
      size: 'Medium'
    };

    AttendanceContent.prototype.initWithConfig = function(config) {
      this.style = $.extend({}, AttendanceContent.STYLE_DEFAULTS, this.get(config.style, {}));
      this.options = this.get(config.options, {});
      this.labels = this.get(config.labels, ['Present', 'Late', 'Authorised', 'Unauthorised']);
      this._label1 = this.labels[0];
      this._label2 = this.labels[1];
      this._label3 = this.labels[2];
      return this._label4 = this.labels[3];
    };

    AttendanceContent.prototype.render_layout = function(data) {
      this.widget.bind('widget:move', (function(_this) {
        return function() {
          return _this.drawChart();
        };
      })(this));
      this.attendance = data.attendance;
      google.load('visualization', '1.0', {
        'packages': ['corechart'],
        callback: (function(_this) {
          return function() {
            return _this.drawChart();
          };
        })(this)
      });
      return $("<div class=\"attendance-widget\"></div>");
    };

    AttendanceContent.prototype.renderConfigOptions = function() {
      return [this.option('text', 'label1', "Present label"), this.option('text', 'label2', "Late label"), this.option('text', 'label3', "Authorised label"), this.option('text', 'label4', "Unauthorised label")];
    };

    AttendanceContent.prototype.renderAppearanceOptions = function() {
      return [
        this.option('color', 'color1', "Present"), this.option('color', 'color2', "Late"), this.option('color', 'color3', "Authorised"), this.option('color', 'color4', "Unauthorised"), this.option('select', 'chartstyle', "Chart style", {
          options: {
            bar: 'Bar',
            pie: 'Pie'
          }
        }), this.option('font', 'font', "Font"), this.option('size', 'size', "Text Size"), this.option('color', 'color', "Text Color")
      ];
    };

    AttendanceContent.prototype.drawChart = function() {
      var chart, chart_area, data, fontSize, label_position;
      fontSize = parseInt(utils.sizeMap[this.style.size]);
      label_position = 'right';
      if (this.style.chartstyle === 'pie') {
        chart_area = {
          left: 0,
          top: 0,
          width: '100%',
          height: '100%'
        };
        data = google.visualization.arrayToDataTable([
          [
            'Attendance', 'Percent', {
              role: 'style'
            }
          ], [this._label1 + " " + (parseFloat(this.attendance.present)) + "%", parseFloat(this.attendance.present), this.style.color1], [this._label2 + " " + (parseFloat(this.attendance.late)) + "%", parseFloat(this.attendance.late), this.style.color2], [this._label3 + " " + (parseFloat(this.attendance.authorised)) + "%", parseFloat(this.attendance.authorised), this.style.color3], [this._label4 + " " + (parseFloat(this.attendance.nonAuthorised)) + "%", parseFloat(this.attendance.nonAuthorised), this.style.color4]
        ]);
      } else {
        chart_area = {
          left: '10%',
          top: '10%',
          width: '50%',
          height: '80%'
        };
        data = google.visualization.arrayToDataTable([['Attendance', this._label1 + " " + (parseFloat(this.attendance.present)) + "%", this._label2 + " " + (parseFloat(this.attendance.late)) + "%", this._label3 + " " + (parseFloat(this.attendance.authorised)) + "%", this._label4 + " " + (parseFloat(this.attendance.nonAuthorised)) + "%"], ['', parseFloat(this.attendance.present), parseFloat(this.attendance.late), parseFloat(this.attendance.authorised), parseFloat(this.attendance.nonAuthorised)]]);
      }
      this.options = {
        width: this.widget.width(),
        height: this.widget.height(),
        colors: [this.style.color1, this.style.color2, this.style.color3, this.style.color4],
        chartArea: chart_area,
        pieSliceBorderColor: 'transparent',
        enableInteractivity: false,
        fontSize: fontSize,
        fontName: utils.fontMap[this.style.font],
        titleTextStyle: {
          color: this.style.color,
          fontSize: fontSize
        },
        legend: {
          textStyle: {
            color: this.style.color
          },
          position: label_position,
          maxLines: 3
        },
        backgroundColor: {
          fill: 'transparent'
        },
        isStacked: true,
        vAxis: {
          gridlines: {
            count: 11
          }
        }
      };
      if (this.style.chartstyle === 'pie') {
        chart = new google.visualization.PieChart(this.el[0]);
        return chart.draw(data, this.options);
      } else {
        chart = new google.visualization.ColumnChart(this.el[0]);
        return chart.draw(data, this.options);
      }
    };

    AttendanceContent.prototype.color1 = AttendanceContent.property('style', 'color1');

    AttendanceContent.prototype.color2 = AttendanceContent.property('style', 'color2');

    AttendanceContent.prototype.color3 = AttendanceContent.property('style', 'color3');

    AttendanceContent.prototype.color4 = AttendanceContent.property('style', 'color4');

    AttendanceContent.prototype.chartstyle = AttendanceContent.property('style', 'chartstyle');

    AttendanceContent.prototype.font = AttendanceContent.property('style', 'font');

    AttendanceContent.prototype.size = AttendanceContent.property('style', 'size');

    AttendanceContent.prototype.color = AttendanceContent.property('style', 'color');

    AttendanceContent.prototype.label1 = AttendanceContent.property('_label1');

    AttendanceContent.prototype.label2 = AttendanceContent.property('_label2');

    AttendanceContent.prototype.label3 = AttendanceContent.property('_label3');

    AttendanceContent.prototype.label4 = AttendanceContent.property('_label4');

    AttendanceContent.prototype.serialize = function() {
      return {
        columns: this.columns,
        style: this.style,
        options: this.options,
        labels: [this._label1, this._label2, this._label3, this._label4]
      };
    };

    return AttendanceContent;

  })(WidgetContent);

}).call(this);

(function() {
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
        this.option('select', 'subject_order', "Subject Order", {
          options: {
            alphabetical: "Alphabetical",
            core_first: 'Core First'
          }
        }), this.columSettings(), this.option('select', 'exclusions', 'Subject Blacklist', {
          options: API.subjects(),
          multiple: true,
          hint: "A list of subjects names to be excluded from reports. Hold the shift or command keys for multiple selection."
        })
      ];
    };

    DatatableContent.prototype.columSettings = function() {
      var col, columnChanged, j, len, node, ref, self, table;
      node = $("<div class=\"datatable-cols prop-table-config\">\n  <h4>Columns</h4>\n  <div class=\"prop-table-wrap\">\n    <table>\n      <thead>\n        <tr>\n          <th>Title</th>\n          <th>Value</th>\n        </tr>\n      </thead>\n      <tbody class=\"edit-rows\">\n      </tbody>\n    </table>\n  </div>\n</div>");
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

}).call(this);

(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  window.FieldContent = (function(superClass) {
    extend(FieldContent, superClass);

    function FieldContent() {
      this.updateMapping = bind(this.updateMapping, this);
      this.changeMapping = bind(this.changeMapping, this);
      return FieldContent.__super__.constructor.apply(this, arguments);
    }

    FieldContent.className = "FieldContent";

    FieldContent.displayName = "Dynamic Text";

    FieldContent.description = "Pull a text field from a student record and style it for display.";

    FieldContent.icon = "nameplate";

    FieldContent.prototype.defaultWidth = function() {
      return 200;
    };

    FieldContent.prototype.defaultHeight = function() {
      return 50;
    };

    FieldContent.STYLE_DEFAULTS = {
      color: '#000000',
      font: 'Helvetica',
      size: 'Medium'
    };

    FieldContent.prototype.initWithConfig = function(config) {
      this._field = this.get(config.field, Object.keys(this.metrics())[0]);
      this.style = $.extend({}, FieldContent.STYLE_DEFAULTS, this.get(config.style, {}));
      return this.mappings = this.get(config.mappings, {});
    };

    FieldContent.prototype.render_layout = function(data) {
      return $("<div class=\"field-widget\" style=\"" + (this.textStyles()) + "\">" + (this.fieldFrom(data)) + "</div>");
    };

    FieldContent.prototype.renderAppearanceOptions = function() {
      return this.option('font', 'font', "Font") + this.option('size', 'size', "Text Size") + this.option('color', 'color', "Text Color");
    };

    FieldContent.prototype.renderConfigOptions = function() {
      return [
        this.option('select', 'field', "Field", {
          options: this.metrics(),
          hint: "This is the CCR! field you would like to be merged, the data shown is only a sample of the final output."
        }), this.mappingSettings()
      ];
    };

    FieldContent.prototype.mappingSettings = function() {
      var node, self;
      node = $("<div class=\"mapping-option\"><a href=\"#\" class=\"mapping\">" + ($.isEmptyObject(this.mappings) ? 'Add word mappings...' : 'Edit word mappings...') + "</a></div>");
      self = this;
      node.on("click", ".mapping", (function(_this) {
        return function() {
          return new MappingModal(_this.mappings, _this.changeMapping);
        };
      })(this));
      return node;
    };

    FieldContent.prototype.changeMapping = function(newMappings) {
      var oldMappings;
      oldMappings = this.mappings;
      this.updateMapping(newMappings);
      return Designer.history.push(this, 'updateMapping', oldMappings, newMappings);
    };

    FieldContent.prototype.updateMapping = function(mappings) {
      this.mappings = mappings;
      return this.redraw();
    };

    FieldContent.prototype.textStyles = function() {
      return this.styleString({
        'color': this.style.color,
        'font-family': utils.fontMap[this.style.font],
        'font-size': utils.sizeMap[this.style.size]
      });
    };

    FieldContent.prototype.fieldFrom = function(data) {
      var i, key, len, ref;
      ref = this._field.split('.');
      for (i = 0, len = ref.length; i < len; i++) {
        key = ref[i];
        data = data != null ? data[key] : void 0;
      }
      return this.mappings[data] || data || this.placeholderWithLabel(key);
    };

    FieldContent.prototype.font = FieldContent.property('style', 'font');

    FieldContent.prototype.size = FieldContent.property('style', 'size');

    FieldContent.prototype.color = FieldContent.property('style', 'color');

    FieldContent.prototype.field = FieldContent.property('_field');

    FieldContent.prototype.serialize = function() {
      return {
        field: this._field,
        style: this.style,
        mappings: this.mappings
      };
    };

    return FieldContent;

  })(WidgetContent);

}).call(this);

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  window.ImageGalleryContent = (function(superClass) {
    extend(ImageGalleryContent, superClass);

    function ImageGalleryContent() {
      return ImageGalleryContent.__super__.constructor.apply(this, arguments);
    }

    ImageGalleryContent.className = "ImageGalleryContent";

    ImageGalleryContent.displayName = "Dynamic Images";

    ImageGalleryContent.description = "A dynamic photograph, logo or graphic";

    ImageGalleryContent.icon = "picture";

    ImageGalleryContent.prototype.editable = function() {
      return this.widget.currentMode === 'layout';
    };

    ImageGalleryContent.prototype.initWithConfig = function(config) {
      this._field = this.get(config.field, Object.keys(this.images())[0]);
      return this._stretchImage = this.get(config.stretchImage, true);
    };

    ImageGalleryContent.prototype.bindEvents = function(el) {
      return this.widget.bind('widget:resize', (function(_this) {
        return function() {
          return _this.imageCSS();
        };
      })(this));
    };

    ImageGalleryContent.prototype.imageCSS = function() {
      $('.image-gallery-widget img').removeClass(this.cssImageClass);
      this.calcImageCSS();
      return $('.image-gallery-widget img').addClass(this.cssImageClass);
    };

    ImageGalleryContent.prototype.calcImageCSS = function() {
      if (this.width >= this.height && (this.stretchImage() || this.width > this.widget.width())) {
        return this.cssImageClass = 'wider';
      } else if (this.height > this.width && (this.stretchImage() || this.height > this.widget.height())) {
        return this.cssImageClass = 'taller';
      } else {
        return this.cssImageClass = '';
      }
    };

    ImageGalleryContent.prototype.render_layout = function(data) {
      var img;
      img = new Image();
      img.src = "data:image/gif;base64," + (this.fieldFrom(data));
      img.width / img.height;
      this.width = img.width;
      this.height = img.height;
      this.calcImageCSS();
      if (this.editable()) {
        setTimeout(((function(_this) {
          return function() {
            return _this.setAspectRatio(1);
          };
        })(this)), 0);
      }
      return $("<div class=\"image-gallery-widget\">\n  <img class=\"content " + this.cssImageClass + "\" src=\"" + img.src + "\">\n</div>");
    };

    ImageGalleryContent.prototype.renderConfigOptions = function() {
      return [
        this.option('checkbox', 'stretchImage', "Stretch Image"), this.option('select', 'field', "Field", {
          options: this.images(),
          hint: "This is the gallery image you would like to be merged, the image shown is only a placeholder of the final output."
        })
      ];
    };

    ImageGalleryContent.prototype.stretchImage = ImageGalleryContent.property('_stretchImage');

    ImageGalleryContent.prototype.fieldFrom = function(data) {
      var i, key, len, ref, ref1, results;
      ref = this._field.split('.');
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        key = ref[i];
        results.push(data = (ref1 = data['images']) != null ? ref1[key] : void 0);
      }
      return results;
    };

    ImageGalleryContent.prototype.field = ImageGalleryContent.property('_field');

    ImageGalleryContent.prototype.serialize = function() {
      return {
        field: this._field,
        stretchImage: this.stretchImage()
      };
    };

    return ImageGalleryContent;

  })(WidgetContent);

}).call(this);

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  window.NameContent = (function(superClass) {
    extend(NameContent, superClass);

    function NameContent() {
      return NameContent.__super__.constructor.apply(this, arguments);
    }

    NameContent.className = "NameContent";

    NameContent.displayName = "Student Name";

    NameContent.description = "Name of the student in the format \"last, first\"";

    NameContent.icon = "girl";

    NameContent.active = false;

    return NameContent;

  })(FieldContent);

}).call(this);

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  window.ShapeContent = (function(superClass) {
    extend(ShapeContent, superClass);

    function ShapeContent() {
      return ShapeContent.__super__.constructor.apply(this, arguments);
    }

    ShapeContent.className = "ShapeContent";

    ShapeContent.displayName = "Shape";

    ShapeContent.description = "A simple shape to be used for drawing.";

    ShapeContent.icon = "vector_path_square";

    ShapeContent.prototype.defaultWidth = function() {
      return 200;
    };

    ShapeContent.prototype.defaultHeight = function() {
      return 200;
    };

    ShapeContent.border_widths = {
      "0": "none",
      "1": "1",
      "3": "3",
      "5": "5",
      "8": "8",
      "10": "10",
      "15": "15"
    };

    ShapeContent.STYLE_DEFAULTS = {
      fill_color: '#CCCCCC',
      stroke_color: '#888888',
      stroke_width: '0',
      shape: 'rectangle',
      border_radius: '0'
    };

    ShapeContent.prototype.fill_color = ShapeContent.property('style', 'fill_color');

    ShapeContent.prototype.stroke_color = ShapeContent.property('style', 'stroke_color');

    ShapeContent.prototype.stroke_width = ShapeContent.property('style', 'stroke_width');

    ShapeContent.prototype.shape = ShapeContent.property('style', 'shape');

    ShapeContent.prototype.border_radius = ShapeContent.property('style', 'border_radius');

    ShapeContent.prototype.maintainAspectRatio = ShapeContent.property('_maintainAspectRatio');

    ShapeContent.prototype.initWithConfig = function(config) {
      return this.style = $.extend({}, ShapeContent.STYLE_DEFAULTS, this.get(config.style, {}));
    };

    ShapeContent.prototype.renderAppearanceOptions = function() {
      return [
        this.option('select', 'shape', "Shape", {
          options: {
            rectangle: "Rectangle",
            ellipse: "Ellipse"
          }
        }), this.option('color', 'fill_color', "Fill colour"), this.option('color', 'stroke_color', "Border colour"), this.option('select', 'stroke_width', "Border width", {
          options: ShapeContent.border_widths
        }), this.option('select', 'border_radius', "Corner radius", {
          options: ShapeContent.border_widths
        })
      ];
    };

    ShapeContent.prototype.renderConfigOptions = function() {
      return [this.option('checkbox', 'maintainAspectRatio', "Maintain Aspect Ratio")];
    };

    ShapeContent.prototype.render_layout = function() {
      if (this.maintainAspectRatio()) {
        this.setAspectRatio(1);
      } else {
        setTimeout(((function(_this) {
          return function() {
            return _this.setAspectRatio(0);
          };
        })(this)), 0);
      }
      if (this.style.shape === 'rectangle') {
        return $("<svg width='100%' height='100%'> <rect x='" + (this.style.stroke_width / 1.6) + "%' y='" + (this.style.stroke_width / 1.6) + "%' width='" + (100 - this.style.stroke_width / 0.8) + "%' height='" + (100 - this.style.stroke_width / 0.8) + "%' rx='" + this.style.border_radius + "' ry='" + this.style.border_radius + "' style='fill:" + this.style.fill_color + ";stroke-width:" + this.style.stroke_width + ";stroke:" + this.style.stroke_color + "' /> </svg>");
      } else {
        return $("<svg height='100%' width='100%'> <ellipse cx='50%' cy='50%' rx='" + (45 - this.style.stroke_width / 1.8) + "%' ry='" + (45 - this.style.stroke_width / 1.8) + "%' stroke='" + this.style.stroke_color + "' stroke-width='" + this.style.stroke_width + "' fill='" + this.style.fill_color + "' /> </svg>");
      }
    };

    ShapeContent.prototype.serialize = function() {
      return {
        style: this.style,
        maintainAspectRatio: this.maintainAspectRatio()
      };
    };

    return ShapeContent;

  })(WidgetContent);

}).call(this);

(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  window.SubjectFieldContent = (function(superClass) {
    extend(SubjectFieldContent, superClass);

    function SubjectFieldContent() {
      this.updateMapping = bind(this.updateMapping, this);
      this.changeMapping = bind(this.changeMapping, this);
      return SubjectFieldContent.__super__.constructor.apply(this, arguments);
    }

    SubjectFieldContent.className = "SubjectFieldContent";

    SubjectFieldContent.displayName = "Subject Dynamic Text";

    SubjectFieldContent.description = "Pull a text field from a specific subject and style it for display.";

    SubjectFieldContent.icon = "book";

    SubjectFieldContent.prototype.defaultWidth = function() {
      return 280;
    };

    SubjectFieldContent.prototype.defaultHeight = function() {
      return 80;
    };

    SubjectFieldContent.prototype.initWithConfig = function(config) {
      SubjectFieldContent.__super__.initWithConfig.call(this, config);
      this._subject = this.get(config.subject, 'PH');
      this._field = this.get(config.field, 'subjectName');
      return this.mappings = this.get(config.mappings, {});
    };

    SubjectFieldContent.prototype.render_layout = function(data) {
      return $("<div class=\"subject-field-widget\" style=\"" + (this.textStyles()) + "\">" + (this.fieldFrom(data)) + "</div>");
    };

    SubjectFieldContent.prototype.renderConfigOptions = function() {
      var fields, i, len, options, point, ref;
      fields = {
        "Subject": [['subjectName', 'Subject Name'], ['teacherNames', 'Teacher Names'], ['teachingGroupCode', 'Teaching Group Code']],
        "Results": []
      };
      ref = this.assessmentPoints();
      for (i = 0, len = ref.length; i < len; i++) {
        point = ref[i];
        fields.Results.push([point.code, point.longName]);
      }
      options = [
        this.option('select', 'field', "Field", {
          options: fields,
          hint: "This is the CCR! field you would like to be merged, the data shown is only a sample of the final output."
        }), this.mappingSettings()
      ];
      if (this.widget.subject === null) {
        options.unshift(this.option('select', 'subject', "Subject", {
          options: API.subjects()
        }));
      }
      return options;
    };

    SubjectFieldContent.prototype.mappingSettings = function() {
      var node, self;
      node = $("<div class=\"mapping-option\"><a href=\"#\" class=\"mapping\">" + ($.isEmptyObject(this.mappings) ? 'Add word mappings...' : 'Edit word mappings...') + "</a></div>");
      self = this;
      node.on("click", ".mapping", (function(_this) {
        return function() {
          return new MappingModal(_this.mappings, _this.changeMapping);
        };
      })(this));
      return node;
    };

    SubjectFieldContent.prototype.changeMapping = function(newMappings) {
      var oldMappings;
      oldMappings = this.mappings;
      this.updateMapping(newMappings);
      return Designer.history.push(this, 'updateMapping', oldMappings, newMappings);
    };

    SubjectFieldContent.prototype.updateMapping = function(mappings) {
      this.mappings = mappings;
      return this.redraw();
    };

    SubjectFieldContent.prototype.fieldFrom = function(data) {
      var defaultValue, ref, subject, subjectScope, value;
      subject = this.widget.subject ? this.widget.subject : this.subject();
      defaultValue = this.placeholderWithLabel(this.field());
      subjectScope = data.subjects[subject];
      value = (subjectScope != null ? (ref = subjectScope.results) != null ? ref[this.field()] : void 0 : void 0) || (subjectScope != null ? subjectScope[this.field()] : void 0) || defaultValue;
      return this.mappings[value] || value;
    };

    SubjectFieldContent.prototype.subject = SubjectFieldContent.property('_subject');

    SubjectFieldContent.prototype.serialize = function() {
      return {
        field: this.field(),
        subject: this.subject(),
        style: this.style,
        mappings: this.mappings
      };
    };

    return SubjectFieldContent;

  })(FieldContent);

}).call(this);

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  window.TextContent = (function(superClass) {
    extend(TextContent, superClass);

    function TextContent() {
      return TextContent.__super__.constructor.apply(this, arguments);
    }

    TextContent.className = "TextContent";

    TextContent.displayName = "Free Text";

    TextContent.description = "A block of static text with formatting options.";

    TextContent.icon = "font";

    TextContent.prototype.defaultWidth = function() {
      return 360;
    };

    TextContent.prototype.defaultHeight = function() {
      return 240;
    };

    TextContent.prototype.editable = function() {
      return this.widget.currentMode === 'layout';
    };

    TextContent.EDITOR_CONFIG = {
      imageUpload: false,
      inlineMode: true,
      mediaManager: false,
      placeholder: "Type here...",
      plainPaste: true,
      buttons: ["bold", "italic", "underline", "fontSize", "color", "sep", "align", "insertOrderedList", "insertUnorderedList", "outdent", "indent"]
    };

    TextContent.DEFAULT_CONTENT = "<p>Type text here&hellip;</p>";

    TextContent.STYLE_DEFAULTS = {
      font: 'Helvetica'
    };

    TextContent.prototype.initWithConfig = function(config) {
      this.html = this.get(config.html, TextContent.DEFAULT_CONTENT);
      return this.style = $.extend({}, TextContent.STYLE_DEFAULTS, this.get(config.style, {}));
    };

    TextContent.prototype.render_layout = function(data) {
      var styles;
      styles = this.styleString({
        'font-family': utils.fontMap[this.style.font]
      });
      return $("<div class=\"text-widget\" style=\"" + styles + "\">" + this.html + "</div>");
    };

    TextContent.prototype.render_edit = function(data) {
      var node;
      node = this.render_layout(data);
      this.editor = node.editable(TextContent.EDITOR_CONFIG);
      return node;
    };

    TextContent.prototype.renderAppearanceOptions = function() {
      return this.option('font', 'font', "Font");
    };

    TextContent.prototype.bindEvents = function(el) {
      return el.on('editable.contentChanged', (function(_this) {
        return function() {
          return _this.html = _this.el.editable("getHTML");
        };
      })(this));
    };

    TextContent.prototype.font = TextContent.property('style', 'font');

    TextContent.prototype.serialize = function() {
      return {
        html: this.html,
        style: this.style
      };
    };

    return TextContent;

  })(WidgetContent);

}).call(this);

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  window._EXAMPLEContent = (function(superClass) {
    extend(_EXAMPLEContent, superClass);

    function _EXAMPLEContent() {
      return _EXAMPLEContent.__super__.constructor.apply(this, arguments);
    }

    return _EXAMPLEContent;

  })(WidgetContent);

}).call(this);

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  window.ImageContent = (function(superClass) {
    extend(ImageContent, superClass);

    function ImageContent() {
      return ImageContent.__super__.constructor.apply(this, arguments);
    }

    ImageContent.className = "ImageContent";

    ImageContent.displayName = "Image";

    ImageContent.description = "A static photograph, logo or graphic";

    ImageContent.icon = "picture";

    ImageContent.prototype.defaultWidth = function() {
      return 240;
    };

    ImageContent.prototype.defaultHeight = function() {
      return 240;
    };

    ImageContent.DEFAULT_IMAGE = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

    ImageContent.prototype.initWithConfig = function(config) {
      this.setImage(this.get(config.src, ImageContent.DEFAULT_IMAGE), false);
      return this._maintainAspectRatio = this.get(config.maintainAspectRatio, true);
    };

    ImageContent.prototype.bindEvents = function(el) {
      el.find(".picker").change((function(_this) {
        return function(e) {
          return _this.setImageFromFile(e.currentTarget.files[0]);
        };
      })(this));
      return el.find(".content").dblclick((function(_this) {
        return function() {
          return _this.openFilePicker();
        };
      })(this));
    };

    ImageContent.prototype.openFilePicker = function() {
      var picker;
      picker = this.el.find(".picker");
      picker.click();
      return false;
    };

    ImageContent.prototype.setImageFromFile = function(file) {
      var reader;
      reader = new FileReader();
      reader.onload = (function(_this) {
        return function(e) {
          return _this.updateImage(e.target.result);
        };
      })(this);
      return reader.readAsDataURL(file);
    };

    ImageContent.prototype.updateImage = function(data) {
      var oldSrc;
      oldSrc = this.src;
      this.setImage(data);
      return Designer.history.push(this, 'setImage', oldSrc, this.src);
    };

    ImageContent.prototype.setImage = function(data, doRedraw) {
      if (doRedraw == null) {
        doRedraw = true;
      }
      this.src = data;
      this.maybeWarnAboutGif();
      if (doRedraw) {
        return this.redraw();
      }
    };

    ImageContent.prototype.aspectRatio = function() {
      var img;
      if (this.maintainAspectRatio()) {
        img = new Image();
        img.src = this.src;
        return img.width / img.height;
      } else {
        return false;
      }
    };

    ImageContent.prototype.render_layout = function(data) {
      setTimeout(((function(_this) {
        return function() {
          return _this.setAspectRatio(_this.aspectRatio());
        };
      })(this)), 0);
      return $("<div class=\"image-widget " + (this.src === ImageContent.DEFAULT_IMAGE ? 'image-blank' : void 0) + "\">\n  <img class=\"content\" src=\"" + this.src + "\">\n  <input class=\"picker\" type=\"file\" accept=\"image/png, image/jpeg\">\n</div>");
    };

    ImageContent.prototype.render_edit = function(data) {
      var node;
      node = this.render_layout(data);
      this.bindEvents(node);
      return node;
    };

    ImageContent.prototype.render_display = function(data) {
      return $("<div class=\"image-widget\">\n  <img class=\"content\" src=\"" + this.src + "\">\n</div>");
    };

    ImageContent.prototype.renderConfigOptions = function() {
      return [this.option('checkbox', 'maintainAspectRatio', "Maintain Aspect Ratio")];
    };

    ImageContent.prototype.maintainAspectRatio = ImageContent.property('_maintainAspectRatio');

    ImageContent.prototype.maybeWarnAboutGif = function() {
      var isGif;
      isGif = this.src && this.src !== ImageContent.DEFAULT_IMAGE && this.src.indexOf("image/gif;") > -1;
      if (isGif && this.widget.currentMode === 'layout') {
        return delay(1000, function() {
          return alert("Your template contains one or more GIF images.\n\nGIF files are not currently supported and may not display correctly when printed.\n\nPlease replace all GIF images with alternatives in either JPG or PNG format.");
        });
      }
    };

    ImageContent.prototype.serialize = function() {
      return {
        src: this.src,
        maintainAspectRatio: this.maintainAspectRatio()
      };
    };

    return ImageContent;

  })(WidgetContent);

}).call(this);

(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  window.DynamicTableContent = (function(superClass) {
    extend(DynamicTableContent, superClass);

    function DynamicTableContent() {
      this.updateTable = bind(this.updateTable, this);
      this.makeCell = bind(this.makeCell, this);
      this.numberOfColumns = bind(this.numberOfColumns, this);
      this.updateMapping = bind(this.updateMapping, this);
      this.changeMapping = bind(this.changeMapping, this);
      return DynamicTableContent.__super__.constructor.apply(this, arguments);
    }

    DynamicTableContent.className = "DynamicTableContent";

    DynamicTableContent.displayName = "Dynamic Table";

    DynamicTableContent.description = "A blank table that can be filled with static or dynamic text.";

    DynamicTableContent.icon = "table";

    DynamicTableContent.prototype.defaultWidth = function() {
      return 360;
    };

    DynamicTableContent.prototype.defaultHeight = function() {
      return 110;
    };

    DynamicTableContent.prototype.editable = function() {
      return this.widget.currentMode === 'layout';
    };

    DynamicTableContent.STYLE_DEFAULTS = {
      header_position: 'top',
      alignment: 'left',
      heading_text_color: '#000000',
      heading_background_color: '#DDDDDD',
      cell_text_color: '#000000',
      cell_background_color_odd: '#FFFFFF',
      cell_background_color_even: '#FFFFFF',
      font: 'Helvetica',
      size: 'Medium'
    };

    DynamicTableContent.DEFAULT_COLUMNS = 3;

    DynamicTableContent.DEFAULT_ROWS = 3;

    DynamicTableContent.prototype.header_position = DynamicTableContent.property('style', 'header_position');

    DynamicTableContent.prototype.alignment = DynamicTableContent.property('style', 'alignment');

    DynamicTableContent.prototype.font = DynamicTableContent.property('style', 'font');

    DynamicTableContent.prototype.size = DynamicTableContent.property('style', 'size');

    DynamicTableContent.prototype.heading_text_color = DynamicTableContent.property('style', 'heading_text_color');

    DynamicTableContent.prototype.heading_background_color = DynamicTableContent.property('style', 'heading_background_color');

    DynamicTableContent.prototype.cell_text_color = DynamicTableContent.property('style', 'cell_text_color');

    DynamicTableContent.prototype.cell_background_color_odd = DynamicTableContent.property('style', 'cell_background_color_odd');

    DynamicTableContent.prototype.cell_background_color_even = DynamicTableContent.property('style', 'cell_background_color_even');

    DynamicTableContent.prototype.initWithConfig = function(config) {
      this.style = $.extend({}, DynamicTableContent.STYLE_DEFAULTS, this.get(config.style, {}));
      this.mappings = this.get(config.mappings, {});
      this.tabledata = this.get(config.tabledata, this.makeDefaultTable());
      return this._subject = this.get(config.subject, 'PH');
    };

    DynamicTableContent.prototype.makeDefaultTable = function() {
      var c, j, r, ref, results;
      results = [];
      for (r = j = 1, ref = DynamicTableContent.DEFAULT_ROWS; 1 <= ref ? j <= ref : j >= ref; r = 1 <= ref ? ++j : --j) {
        results.push((function() {
          var k, ref1, results1;
          results1 = [];
          for (c = k = 1, ref1 = DynamicTableContent.DEFAULT_COLUMNS; 1 <= ref1 ? k <= ref1 : k >= ref1; c = 1 <= ref1 ? ++k : --k) {
            results1.push(this.makeCell());
          }
          return results1;
        }).call(this));
      }
      return results;
    };

    DynamicTableContent.prototype.render_layout = function(data, edit) {
      var c, column, i, j, k, l, len, len1, len2, len3, len4, len5, m, n, o, ref, row, self, table, tbody, tr;
      if (edit == null) {
        edit = false;
      }
      table = $("<div class=\"dynamictable-widget\">\n  <table class=\"dynamictable " + (edit ? "edited" : void 0) + "\" style=\"" + (this.styleString({
        'font-family': utils.fontMap[this.style.font],
        'font-size': utils.sizeMap[this.style.size],
        'color': this.style.color,
        'text-align': this.style.alignment
      })) + "\">\n    <tbody></tbody>\n  </table>\n</div>");
      tbody = table.find('tbody');
      ref = this.tabledata;
      for (i = j = 0, len = ref.length; j < len; i = ++j) {
        row = ref[i];
        tr = $('<tr></tr>');
        if (this.style.header_position === 'top') {
          if (i === 0) {
            for (k = 0, len1 = row.length; k < len1; k++) {
              column = row[k];
              tr.append("<th style=\"" + (this.headingStyles()) + "\">" + (this.cellContent(column, data, edit)) + "</th>");
            }
          } else {
            for (l = 0, len2 = row.length; l < len2; l++) {
              column = row[l];
              tr.append("<td style=\"" + (this.cellStyles(i + 1)) + "\">" + (this.cellContent(column, data, edit)) + "</td>");
            }
          }
        } else if (this.style.header_position === 'left') {
          for (c = m = 0, len3 = row.length; m < len3; c = ++m) {
            column = row[c];
            if (c === 0) {
              tr.append("<th style=\"" + (this.headingStyles()) + "\">" + (this.cellContent(column, data, edit)) + "</th>");
            } else {
              tr.append("<td style=\"" + (this.cellStyles(i + 1)) + "\">" + (this.cellContent(column, data, edit)) + "</td>");
            }
          }
        } else {
          if (i === 0) {
            for (n = 0, len4 = row.length; n < len4; n++) {
              column = row[n];
              tr.append("<th style=\"" + (this.headingStyles()) + "\">" + (this.cellContent(column, data, edit)) + "</th>");
            }
          } else {
            for (c = o = 0, len5 = row.length; o < len5; c = ++o) {
              column = row[c];
              if (c === 0) {
                tr.append("<th style=\"" + (this.headingStyles()) + "\">" + (this.cellContent(column, data, edit)) + "</th>");
              } else {
                tr.append("<td style=\"" + (this.cellStyles(i + 1)) + "\">" + (this.cellContent(column, data, edit)) + "</td>");
              }
            }
          }
        }
        tbody.append(tr);
      }
      self = this;
      table.on("click", "input:text", function() {
        var el;
        el = $(this);
        self.el.parents('.widget-dynamictable').css('overflow', 'visible');
        $('.dynamic-list').remove();
        el.parent().append(self.dynamicOptions(el));
        $('.dynamic-list').css('top', el.height() + 1);
        $('.dynamic-list').on("change", "#category-select", function() {
          $(".dynamic-select").remove();
          if ($(this).val() === "basic") {
            return $('.dynamic-list').append(self.basicInfoSelect(el));
          } else {
            return $('.dynamic-list').append(self.assessmentInfoSelect(el));
          }
        });
        $('.dynamic-list').on("change", "#field-select", function() {
          var cell, option;
          option = $(this).val();
          el.data('dynamic', true);
          el.data('key', option);
          el.data('subject', '');
          $('.dynamic-list').remove();
          cell = self.makeCell(option, true);
          return el.val(self.cellValue(cell, data, false));
        });
        return $('.dynamic-list').on("change", "#assessment-select", function() {
          var cell, option, subject;
          option = $(this).val();
          subject = $("#category-select").val();
          el.data('dynamic', true);
          el.data('key', option);
          el.data('subject', subject);
          $('.dynamic-list').remove();
          cell = self.makeCell(option, true, subject);
          return el.val(self.cellValue(cell, data, false));
        });
      });
      return table;
    };

    DynamicTableContent.prototype.cellContent = function(cell, data, edit) {
      if (edit) {
        return "<input type=\"text\" data-dynamic=\"" + cell.dynamic + "\" data-key=\"" + cell.value + "\" data-subject=\"" + (cell.subject || '') + "\" value=\"" + (this.cellValue(cell, data, false)) + "\">";
      } else {
        return this.cellValue(cell, data);
      }
    };

    DynamicTableContent.prototype.cellValue = function(cell, data, html) {
      var ref, subject, subjectData, value;
      if (html == null) {
        html = true;
      }
      subject = null;
      if (cell.dynamic) {
        if (Object.keys(this.metrics()).indexOf(cell.value) === -1) {
          subject = this.widget.subject || cell.subject;
          subjectData = data.subjects[subject];
          value = null;
          if (subjectData) {
            value = subjectData[cell.value] || ((ref = subjectData.results) != null ? ref[cell.value] : void 0);
          }
        } else {
          value = this.fieldFrom(cell.value, data);
        }
        return this.mappings[value] || value || this.placeholderWithLabel([subject, cell.value].join(':'), html);
      } else {
        return cell.value;
      }
    };

    DynamicTableContent.prototype.dynamicOptions = function(el) {
      var options;
      options = "<div class=\"dynamic-list\"><p>Type free text or select a dynamic option from below</p>";
      options += this.categorySelect(el);
      if (el.data('subject')) {
        options += this.assessmentInfoSelect(el);
      } else {
        options += this.basicInfoSelect(el);
      }
      return options += "</div>";
    };

    DynamicTableContent.prototype.categorySelect = function(el) {
      var category_select, name, option, ref;
      if (this.widget.subject) {
        return category_select = "<select id=\"category-select\">\n<option value=\"basic\">Basic Information</option>\n<option value=\"assessment\" " + (el.data('subject') ? 'selected' : void 0) + ">Assessment Information</option>\n</select>";
      } else {
        category_select = "<select id=\"category-select\"><option value=\"basic\">Basic Information</option>";
        ref = API.subjects();
        for (option in ref) {
          name = ref[option];
          if (option !== '') {
            if (el.data('subject') === option) {
              category_select += "<option value=\"" + option + "\" selected>" + name + "</option>";
            } else {
              category_select += "<option value=\"" + option + "\">" + name + "</option>";
            }
          }
        }
        return category_select += "</select>";
      }
    };

    DynamicTableContent.prototype.basicInfoSelect = function(el) {
      var field_select, name, option, ref;
      field_select = "<select id=\"field-select\" class=\"dynamic-select\"><option value=\"\" disabled selected>Select an option...</option>";
      ref = this.metrics();
      for (option in ref) {
        name = ref[option];
        if (el.data('key') === option) {
          field_select += "<option value=\"" + option + "\" selected>" + name + "</option>";
        } else {
          field_select += "<option value=\"" + option + "\">" + name + "</option>";
        }
      }
      return field_select += "</select>";
    };

    DynamicTableContent.prototype.assessmentInfoSelect = function(el) {
      var field, field_select, j, len, name, point, ref, ref1;
      field_select = "<select id=\"assessment-select\" class=\"dynamic-select\"><option value=\"\" disabled selected>Select an option...</option>";
      field_select += "<optgroup label=\"Basic Info\">";
      ref = API.subjectFields();
      for (field in ref) {
        name = ref[field];
        if (el.data('key') === field) {
          field_select += "<option value=\"" + field + "\" selected>" + name + "</option>";
        } else {
          field_select += "<option value=\"" + field + "\">" + name + "</option>";
        }
      }
      field_select += "</optgroup><optgroup label=\"Assessment Points\">";
      ref1 = this.assessmentPoints();
      for (j = 0, len = ref1.length; j < len; j++) {
        point = ref1[j];
        if (el.data('key') === point.code) {
          field_select += "<option value=\"" + point.code + "\" selected>" + point.longName + "</option>";
        } else {
          field_select += "<option value=\"" + point.code + "\">" + point.longName + "</option>";
        }
      }
      return field_select += "</optgroup></select>";
    };

    DynamicTableContent.prototype.renderAppearanceOptions = function() {
      return [this.option('font', 'font', "Font"), this.option('size', 'size', "Text Size"), this.option('color', 'heading_text_color', "Heading Text"), this.option('color', 'heading_background_color', "Heading Bg"), this.option('color', 'cell_text_color', "Cell Text"), this.option('color', 'cell_background_color_odd', "Cell Bg Odd"), this.option('color', 'cell_background_color_even', "Cell Bg Even")];
    };

    DynamicTableContent.prototype.renderConfigOptions = function() {
      return [
        this.option('select', 'header_position', "Header position", {
          options: {
            top: "Top",
            left: 'Left',
            both: "Both"
          }
        }), this.option('select', 'alignment', "Cell alignment", {
          options: {
            left: "Left",
            center: 'Center',
            right: 'Right'
          }
        }), this.option('text', 'numberOfColumns', "No. of columns"), this.option('text', 'numberOfRows', "No. of rows"), this.mappingSettings()
      ];
    };

    DynamicTableContent.prototype.mappingSettings = function() {
      var node, self;
      node = $("<div class=\"mapping-option\"><a href=\"#\" class=\"mapping\">" + ($.isEmptyObject(this.mappings) ? 'Add word mappings...' : 'Edit word mappings...') + "</a></div>");
      self = this;
      node.on("click", ".mapping", (function(_this) {
        return function() {
          return new MappingModal(_this.mappings, _this.changeMapping);
        };
      })(this));
      return node;
    };

    DynamicTableContent.prototype.changeMapping = function(newMappings) {
      var oldMappings;
      oldMappings = this.mappings;
      this.updateMapping(newMappings);
      return Designer.history.push(this, 'updateMapping', oldMappings, newMappings);
    };

    DynamicTableContent.prototype.updateMapping = function(mappings) {
      this.mappings = mappings;
      return this.redraw();
    };

    DynamicTableContent.prototype.headingStyles = function() {
      return this.styleString({
        'background-color': this.style.heading_background_color,
        color: this.style.heading_text_color
      });
    };

    DynamicTableContent.prototype.cellStyles = function(row) {
      var bg_color;
      bg_color = row % 2 === 0 ? this.style.cell_background_color_even : this.style.cell_background_color_odd;
      return this.styleString({
        'background-color': bg_color,
        color: this.style.cell_text_color
      });
    };

    DynamicTableContent.prototype.numberOfRows = function(val) {
      if (val == null) {
        val = null;
      }
      if ((val != null) && val.length > 0) {
        val = Number(val);
        if (val > 0) {
          this.setRows(val);
        }
      }
      return this.tabledata.length;
    };

    DynamicTableContent.prototype.numberOfColumns = function(val) {
      if (val == null) {
        val = null;
      }
      if ((val != null) && val.length > 0 && Number(val)) {
        val = Number(val);
        if (val > 0) {
          this.setColumns(val);
        }
      }
      return this.tabledata[0].length;
    };

    DynamicTableContent.prototype.setRows = function(rowCount) {
      var oldTabledata;
      if (rowCount === this.numberOfRows()) {
        return;
      }
      oldTabledata = $.extend(true, [], this.tabledata);
      while (rowCount !== this.numberOfRows()) {
        if (this.numberOfRows() > rowCount) {
          if (this.numberOfRows() !== 0) {
            this.tabledata.pop();
          }
        } else {
          this.tabledata.push(this.makeRow());
        }
      }
      Designer.history.push(this, 'updateTable', oldTabledata, this.tabledata);
      return this.redraw();
    };

    DynamicTableContent.prototype.makeRow = function() {
      var c, j, ref, results;
      results = [];
      for (c = j = 1, ref = this.numberOfColumns(); 1 <= ref ? j <= ref : j >= ref; c = 1 <= ref ? ++j : --j) {
        results.push(this.makeCell());
      }
      return results;
    };

    DynamicTableContent.prototype.setColumns = function(columnCount) {
      var j, k, len, len1, oldTabledata, ref, ref1, row;
      if (columnCount === this.numberOfColumns()) {
        return;
      }
      oldTabledata = $.extend(true, [], this.tabledata);
      while (columnCount !== this.numberOfColumns()) {
        if (this.numberOfColumns() > columnCount) {
          if (this.numberOfColumns() !== 0) {
            ref = this.tabledata;
            for (j = 0, len = ref.length; j < len; j++) {
              row = ref[j];
              row.pop();
            }
          }
        } else {
          ref1 = this.tabledata;
          for (k = 0, len1 = ref1.length; k < len1; k++) {
            row = ref1[k];
            row.push(this.makeCell());
          }
        }
      }
      Designer.history.push(this, 'updateTable', oldTabledata, this.tabledata);
      return this.redraw();
    };

    DynamicTableContent.prototype.makeCell = function(value, dynamic, subject) {
      if (value == null) {
        value = '';
      }
      if (dynamic == null) {
        dynamic = false;
      }
      if (subject == null) {
        subject = '';
      }
      return {
        dynamic: dynamic,
        subject: subject,
        value: value
      };
    };

    DynamicTableContent.prototype.render_edit = function(data) {
      return this.render_layout(data, true);
    };

    DynamicTableContent.prototype.bindEvents = function(el) {
      var updateFn;
      updateFn = (function(_this) {
        return function() {
          return _this.buildTabledata(el);
        };
      })(this);
      el.on('input', 'input', function() {
        $(this).data('dynamic', false);
        return $(this).data('key', '');
      });
      el.on('change', updateFn);
      this.widget.unbind('widget:layout-switching', updateFn);
      return this.widget.bind('widget:layout-switching', updateFn);
    };

    DynamicTableContent.prototype.buildTabledata = function(el) {
      var $cell, cell, cellArray, cells, j, k, len, len1, newTabledata, row, rows;
      newTabledata = [];
      rows = $(el).find('tr');
      for (j = 0, len = rows.length; j < len; j++) {
        row = rows[j];
        cells = $(row).find('input');
        cellArray = [];
        for (k = 0, len1 = cells.length; k < len1; k++) {
          cell = cells[k];
          $cell = $(cell);
          if ($cell.data('dynamic')) {
            cellArray.push(this.makeCell($cell.data('key'), true, $cell.data('subject')));
          } else {
            cellArray.push(this.makeCell($cell.val(), false));
          }
        }
        newTabledata.push(cellArray);
      }
      Designer.history.push(this, 'updateTable', this.tabledata, newTabledata);
      return this.tabledata = newTabledata;
    };

    DynamicTableContent.prototype.updateTable = function(newTabledata) {
      this.tabledata = newTabledata;
      this.redraw();
      return Designer.select(this.widget);
    };

    DynamicTableContent.prototype.fieldFrom = function(field, data) {
      var j, key, len, ref;
      ref = field.split('.');
      for (j = 0, len = ref.length; j < len; j++) {
        key = ref[j];
        data = data[key];
      }
      return data;
    };

    DynamicTableContent.prototype.serialize = function() {
      return {
        tabledata: this.tabledata,
        style: this.style,
        mappings: this.mappings
      };
    };

    return DynamicTableContent;

  })(WidgetContent);

}).call(this);
