var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

window._EXAMPLEContent = (function(superClass) {
  extend(_EXAMPLEContent, superClass);

  function _EXAMPLEContent() {
    return _EXAMPLEContent.__super__.constructor.apply(this, arguments);
  }

  return _EXAMPLEContent;

})(WidgetContent);
