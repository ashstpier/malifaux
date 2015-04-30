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
