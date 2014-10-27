var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

window.DynamicTableContent = (function(_super) {
  __extends(DynamicTableContent, _super);

  function DynamicTableContent() {
    this.updateTable = __bind(this.updateTable, this);
    this.makeCell = __bind(this.makeCell, this);
    this.numberOfColumns = __bind(this.numberOfColumns, this);
    this.updateMapping = __bind(this.updateMapping, this);
    this.changeMapping = __bind(this.changeMapping, this);
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
    return true;
  };

  DynamicTableContent.STYLE_DEFAULTS = {
    header_position: 'top',
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
    return this.tabledata = this.get(config.tabledata, this.makeDefaultTable());
  };

  DynamicTableContent.prototype.makeDefaultTable = function() {
    var c, r, _i, _ref, _results;
    _results = [];
    for (r = _i = 1, _ref = DynamicTableContent.DEFAULT_ROWS; 1 <= _ref ? _i <= _ref : _i >= _ref; r = 1 <= _ref ? ++_i : --_i) {
      _results.push((function() {
        var _j, _ref1, _results1;
        _results1 = [];
        for (c = _j = 1, _ref1 = DynamicTableContent.DEFAULT_COLUMNS; 1 <= _ref1 ? _j <= _ref1 : _j >= _ref1; c = 1 <= _ref1 ? ++_j : --_j) {
          _results1.push(this.makeCell());
        }
        return _results1;
      }).call(this));
    }
    return _results;
  };

  DynamicTableContent.prototype.render_layout = function(data, edit) {
    var c, column, i, row, self, table, tbody, tr, _i, _j, _k, _l, _len, _len1, _len2, _len3, _ref;
    if (edit == null) {
      edit = false;
    }
    table = $("<div class=\"dynamictable-widget\">\n  <table class=\"dynamictable " + (edit ? "edited" : void 0) + "\" style=\"" + (this.styleString({
      'font-family': utils.fontMap[this.style.font],
      'font-size': utils.sizeMap[this.style.size],
      'color': this.style.color
    })) + "\">\n    <tbody></tbody>\n  </table>\n</div>");
    tbody = table.find('tbody');
    _ref = this.tabledata;
    for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
      row = _ref[i];
      tr = $('<tr></tr>');
      if (this.style.header_position === 'top') {
        if (i === 0) {
          for (_j = 0, _len1 = row.length; _j < _len1; _j++) {
            column = row[_j];
            tr.append("<th style=\"" + (this.headingStyles()) + "\">" + (this.cellContent(column, data, edit)) + "</th>");
          }
        } else {
          for (_k = 0, _len2 = row.length; _k < _len2; _k++) {
            column = row[_k];
            tr.append("<td style=\"" + (this.cellStyles(i + 1)) + "\">" + (this.cellContent(column, data, edit)) + "</td>");
          }
        }
      } else {
        for (c = _l = 0, _len3 = row.length; _l < _len3; c = ++_l) {
          column = row[c];
          if (c === 0) {
            tr.append("<th style=\"" + (this.headingStyles()) + "\">" + (this.cellContent(column, data, edit)) + "</th>");
          } else {
            tr.append("<td style=\"" + (this.cellStyles(i + 1)) + "\">" + (this.cellContent(column, data, edit)) + "</td>");
          }
        }
      }
      tbody.append(tr);
    }
    self = this;
    table.on("click", "input", function() {
      var el;
      el = $(this);
      self.el.parents('.widget-dynamictable').css('overflow', 'visible');
      $('.dynamic-list').remove();
      el.parent().append(self.dynamicOptions(el));
      $('.dynamic-list').css('top', el.height() + 1);
      return $('.dynamic-list').on("click", "li", function() {
        var option, value, _ref1;
        option = $(this).attr('data-key');
        el.attr('data-dynamic', true);
        el.attr('data-key', option);
        $('.dynamic-list').remove();
        value = $(this).attr('data-key');
        if (self.metrics().indexOf(value) === -1) {
          return el.val(((_ref1 = data.subjects[self.widget.subject].results) != null ? _ref1[value] : void 0) || '');
        } else {
          return el.val(self.fieldFrom($(this).text(), data));
        }
      });
    });
    return table;
  };

  DynamicTableContent.prototype.cellContent = function(cell, data, edit) {
    if (edit) {
      return "<input type=\"text\" data-dynamic=\"" + cell.dynamic + "\" data-key=\"" + cell.value + "\" value=\"" + (this.cellValue(cell, data)) + "\">";
    } else {
      return this.cellValue(cell, data);
    }
  };

  DynamicTableContent.prototype.cellValue = function(cell, data) {
    var value, _ref;
    if (cell.dynamic) {
      if (this.metrics().indexOf(cell.value) === -1) {
        if (this.widget.subject) {
          value = (_ref = data.subjects[this.widget.subject].results) != null ? _ref[cell.value] : void 0;
        } else {
          value = '';
        }
      } else {
        value = this.fieldFrom(cell.value, data);
      }
      return this.mappings[value] || value;
    } else {
      return cell.value;
    }
  };

  DynamicTableContent.prototype.dynamicOptions = function(el) {
    var list, option, point, _i, _j, _len, _len1, _ref, _ref1;
    list = "<ul class=\"dynamic-list\">";
    _ref = this.metrics();
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      option = _ref[_i];
      if (el.attr('data-key') === option) {
        list += "<li data-key=\"" + option + "\">" + option + "<i class=\"glyphicons ok_2\"></i></li>";
      } else {
        list += "<li data-key=\"" + option + "\">" + option + "</li>";
      }
    }
    if (this.widget.subject) {
      _ref1 = this.assessmentPoints();
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        point = _ref1[_j];
        if (el.attr('data-key') === point.name) {
          list += "<li data-key=\"" + point.name + "\">" + point.longName + "<i class=\"glyphicons ok_2\"></i></li>";
        } else {
          list += "<li data-key=\"" + point.name + "\">" + point.longName + "</li>";
        }
      }
    }
    return list += "</ul>";
  };

  DynamicTableContent.prototype.renderAppearanceOptions = function() {
    return [this.option('font', 'font', "Font"), this.option('size', 'size', "Text Size"), this.option('color', 'heading_text_color', "Heading Text"), this.option('color', 'heading_background_color', "Heading Bg"), this.option('color', 'cell_text_color', "Cell Text"), this.option('color', 'cell_background_color_odd', "Cell Bg Odd"), this.option('color', 'cell_background_color_even', "Cell Bg Even")];
  };

  DynamicTableContent.prototype.renderConfigOptions = function() {
    return [
      this.option('select', 'header_position', "Header position", {
        options: {
          top: "Top",
          left: 'Left'
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
    var c, _i, _ref, _results;
    _results = [];
    for (c = _i = 1, _ref = this.numberOfColumns(); 1 <= _ref ? _i <= _ref : _i >= _ref; c = 1 <= _ref ? ++_i : --_i) {
      _results.push(this.makeCell());
    }
    return _results;
  };

  DynamicTableContent.prototype.setColumns = function(columnCount) {
    var oldTabledata, row, _i, _j, _len, _len1, _ref, _ref1;
    if (columnCount === this.numberOfColumns()) {
      return;
    }
    oldTabledata = $.extend(true, [], this.tabledata);
    while (columnCount !== this.numberOfColumns()) {
      if (this.numberOfColumns() > columnCount) {
        if (this.numberOfColumns() !== 0) {
          _ref = this.tabledata;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            row = _ref[_i];
            row.pop();
          }
        }
      } else {
        _ref1 = this.tabledata;
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          row = _ref1[_j];
          row.push(this.makeCell());
        }
      }
    }
    Designer.history.push(this, 'updateTable', oldTabledata, this.tabledata);
    return this.redraw();
  };

  DynamicTableContent.prototype.makeCell = function(value, dynamic) {
    if (value == null) {
      value = '';
    }
    if (dynamic == null) {
      dynamic = false;
    }
    return {
      dynamic: dynamic,
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
    var $cell, cell, cellArray, cells, newTabledata, row, rows, _i, _j, _len, _len1;
    el.parents('.widget-dynamictable').css('overflow', 'hidden');
    newTabledata = [];
    rows = $(el).find('tr');
    for (_i = 0, _len = rows.length; _i < _len; _i++) {
      row = rows[_i];
      cells = $(row).find('input');
      cellArray = [];
      for (_j = 0, _len1 = cells.length; _j < _len1; _j++) {
        cell = cells[_j];
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
    var key, _i, _len, _ref;
    _ref = field.split('.');
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      key = _ref[_i];
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
