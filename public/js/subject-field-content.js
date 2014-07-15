var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

window.SubjectFieldContent = (function(_super) {
  __extends(SubjectFieldContent, _super);

  function SubjectFieldContent() {
    return SubjectFieldContent.__super__.constructor.apply(this, arguments);
  }

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
    return this._field = this.get(config.field, 'A_KS4_STA#A_Y11a_V3#Aut2_Comm');
  };

  SubjectFieldContent.prototype.render_layout = function(data) {
    return $("<div class=\"subject-field-widget\" style=\"" + (this.textStyles()) + "\">" + (this.fieldFrom(data)) + "</div>");
  };

  SubjectFieldContent.prototype.renderConfigOptions = function() {
    return [
      this.option('text', 'subject', "Subject", {
        hint: "The 2 or 3 letter CCR subject code you would like to pull from."
      }), this.option('text', 'field', "Field", {
        hint: "The subject scoped CCR field you would like to be merged, the data shown is only a sample of the final output and the selected field may not have any data."
      })
    ];
  };

  SubjectFieldContent.prototype.fieldFrom = function(data) {
    var _ref;
    return ((_ref = data.subjects[this.subject()]) != null ? _ref.results[this.field()] : void 0) || "? No Value ?";
  };

  SubjectFieldContent.prototype.subject = SubjectFieldContent.property('_subject');

  SubjectFieldContent.prototype.serialize = function() {
    return {
      field: this._field,
      subject: this._subject,
      style: this.style
    };
  };

  return SubjectFieldContent;

})(FieldContent);
