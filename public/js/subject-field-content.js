var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

window.SubjectFieldContent = (function(_super) {
  __extends(SubjectFieldContent, _super);

  function SubjectFieldContent() {
    this.updateMapping = __bind(this.updateMapping, this);
    this.changeMapping = __bind(this.changeMapping, this);
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
    this._field = this.get(config.field, 'A_KS4_STA#A_Y11a_V3#Aut2_Comm');
    return this.mappings = this.get(config.mappings, {});
  };

  SubjectFieldContent.prototype.render_layout = function(data) {
    return $("<div class=\"subject-field-widget\" style=\"" + (this.textStyles()) + "\">" + (this.fieldFrom(data)) + "</div>");
  };

  SubjectFieldContent.prototype.renderConfigOptions = function() {
    var options, point, _i, _len, _ref;
    options = {};
    _ref = this.assessmentPoints();
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      point = _ref[_i];
      options[point.name] = point.longName;
    }
    options = [
      this.option('select', 'field', "Field", {
        options: options,
        hint: "This is the CCR! field you would like to be merged, the data shown is only a sample of the final output."
      }), this.mappingSettings()
    ];
    if (this.widget.subject === null) {
      options.unshift(this.option('text', 'subject', "Subject", {
        hint: "The 2 or 3 letter CCR! subject code you would like to pull from."
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
    var subject, value, _ref;
    subject = this.widget.subject ? this.widget.subject : this.subject();
    value = ((_ref = data.subjects[subject]) != null ? _ref.results[this.field()] : void 0) || "? No Value ?";
    return this.mappings[value] || value;
  };

  SubjectFieldContent.prototype.subject = SubjectFieldContent.property('_subject');

  SubjectFieldContent.prototype.serialize = function() {
    return {
      field: this._field,
      subject: this._subject,
      style: this.style,
      mappings: this.mappings
    };
  };

  return SubjectFieldContent;

})(FieldContent);
