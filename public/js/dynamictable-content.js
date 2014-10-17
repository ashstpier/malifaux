var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

window.DynamicTableContent = (function(_super) {
  __extends(DynamicTableContent, _super);

  function DynamicTableContent() {
    this.updateTable = __bind(this.updateTable, this);
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
    return 160;
  };

  DynamicTableContent.prototype.editable = function() {
    return true;
  };

  DynamicTableContent.DEFAULT_CONTENT = [['', '', ''], ['', '', ''], ['', '', '']];

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
    return this.tabledata = this.get(config.tabledata, DynamicTableContent.DEFAULT_CONTENT);
  };

  DynamicTableContent.prototype.render_layout = function(data, edit) {
    var c, column, i, row, table, tbody, tr, _i, _j, _k, _l, _len, _len1, _len2, _len3, _ref;
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
            tr.append("<th style=\"" + (this.headingStyles()) + "\">" + (this.cellContent(column, edit)) + "</th>");
          }
        } else {
          for (_k = 0, _len2 = row.length; _k < _len2; _k++) {
            column = row[_k];
            tr.append("<td style=\"" + (this.cellStyles(i + 1)) + "\">" + (this.cellContent(column, edit)) + "</td>");
          }
        }
      } else {
        for (c = _l = 0, _len3 = row.length; _l < _len3; c = ++_l) {
          column = row[c];
          if (c === 0) {
            tr.append("<th style=\"" + (this.headingStyles()) + "\">" + (this.cellContent(column, edit)) + "</th>");
          } else {
            tr.append("<td style=\"" + (this.cellStyles(i + 1)) + "\">" + (this.cellContent(column, edit)) + "</td>");
          }
        }
      }
      tbody.append(tr);
    }
    return table;
  };

  DynamicTableContent.prototype.cellContent = function(cell, edit) {
    if (edit) {
      return "<input type=\"text\" value=\"" + cell + "\">";
    } else {
      return cell;
    }
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
      }), this.option('text', 'numberOfColumns', "No. of columns"), this.option('text', 'numberOfRows', "No. of rows")
    ];
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
    if (rowCount === this.numberOfRows()) {
      return this.redraw();
    }
    if (this.numberOfRows() > rowCount) {
      if (this.numberOfRows() !== 0) {
        this.tabledata.pop();
      }
    } else {
      this.tabledata.push(this.makeRow());
    }
    return this.setRows(rowCount);
  };

  DynamicTableContent.prototype.makeRow = function() {
    var c, _i, _ref, _results;
    _results = [];
    for (c = _i = 1, _ref = this.numberOfColumns(); 1 <= _ref ? _i <= _ref : _i >= _ref; c = 1 <= _ref ? ++_i : --_i) {
      _results.push('');
    }
    return _results;
  };

  DynamicTableContent.prototype.setColumns = function(columnCount) {
    var row, _i, _j, _len, _len1, _ref, _ref1;
    if (columnCount === this.numberOfColumns()) {
      return this.redraw();
    }
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
        row.push(this.makeColumn());
      }
    }
    return this.setColumns(columnCount);
  };

  DynamicTableContent.prototype.makeColumn = function() {
    return '';
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
    el.on('change', updateFn);
    this.widget.unbind('widget:layout-switching', updateFn);
    return this.widget.bind('widget:layout-switching', updateFn);
  };

  DynamicTableContent.prototype.buildTabledata = function(el) {
    var cell, cellArray, cells, newTabledata, row, rows, _i, _j, _len, _len1;
    newTabledata = [];
    rows = $(el).find('tr');
    for (_i = 0, _len = rows.length; _i < _len; _i++) {
      row = rows[_i];
      cells = $(row).find('input');
      cellArray = [];
      for (_j = 0, _len1 = cells.length; _j < _len1; _j++) {
        cell = cells[_j];
        cellArray.push($(cell).val());
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

  DynamicTableContent.prototype.serialize = function() {
    return {
      tabledata: this.tabledata
    };
  };

  return DynamicTableContent;

})(WidgetContent);
