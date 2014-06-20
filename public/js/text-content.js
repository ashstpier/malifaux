window.TextContent = (function() {
  TextContent.EDITOR_CONFIG = {
    imageUpload: false,
    inlineMode: true,
    mediaManager: false,
    placeholder: "Type here...",
    plainPaste: true,
    buttons: ["bold", "italic", "underline", "fontSize", "color", "sep", "align", "insertOrderedList", "insertUnorderedList", "outdent", "indent"]
  };

  function TextContent(config) {
    if (config == null) {
      config = {};
    }
    this.html = config.html != null ? config.html : "<p>Type text here&hellip;</p>";
  }

  TextContent.prototype.render = function(mode, data) {
    this.el = $("<div class=\"text-widget\">" + this.html + "</div>");
    this.el.click(function() {
      return false;
    });
    if (mode === 'edit') {
      this.editor = this.el.editable(TextContent.EDITOR_CONFIG);
    }
    this.bindEvents();
    return this.el;
  };

  TextContent.prototype.bindEvents = function() {
    return this.el.on('input', (function(_this) {
      return function() {
        return _this.html = _this.el.editable("getHTML");
      };
    })(this));
  };

  TextContent.prototype.serialize = function() {
    return {
      html: this.html
    };
  };

  return TextContent;

})();
