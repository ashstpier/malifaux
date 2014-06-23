var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

window.DatatableContent = (function(_super) {
  __extends(DatatableContent, _super);

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
        _results.push("<th>" + col.title + "</th>");
      }
      return _results;
    }).call(this);
    node = $("<table class=\"datatable\">\n  <thead>\n    <tr>\n      <th></th>\n      " + (columnTitles.join("\n")) + "\n    </tr>\n  </thead>\n  <tbody>\n  </tbody>\n</table>");
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
      node.find("tbody").append("<tr>\n  <th>\n    <strong class=\"subject\">" + subject.subjectName + "</strong>\n    <em class=\"teacher\">" + subject.teacherNames + "</em>\n  </th>\n  " + (columnValues.join("\n")) + "\n</tr>");
    }
    return node;
  };

  DatatableContent.prototype.render_edit = function(data) {
    var col, i, node, row, rows;
    row = function(i, col) {
      return "<tr class=\"column-setting\">\n  <td><input class=\"col-title\" name=\"col-title-" + i + "\" type=\"text\" value=\"" + col.title + "\" /></td>\n  <td>\n    <select class=\"col-value\" name=\"col-value-" + i + "\">\n      <option value=\"\" " + (col.value === "" ? 'selected="selcted"' : void 0) + "></option>\n      <option " + (col.value === "3BG" ? 'selected="selcted"' : void 0) + ">3BG</option>\n      <option " + (col.value === "3EC" ? 'selected="selcted"' : void 0) + ">3EC</option>\n      <option " + (col.value === "Y11BG" ? 'selected="selcted"' : void 0) + ">Y11BG</option>\n    </select>\n  </td>\n</tr>";
    };
    rows = (function() {
      var _i, _len, _ref, _results;
      _ref = this.columns;
      _results = [];
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        col = _ref[i];
        _results.push(row(i, col));
      }
      return _results;
    }).call(this);
    rows.push(row(this.columns.length, {
      title: '',
      value: ''
    }));
    node = $("<div>\n  <h3>Configure Data Table</h3>\n  <h4>Columns</h4>\n  <table>\n    <thead>\n      <tr>\n        <th>Title</th>\n        <th>Value</th>\n      </tr>\n    </thead>\n    <tbody>\n        " + (rows.join("\n")) + "\n    </tbody>\n  </table>\n  <button id=\"done\">Done</button>\n</div>");
    return node;
  };

  DatatableContent.prototype.bindEvents = function(el) {
    return el.find("#done").click((function(_this) {
      return function() {
        _this.saveConfig();
        return _this.cancelEditing();
      };
    })(this));
  };

  DatatableContent.prototype.saveConfig = function() {
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

  DatatableContent.prototype.serialize = function() {
    return {
      columns: this.columns
    };
  };

  return DatatableContent;

})(WidgetContent);
