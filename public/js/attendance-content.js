<<<<<<< HEAD
<<<<<<< HEAD
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
=======
var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
>>>>>>> Add tabs and styling
=======
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
>>>>>>> Add tabs and styling
  hasProp = {}.hasOwnProperty;

window.AttendanceContent = (function(superClass) {
  extend(AttendanceContent, superClass);

  function AttendanceContent() {
<<<<<<< HEAD
<<<<<<< HEAD
=======
    this.drawChart = bind(this.drawChart, this);
>>>>>>> Add tabs and styling
=======
>>>>>>> Add tabs and styling
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
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> Add tabs and styling
      callback: (function(_this) {
        return function() {
          return _this.drawChart();
        };
      })(this)
<<<<<<< HEAD
=======
      callback: this.drawChart
>>>>>>> Add tabs and styling
=======
>>>>>>> Add tabs and styling
    });
    return $("<div class=\"attendance-widget\"></div>");
  };

  AttendanceContent.prototype.renderConfigOptions = function() {
    return [this.option('text', 'label1', "Present label"), this.option('text', 'label2', "Late label"), this.option('text', 'label3', "Authorised label"), this.option('text', 'label4', "Unauthorised label")];
  };

  AttendanceContent.prototype.renderAppearanceOptions = function() {
    return [
<<<<<<< HEAD
<<<<<<< HEAD
      this.option('select', 'chartstyle', "Chart style", {
=======
      this.option('color', 'color1', "Present"), this.option('color', 'color2', "Late"), this.option('color', 'color3', "Authorised"), this.option('color', 'color4', "Unauthorised"), this.option('select', 'chartstyle', "Chart style", {
>>>>>>> Add tabs and styling
=======
      this.option('select', 'chartstyle', "Chart style", {
>>>>>>> Add tabs and styling
        options: {
          bar: 'Bar',
          pie: 'Pie'
        }
<<<<<<< HEAD
<<<<<<< HEAD
      }), this.option('font', 'font', "Font"), this.option('size', 'size', "Text Size"), this.option('color', 'color1', "Present"), this.option('color', 'color2', "Late"), this.option('color', 'color3', "Authorised"), this.option('color', 'color4', "Unauthorised"), this.option('color', 'color', "Text Color")
=======
      }), this.option('font', 'font', "Font"), this.option('size', 'size', "Text Size"), this.option('color', 'color', "Text Color")
>>>>>>> Add tabs and styling
=======
      }), this.option('font', 'font', "Font"), this.option('size', 'size', "Text Size"), this.option('color', 'color1', "Present"), this.option('color', 'color2', "Late"), this.option('color', 'color3', "Authorised"), this.option('color', 'color4', "Unauthorised"), this.option('color', 'color', "Text Color")
>>>>>>> Add tabs and styling
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
