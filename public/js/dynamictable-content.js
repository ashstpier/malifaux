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
        el.attr('data-dynamic', true);
        el.attr('data-key', option);
        el.attr('data-subject', '');
        $('.dynamic-list').remove();
        cell = self.makeCell(option, true);
        return el.val(self.cellValue(cell, data, false));
      });
      return $('.dynamic-list').on("change", "#assessment-select", function() {
        var cell, option, subject;
        option = $(this).val();
        subject = $("#category-select").val();
        el.attr('data-dynamic', true);
        el.attr('data-key', option);
        el.attr('data-subject', subject);
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
    var ref, ref1, value;
    if (html == null) {
      html = true;
    }
    if (cell.dynamic) {
      if (Object.keys(this.metrics()).indexOf(cell.value) === -1) {
        if (this.widget.subject) {
          value = (ref = data.subjects[this.widget.subject].results) != null ? ref[cell.value] : void 0;
        } else {
          if (data.subjects[cell.subject]) {
            value = (ref1 = data.subjects[cell.subject].results) != null ? ref1[cell.value] : void 0;
          } else {
            this.placeholderWithLabel(cell.value, html);
          }
        }
      } else {
        value = this.fieldFrom(cell.value, data);
      }
      return this.mappings[value] || value || this.placeholderWithLabel(cell.value, html);
    } else {
      return cell.value;
    }
  };

  DynamicTableContent.prototype.dynamicOptions = function(el) {
    var options;
    options = "<div class=\"dynamic-list\"><p>Type in the text box or select a dynamic option from below</p>";
    options += this.categorySelect(el);
    if (el.attr('data-subject')) {
      options += this.assessmentInfoSelect(el);
    } else {
      options += this.basicInfoSelect(el);
    }
    return options += "</div>";
  };

  DynamicTableContent.prototype.categorySelect = function(el) {
    var category_select, name, option, ref;
    if (this.widget.subject) {
      return category_select = "<select id=\"category-select\">\n<option value=\"basic\">Basic Information</option>\n<option value=\"assessment\" " + (el.attr('data-subject') ? 'selected' : void 0) + ">Assessment Information</option>\n</select>";
    } else {
      category_select = "<select id=\"category-select\"><option value=\"basic\">Basic Information</option>";
      ref = API.subjects();
      for (option in ref) {
        name = ref[option];
        if (el.attr('data-subject') === option) {
          category_select += "<option value=\"" + option + "\" selected>" + name + "</option>";
        } else {
          category_select += "<option value=\"" + option + "\">" + name + "</option>";
        }
      }
      return category_select += "</select>";
    }
  };

  DynamicTableContent.prototype.basicInfoSelect = function(el) {
    var field_select, name, option, ref;
    field_select = "<select id=\"field-select\" class=\"dynamic-select\"><option value=\"\" disabled selected>Select an option</option>";
    ref = this.metrics();
    for (option in ref) {
      name = ref[option];
      if (el.attr('data-key') === option) {
        field_select += "<option value=\"" + option + "\" selected>" + name + "</option>";
      } else {
        field_select += "<option value=\"" + option + "\">" + name + "</option>";
      }
    }
    return field_select += "</select>";
  };

  DynamicTableContent.prototype.assessmentInfoSelect = function(el) {
    var field_select, j, len, point, ref;
    field_select = "<select id=\"assessment-select\" class=\"dynamic-select\"><option value=\"\" disabled selected>Select an assessment</option>";
    ref = this.assessmentPoints();
    for (j = 0, len = ref.length; j < len; j++) {
      point = ref[j];
      if (el.attr('data-key') === point.code) {
        field_select += "<option value=\"" + point.code + "\" selected>" + point.longName + "</option>";
      } else {
        field_select += "<option value=\"" + point.code + "\">" + point.longName + "</option>";
      }
    }
    return field_select += "</select>";
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
      $(this).attr('data-dynamic', false);
      return $(this).attr('data-key', '');
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
          cellArray.push(this.makeCell($cell.data('key'), true));
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
