var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

window.NameContent = (function(_super) {
  __extends(NameContent, _super);

  function NameContent() {
    return NameContent.__super__.constructor.apply(this, arguments);
  }

  NameContent.className = "NameContent";

  NameContent.displayName = "Student Name";

  NameContent.description = "Name of the student in the format \"last, first\"";

  NameContent.icon = "girl";

  NameContent.prototype.defaultWidth = function() {
    return 280;
  };

  NameContent.prototype.defaultHeight = function() {
    return 40;
  };

  NameContent.prototype.initWithConfig = function(config) {};

  NameContent.prototype.render_layout = function(data) {
    var name;
    name = utils.escape(data.name);
    return $("<p>" + name + "</p>");
  };

  return NameContent;

})(WidgetContent);
