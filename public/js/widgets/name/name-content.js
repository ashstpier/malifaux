window.NameContent = (function() {
  function NameContent(config) {
    if (config == null) {
      config = {};
    }
    null;
  }

  NameContent.prototype.render = function(mode, data) {
    var name;
    if (data == null) {
      data = {
        name: "{Student Name}"
      };
    }
    name = utils.escape(data.name);
    return this.el = $("<p>" + name + "</p>");
  };

  NameContent.prototype.serialize = function() {
    return {};
  };

  return NameContent;

})();
