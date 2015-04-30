var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

window.NameContent = (function(superClass) {
  extend(NameContent, superClass);

  function NameContent() {
    return NameContent.__super__.constructor.apply(this, arguments);
  }

  NameContent.className = "NameContent";

  NameContent.displayName = "Student Name";

  NameContent.description = "Name of the student in the format \"last, first\"";

  NameContent.icon = "girl";

  NameContent.active = false;

  return NameContent;

})(FieldContent);
