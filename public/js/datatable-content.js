var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

window.DatatableContent = (function(_super) {
  __extends(DatatableContent, _super);

  DatatableContent.STYLE_DEFAULTS = {
    heading_text_color: '#000000',
    heading_background_color: '#FFFFFF'
  };

  DatatableContent.prototype.defaultWidth = function() {
    return 640;
  };

  DatatableContent.prototype.defaultHeight = function() {
    return 480;
  };

  function DatatableContent(config) {
    if (config == null) {
      config = {};
    }
    this.columns = this.get(config.columns, []);
    this.style = $.extend({}, DatatableContent.STYLE_DEFAULTS, this.get(config.style, {}));
  }

  DatatableContent.prototype.render_layout = function(data) {
    var code, col, columnTitles, columnValues, name, node, subject, _ref;
    name = utils.escape(data.name);
    columnTitles = (function() {
      var _i, _len, _ref, _results;
      _ref = this.columns;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        col = _ref[_i];
        _results.push("<th " + (this.headingStyles()) + ">" + col.title + "</th>");
      }
      return _results;
    }).call(this);
    node = $("<table class=\"datatable\">\n  <thead>\n    <tr>\n      <th " + (this.headingStyles()) + "></th>\n      " + (columnTitles.join("\n")) + "\n    </tr>\n  </thead>\n  <tbody>\n  </tbody>\n</table>");
    _ref = data.subjects;
    for (code in _ref) {
      subject = _ref[code];
      columnValues = (function() {
        var _i, _len, _ref1, _ref2, _results;
        _ref1 = this.columns;
        _results = [];
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          col = _ref1[_i];
          _results.push("<td>" + (((_ref2 = subject.results) != null ? _ref2[col.value] : void 0) || '') + "</td>");
        }
        return _results;
      }).call(this);
      node.find("tbody").append("<tr>\n  <th " + (this.headingStyles()) + ">\n    <strong class=\"subject\">" + subject.subjectName + "</strong>\n    <em class=\"teacher\">" + subject.teacherNames + "</em>\n  </th>\n  " + (columnValues.join("\n")) + "\n</tr>");
    }
    return node;
  };

  DatatableContent.prototype.render_edit = function(data) {
    var col, node, table, _i, _len, _ref;
    node = $("<div class=\"datatable-edit\">\n  <h3>Configure Data Table</h3>\n  <h4>Columns</h4>\n  <table>\n    <thead>\n      <tr>\n        <th>Title</th>\n        <th>Value</th>\n      </tr>\n    </thead>\n    <tbody class=\"edit-rows\">\n    </tbody>\n  </table>\n\n  <h4>Style</h4>\n  " + (this.styleOption('heading_text_color', "Heading Text Color")) + "\n  " + (this.styleOption('heading_background_color', "Heading Background Color")) + "\n\n  <button id=\"done\">Done</button>\n</div>");
    table = node.find('.edit-rows');
    _ref = this.columns;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      col = _ref[_i];
      table.append(this.buildEditRow(col));
    }
    table.append(this.buildEditRow());
    return node;
  };

  DatatableContent.prototype.buildEditRow = function(col) {
    var key, opt, options;
    if (col == null) {
      col = {
        title: '',
        value: ''
      };
    }
    options = (function() {
      var _ref, _results;
      _ref = this.assessmentPoints();
      _results = [];
      for (key in _ref) {
        opt = _ref[key];
        _results.push("<option value=\"" + key + "\" " + (key === col.value ? 'selected="selected"' : '') + ">[" + opt.name + "] " + opt.longName + "</option>");
      }
      return _results;
    }).call(this);
    return "<tr class=\"column-setting\">\n  <td><input class=\"col-title\" name=\"col-title\" type=\"text\" value=\"" + col.title + "\" /></td>\n  <td>\n    <select class=\"col-value\" name=\"col-value\">\n      <option value=\"\" " + (col.value === "" ? 'selected="selected"' : '') + "></option>\n      " + (options.join("\n")) + "\n    </select>\n  </td>\n</tr>";
  };

  DatatableContent.prototype.styleOption = function(key, label) {
    if (label == null) {
      label = key;
    }
    return "<p>\n  <label>\n    " + label + ":\n    <input class=\"style-option\" name=\"" + key + "\" type=\"text\" value=\"" + this.style[key] + "\" />\n  </label>\n</p>";
  };

  DatatableContent.prototype.headingStyles = function() {
    return "style=\"background-color: " + this.style.heading_background_color + "; color: " + this.style.heading_text_color + ";\" ";
  };

  DatatableContent.prototype.bindEvents = function(el) {
    el.on("change", ".col-title, .col-value", (function(_this) {
      return function() {
        return _this.maybeAddEditRow();
      };
    })(this));
    return el.find("#done").click((function(_this) {
      return function() {
        _this.saveConfig();
        return _this.cancelEditing();
      };
    })(this));
  };

  DatatableContent.prototype.maybeAddEditRow = function() {
    var lastRow, rows;
    rows = this.el.find('.column-setting');
    lastRow = $(rows[rows.length - 1]);
    if (lastRow.find('.col-title').val() !== '') {
      return lastRow.after(this.buildEditRow());
    }
  };

  DatatableContent.prototype.saveConfig = function() {
    this.saveColumns();
    return this.saveStyle();
  };

  DatatableContent.prototype.saveColumns = function() {
    var col, columns, title, value;
    columns = (function() {
      var _i, _len, _ref, _results;
      _ref = this.el.find('.column-setting');
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        col = _ref[_i];
        title = $(col).find('.col-title').val();
        value = $(col).find('.col-value').val();
        _results.push({
          title: title,
          value: value
        });
      }
      return _results;
    }).call(this);
    return this.columns = (function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = columns.length; _i < _len; _i++) {
        col = columns[_i];
        if (col.title !== '' && (col.value != null) && col.value !== '') {
          _results.push(col);
        }
      }
      return _results;
    })();
  };

  DatatableContent.prototype.saveStyle = function() {
    var el, name, _i, _len, _ref, _results;
    _ref = this.el.find('.style-option');
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      el = _ref[_i];
      name = $(el).attr('name');
      _results.push(this.style[name] = $(el).val());
    }
    return _results;
  };

  DatatableContent.prototype.serialize = function() {
    return {
      columns: this.columns,
      style: this.style
    };
  };

  return DatatableContent;

})(WidgetContent);
